let _cached = null

async function ensure() {
  if (_cached) return _cached
  const fb = await import('../firebase/firebaseClient')
  const storageModule = await import('firebase/storage')
  _cached = { storage: fb.storage, storageModule }
  return _cached
}

function isValidImageMime(type) {
  return /^(image\/jpeg|image\/png|image\/webp)$/i.test(type)
}

export async function resizeImageFile(file, maxDimension = 1200, quality = 0.86) {
  if (!isValidImageMime(file.type)) throw new Error('Unsupported image type. Use JPG, PNG, or WEBP.')
  if (typeof createImageBitmap !== 'function' || typeof document === 'undefined') {
    return file
  }

  const bitmap = await createImageBitmap(file)
  const scale = Math.min(1, maxDimension / Math.max(bitmap.width, bitmap.height))
  const width = Math.round(bitmap.width * scale)
  const height = Math.round(bitmap.height * scale)
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  ctx.drawImage(bitmap, 0, 0, width, height)

  const mimeType = file.type === 'image/png' ? 'image/png' : 'image/jpeg'
  const blob = await new Promise((resolve) => canvas.toBlob(resolve, mimeType, quality))
  if (!blob) return file

  return new File([blob], file.name.replace(/\.[^/.]+$/, '.jpg'), { type: blob.type })
}

export async function uploadFile(file, subpath='references', onProgress){
  const { storage, storageModule } = await ensure()
  const { ref, uploadBytes, getDownloadURL } = storageModule
  
  // Construct the path - if subpath already includes userId, use it as-is
  // Otherwise, assume it's just a category like 'references'
  const fullPath = subpath.includes('/') 
    ? `${subpath}/${Date.now()}_${file.name}`
    : `uploads/${subpath}/${Date.now()}_${file.name}`
  
  const storageRef = ref(storage, fullPath)

  try {
    console.debug('Uploading file to Firebase Storage', {
      storageBucket: storage?.app?.options?.storageBucket,
      storagePath: storageRef.fullPath,
      fileType: file.type,
      fileSize: file.size,
    })

    const snapshot = await uploadBytes(storageRef, file)
    if (onProgress) {
      onProgress({ bytesTransferred: file.size, totalBytes: file.size })
    }
    const url = await getDownloadURL(storageRef)
    return { url, path: snapshot.ref.fullPath, metadata: snapshot.metadata }
  } catch (error) {
    console.error('Storage uploadFile failed:', error, {
      bucket: storage?.app?.options?.storageBucket,
      path: storageRef.fullPath,
      fullError: error
    })
    throw error
  }
}

export async function uploadProfileImage(file, uid, onProgress){
  if(!uid) throw new Error('uid required')
  if(!isValidImageMime(file.type)) throw new Error('invalid-file-type')
  const resized = await resizeImageFile(file)
  const maxBytes = 5 * 1024 * 1024 // 5MB
  if(resized.size > maxBytes) throw new Error('file-too-large')
  const { storage, storageModule } = await ensure()
  const { ref, uploadBytes, getDownloadURL } = storageModule
  const storageRef = ref(storage, `users/${uid}/profile/avatar_${Date.now()}.jpg`)

  try {
    console.debug('Uploading profile image to Firebase Storage', {
      storageBucket: storage?.app?.options?.storageBucket,
      storagePath: storageRef.fullPath,
      uid,
      fileType: resized.type,
      fileSize: resized.size,
    })

    await uploadBytes(storageRef, resized)
    if (onProgress) {
      onProgress({ bytesTransferred: resized.size, totalBytes: resized.size })
    }
    const url = await getDownloadURL(storageRef)
    return { url, path: storageRef.fullPath }
  } catch (error) {
    console.error('Storage uploadProfileImage failed:', error, {
      bucket: storage?.app?.options?.storageBucket,
      path: storageRef.fullPath,
      fullError: error
    })
    throw error
  }
}

export async function deleteProfileImage(path){
  if(!path) return
  const { storage, storageModule } = await ensure()
  const { ref, deleteObject } = storageModule
  return deleteObject(ref(storage, path))
}

export async function listFilesAt(prefix){
  const { storage, storageModule } = await ensure()
  const { ref, listAll, getDownloadURL } = storageModule
  const listRef = ref(storage, prefix)
  const res = await listAll(listRef)
  const items = await Promise.all(res.items.map(async (it)=>{
    const url = await getDownloadURL(it)
    return {name: it.name, path: it.fullPath, url}
  }))
  return items
}

export async function deleteFile(path){
  const { storage, storageModule } = await ensure()
  const { ref, deleteObject } = storageModule
  const dref = ref(storage, path)
  return deleteObject(dref)
}
