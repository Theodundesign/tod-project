import { auth } from '../firebase/firebaseClient'

export async function createConversation({ participants = [], title = '', metadata = null } = {}) {
  // Validate input before making network call
  if (!Array.isArray(participants) || participants.length === 0) {
    const err = new Error('participants must be a non-empty array')
    err.code = 'validation/invalid-participants'
    throw err
  }

  // Check auth state
  if (!auth?.currentUser) {
    const err = new Error('Not authenticated')
    err.code = 'auth/not-authenticated'
    throw err
  }

  const currentUid = auth.currentUser.uid

  // Ensure current user is in participants
  if (!participants.includes(currentUid)) {
    const err = new Error('Authenticated user must be included in participants')
    err.code = 'validation/current-user-not-in-participants'
    throw err
  }

  // Get ID token with error handling
  let token
  try {
    token = await auth.currentUser.getIdToken()
  } catch (e) {
    const err = new Error('Failed to get auth token')
    err.cause = e
    err.code = 'auth/token-failure'
    throw err
  }

  // Make network request with error handling
  let res
  try {
    res = await fetch('/api/conversations/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ participants, title, metadata })
    })
  } catch (netErr) {
    const err = new Error('Network error: could not reach server')
    err.cause = netErr
    err.code = 'network/error'
    throw err
  }

  // Parse response body
  let body
  try {
    body = await res.json()
  } catch (parseErr) {
    const err = new Error('Invalid server response')
    err.cause = parseErr
    err.code = 'server/invalid-response'
    throw err
  }

  // Handle HTTP error status
  if (!res.ok) {
    const message = body?.error || `Server error: ${res.status}`
    const err = new Error(message)
    err.code = body?.code || `server/${res.status}`
    err.status = res.status
    err.body = body
    throw err
  }

  // Return standardized success shape: { ok: true, existed: boolean, id, data }
  if (body && typeof body === 'object' && 'ok' in body) {
    return body
  }

  // Fallback for older API responses
  return { ok: true, existed: false, id: body.id, data: body.data }
}

export default { createConversation }
