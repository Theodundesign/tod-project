import admin, { adminAuth, adminDb } from '../../../firebase/firebaseAdmin'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'Method not allowed', code: 'method/not-allowed' })

  try {
    const authHeader = req.headers.authorization || ''
    const token = authHeader.replace('Bearer ', '')
    if (!token) return res.status(401).json({ ok: false, error: 'Missing auth token', code: 'auth/missing-token' })

    const decoded = await adminAuth.verifyIdToken(token)
    const uid = decoded?.uid
    if (!uid) return res.status(401).json({ ok: false, error: 'Invalid auth token', code: 'auth/invalid-token' })

    const { participants, title, metadata } = req.body || {}
    if (!Array.isArray(participants) || participants.length === 0) {
      return res.status(400).json({ ok: false, error: 'participants must be a non-empty array of user IDs', code: 'validation/invalid-participants' })
    }

    // Ensure requesting user is part of participants (rules expect this on client-side creates)
    if (!participants.includes(uid)) {
      return res.status(403).json({ ok: false, error: 'Authenticated user must be included in participants', code: 'auth/not-in-participants' })
    }

    // Normalize participants: unique, string ids (sorted for deterministic checks)
    const normalized = Array.from(new Set(participants.map(String))).sort()

    // Prevent duplicate conversations: query by one participant then filter set-equality
    const primary = normalized[0]
    const existingQuery = await adminDb.collection('conversations')
      .where('participants', 'array-contains', primary)
      .get()

    for (const doc of existingQuery.docs) {
      const data = doc.data()
      const existingParts = Array.isArray(data.participants) ? data.participants.map(String).sort() : []
      // exact set equality
      if (existingParts.length === normalized.length && existingParts.every((v, i) => v === normalized[i])) {
        console.debug(`Found existing conversation ${doc.id} for participants: ${normalized.join(', ')}`)
        return res.status(200).json({ ok: true, existed: true, id: doc.id, data })
      }
    }

    // Build conversation document using server timestamps and required fields
    const now = admin.firestore.FieldValue.serverTimestamp()
    const unreadCounts = normalized.reduce((acc, u) => { acc[u] = 0; return acc }, {})

    const conversation = {
      participants: normalized,
      title: title || null,
      lastMessage: '',
      lastMessageAt: null,
      lastMessageSender: null,
      unreadCounts,
      createdBy: uid,
      createdAt: now,
      updatedAt: now,
      metadata: metadata || null
    }

    const docRef = await adminDb.collection('conversations').add(conversation)
    const docSnap = await docRef.get()

    return res.status(201).json({ ok: true, existed: false, id: docRef.id, data: docSnap.data() })
  } catch (err) {
    console.error('Create conversation error:', err)
    return res.status(500).json({ ok: false, error: err.message || 'Unable to create conversation', code: 'server/internal-error' })
  }
}
