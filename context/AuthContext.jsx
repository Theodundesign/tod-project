import React, { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext({})

export function AuthProvider({ children }){
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState(null)

  useEffect(()=>{
    let unsubscribeAuth = null
    let unsubscribeProfile = null

    const initAuth = async () => {
      const { auth, db } = await import('../firebase/firebaseClient')
      const { onAuthStateChanged } = await import('firebase/auth')
      const { doc, onSnapshot, setDoc, serverTimestamp } = await import('firebase/firestore')

      unsubscribeAuth = onAuthStateChanged(auth, (u) => {
        setUser(u)
        if (unsubscribeProfile) { unsubscribeProfile(); unsubscribeProfile = null }

        if (!u) {
          setProfile(null)
          setLoading(false)
          return
        }

        const initProfileListener = async () => {
          try {
            if (auth.currentUser) {
              await auth.currentUser.getIdToken(true)
            }
          } catch (tokenError) {
            console.warn('Auth token refresh failed before Firestore listen:', tokenError)
          }

          const profileRef = doc(db, 'users', u.uid)
          setDoc(profileRef, {
            lastLogin: serverTimestamp(),
            email: u.email || '',
            displayName: u.displayName || '',
            updatedAt: serverTimestamp()
          }, { merge: true }).catch((error) => {
            console.warn('Unable to update lastLogin for profile listener:', error)
          })
          unsubscribeProfile = onSnapshot(profileRef, (snap) => {
            console.log('Profile snapshot for', u.uid, 'exists=', snap.exists())
            setProfile(snap.exists() ? { uid: snap.id, ...snap.data() } : null)
            setLoading(false)
          }, (error) => {
            console.error('Firestore profile listener error:', error)
            setProfile(null)
            setLoading(false)
          })
        }

        initProfileListener().catch((error) => {
          console.error('Failed to initialize profile listener:', error)
          setProfile(null)
          setLoading(false)
        })
      })
    }

    initAuth().catch((error) => {
      console.error('Auth initialization failed:', error)
      setLoading(false)
    })

    return () => {
      if(unsubscribeAuth) unsubscribeAuth()
      if(unsubscribeProfile) unsubscribeProfile()
    }
  },[])

  const signup = async ({ fullName, email, password, phone }) => {
    const { auth, db } = await import('../firebase/firebaseClient')
    const { createUserWithEmailAndPassword, setPersistence, browserLocalPersistence } = await import('firebase/auth')
    const { doc, getDoc, setDoc, serverTimestamp } = await import('firebase/firestore')

    await setPersistence(auth, browserLocalPersistence)
    const res = await createUserWithEmailAndPassword(auth, email, password)
    const u = res.user
    const userRef = doc(db, 'users', u.uid)
    const existing = await getDoc(userRef)

    const userPayload = {
      uid: u.uid,
      fullName: fullName || '',
      displayName: fullName || '',
      email,
      phone: phone || '',
      role: 'client',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      lastLogin: serverTimestamp()
    }

    if(!existing.exists()){
      console.log('Creating users doc for', u.uid)
      await setDoc(userRef, userPayload)
    } else {
      console.log('Merging users doc for', u.uid)
      await setDoc(userRef, userPayload, { merge: true })
    }

    return res
  }

  const updateProfile = async (updates = {}) => {
    const { auth, db } = await import('../firebase/firebaseClient')
    if(!auth.currentUser) throw new Error('not-authenticated')
    const uid = auth.currentUser.uid
    const { doc, setDoc, serverTimestamp } = await import('firebase/firestore')
    await setDoc(doc(db, 'users', uid), { ...updates, updatedAt: serverTimestamp() }, { merge: true })
    return true
  }

  const uploadProfileImage = async (file, onProgress, previousImagePath) => {
    const { auth, db } = await import('../firebase/firebaseClient')
    if(!auth.currentUser) throw new Error('not-authenticated')
    const uid = auth.currentUser.uid
    const { uploadProfileImage: uploadImageToStorage, deleteProfileImage: deleteImageFromStorage } = await import('../lib/storage')
    
    try {
      const res = await uploadImageToStorage(file, uid, onProgress)
      if(res && res.url){
        const { doc, setDoc, serverTimestamp } = await import('firebase/firestore')
        const { updateProfile: updateAuthProfile } = await import('firebase/auth')
        try {
          await setDoc(doc(db, 'users', uid), { profileImage: res.url, photoURL: res.url, profileImagePath: res.path, updatedAt: serverTimestamp() }, { merge: true })
          if (auth.currentUser) {
            await updateAuthProfile(auth.currentUser, { photoURL: res.url })
          }
        } catch (updateError) {
          console.error('Failed to update Firestore/Auth with image URL:', updateError)
          throw new Error('image-saved-but-firestore-failed')
        }
        if(previousImagePath && previousImagePath !== res.path){
          try { await deleteImageFromStorage(previousImagePath) } catch (cleanupError) { console.warn('Profile image cleanup failed', cleanupError) }
        }
        return res
      }
      return null
    } catch (uploadError) {
      console.error('Image upload failed:', uploadError)
      throw uploadError
    }
  }

  const deleteProfileImage = async (path) => {
    const { auth, db } = await import('../firebase/firebaseClient')
    if(!auth.currentUser) throw new Error('not-authenticated')
    const uid = auth.currentUser.uid
    const { doc, setDoc, serverTimestamp } = await import('firebase/firestore')
    const { deleteProfileImage: deleteImageFromStorage } = await import('../lib/storage')
    if(path){
      await deleteImageFromStorage(path)
    }
    await setDoc(doc(db, 'users', uid), { profileImage: '', photoURL: '', profileImagePath: '', updatedAt: serverTimestamp() }, { merge: true })
    return true
  }

  const changePassword = async (currentPassword, newPassword) => {
    const { auth } = await import('../firebase/firebaseClient')
    if(!auth.currentUser) throw new Error('not-authenticated')
    const { updatePassword, EmailAuthProvider, reauthenticateWithCredential } = await import('firebase/auth')
    if (currentPassword) {
      const credential = EmailAuthProvider.credential(auth.currentUser.email, currentPassword)
      await reauthenticateWithCredential(auth.currentUser, credential)
    }
    return updatePassword(auth.currentUser, newPassword)
  }

  const login = async (email, password) => {
    const { auth, db } = await import('../firebase/firebaseClient')
    const { signInWithEmailAndPassword, setPersistence, browserLocalPersistence } = await import('firebase/auth')
    const { doc, setDoc, serverTimestamp } = await import('firebase/firestore')
    await setPersistence(auth, browserLocalPersistence)
    const res = await signInWithEmailAndPassword(auth, email, password)
    await setDoc(doc(db, 'users', res.user.uid), { lastLogin: serverTimestamp(), email }, { merge: true })
    return res
  }

  const logout = async () => {
    const { auth } = await import('../firebase/firebaseClient')
    const { signOut } = await import('firebase/auth')
    return signOut(auth)
  }

  const resetPassword = async (email) => {
    const { auth } = await import('../firebase/firebaseClient')
    const { sendPasswordResetEmail } = await import('firebase/auth')

    const continueUrl = typeof window !== 'undefined'
      ? `${window.location.origin}`
      : process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    const actionCodeSettings = {
      url: `${continueUrl}/login`,
      handleCodeInApp: false
    }

    console.debug('Password reset actionCodeSettings', actionCodeSettings)
    return sendPasswordResetEmail(auth, email, actionCodeSettings)
  }

  const googleSignIn = async () => {
    const { auth, db } = await import('../firebase/firebaseClient')
    const { GoogleAuthProvider, signInWithPopup, setPersistence, browserLocalPersistence } = await import('firebase/auth')
    const { doc, getDoc, setDoc, serverTimestamp } = await import('firebase/firestore')

    await setPersistence(auth, browserLocalPersistence)
    const provider = new GoogleAuthProvider()
    const res = await signInWithPopup(auth, provider)
    const u = res.user
    const userRef = doc(db, 'users', u.uid)
    const existing = await getDoc(userRef)

    if(!existing.exists()){
      await setDoc(userRef, {
        uid: u.uid,
        fullName: u.displayName || '',
        displayName: u.displayName || '',
        email: u.email,
        phone: u.phoneNumber || '',
        photoURL: u.photoURL || '',
        role: 'client',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        lastLogin: serverTimestamp()
      })
    } else {
      await setDoc(userRef, {
        email: u.email,
        displayName: u.displayName || '',
        photoURL: u.photoURL || '',
        updatedAt: serverTimestamp(),
        lastLogin: serverTimestamp()
      }, { merge: true })
    }

    return res
  }

  return (
    <AuthContext.Provider value={{ user, profile, loading, signup, login, logout, resetPassword, googleSignIn, updateProfile, uploadProfileImage, deleteProfileImage, changePassword }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
