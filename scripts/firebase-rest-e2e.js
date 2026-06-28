#!/usr/bin/env node
const fetch = (...args) => import('node-fetch').then(m => m.default(...args))
const fs = require('fs')

const API_KEY = process.env.NEXT_PUBLIC_FIREBASE_API_KEY
const PROJECT_ID = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
if(!API_KEY || !PROJECT_ID){
  console.error('Missing NEXT_PUBLIC_FIREBASE_API_KEY or NEXT_PUBLIC_FIREBASE_PROJECT_ID in environment')
  process.exit(2)
}

const unique = Date.now()
const email = `rest-e2e-${unique}@example.com`
const password = 'Test1234!'
const fullName = `REST E2E ${unique}`

const signUp = async ()=>{
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`
  const res = await fetch(url, { method:'POST', headers:{'content-type':'application/json'}, body: JSON.stringify({email, password, returnSecureToken: true}) })
  const j = await res.json()
  if(!res.ok) throw new Error('signUp failed: ' + JSON.stringify(j))
  return j
}

const signIn = async ()=>{
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`
  const res = await fetch(url, { method:'POST', headers:{'content-type':'application/json'}, body: JSON.stringify({email, password, returnSecureToken: true}) })
  const j = await res.json()
  if(!res.ok) throw new Error('signIn failed: ' + JSON.stringify(j))
  return j
}

const getDoc = async (idToken, uid)=>{
  const url = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/users/${uid}`
  const res = await fetch(url, { headers: { Authorization: `Bearer ${idToken}` } })
  return { ok: res.ok, status: res.status, body: await res.text() }
}

const createOrUpdateDoc = async (idToken, uid, payload)=>{
  // Try to create with the createDocument endpoint (POST to collection) with a fixed documentId
  const createUrl = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/users?documentId=${uid}`
  const docUrl = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/users/${uid}`
  const fields = {}
  for(const k of Object.keys(payload)) fields[k] = { stringValue: String(payload[k]) }
  const body = { fields }

  // First attempt to create using POST to collection (works when doc missing)
  try{
    const resCreate = await fetch(createUrl, { method: 'POST', headers: { Authorization: `Bearer ${idToken}`, 'content-type': 'application/json' }, body: JSON.stringify(body) })
    const j = await resCreate.json()
    if(resCreate.ok) return { ok: true, status: resCreate.status, body: j }
    // If creation returns 409 or other error, fall through to try update
  }catch(e){ /* continue to update attempt */ }

  // Fallback: try to patch/update the document at the document path
  const res = await fetch(docUrl, { method: 'PATCH', headers: { Authorization: `Bearer ${idToken}`, 'content-type':'application/json' }, body: JSON.stringify(body) })
  const j = await res.json()
  return { ok: res.ok, status: res.status, body: j }
}

;(async ()=>{
  try{
    console.log('Signing up user via REST')
    const su = await signUp()
    console.log('signUp result:', su)
    const localId = su.localId
    const idToken = su.idToken

    console.log('Attempting to read users/{uid} via Firestore REST')
    let doc = await getDoc(idToken, localId)
    console.log('Get doc status:', doc.status)

    console.log('Creating/updating users/{uid} via Firestore REST')
    const payload = { uid: localId, fullName, email, role: 'client' }
    const up = await createOrUpdateDoc(idToken, localId, payload)
    console.log('Upsert result:', up.status, up.body)

    console.log('Re-reading doc')
    doc = await getDoc(idToken, localId)
    console.log('Get doc status after write:', doc.status)

    // update profile
    console.log('Updating profile (businessName)')
    const up2 = await createOrUpdateDoc(idToken, localId, { businessName: 'REST Biz' })
    console.log('Update result:', up2.status)

    // sign in
    console.log('Signing in to verify login')
    const si = await signIn()
    console.log('signIn result ok, localId:', si.localId)

    // write reports
    const out1 = `# FIRESTORE-RUNTIME-REPORT\n\nCreated user via Auth REST: ${email}\nlocalId: ${localId}\nGet doc status initially: ${doc.status}\nUpsert status: ${up.status}\nRe-read status: ${doc.status}\nUpdate status: ${up2.status}\n`;
    fs.writeFileSync('FIRESTORE-RUNTIME-REPORT.md', out1)

    const out2 = `# AUTH-RUNTIME-REPORT\n\nSignUp response: ${JSON.stringify(su)}\nSignIn response: ${JSON.stringify(si)}\n`;
    fs.writeFileSync('AUTH-RUNTIME-REPORT.md', out2)

    const out3 = `# LIVE-FIREBASE-TEST-REPORT\n\nStatus: PARTIAL\nNote: This run used REST API to validate Auth and Firestore permissions. Frontend E2E tests may still be run separately.\n`;
    fs.writeFileSync('LIVE-FIREBASE-TEST-REPORT.md', out3)

    console.log('REST E2E completed — reports written')
    process.exit(0)
  }catch(err){
    console.error('REST E2E failed:', err)
    fs.writeFileSync('LIVE-FIREBASE-TEST-REPORT.md', `# LIVE-FIREBASE-TEST-REPORT\n\nStatus: FAILURE\nError: ${err.message}\n`)
    process.exit(3)
  }
})()
