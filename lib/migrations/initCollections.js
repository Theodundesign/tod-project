// Small migration helper to create collections/doc skeletons for initial setup.
import { adminDb } from '../../firebase/firebaseAdmin'

export async function seed(){
  // create a sample admin user doc (no auth creation)
  const adminSample = {
    fullName: 'Admin',
    email: 'admin@your-domain.com',
    role: 'admin',
    createdAt: new Date(),
  }
  await adminDb.collection('users').doc('ADMIN_UID_PLACEHOLDER').set(adminSample)

  // sample project doc
  await adminDb.collection('projects').add({ title: 'Sample Project', status:'pending', createdAt: new Date(), uid: 'ADMIN_UID_PLACEHOLDER' })

  // sample uploads
  await adminDb.collection('uploads').add({ name:'sample.png', path:'uploads/public/sample.png', createdAt: new Date(), uid: 'ADMIN_UID_PLACEHOLDER', metadata:{size:1234} })

  return true
}
