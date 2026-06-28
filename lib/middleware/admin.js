import { adminAuth, adminDb } from '../../firebase/firebaseAdmin'

export async function requireAdmin(req, res){
  try{
    const authHeader = req.headers.authorization || ''
    const token = authHeader.replace('Bearer ', '')
    if(!token) return res.status(401).json({error:'Missing auth token'})
    const decoded = await adminAuth.verifyIdToken(token)
    if(decoded?.role !== 'admin' && decoded?.admin !== true){
      // also check Firestore user doc
      const doc = await adminDb.collection('users').doc(decoded.uid).get()
      const data = doc.exists ? doc.data() : {}
      if(data.role !== 'admin') return res.status(403).json({error:'Admin access required'})
    }
    // attach decoded to req
    req.user = decoded
    return null
  }catch(e){
    return res.status(401).json({error:'Invalid token', detail: e.message})
  }
}
