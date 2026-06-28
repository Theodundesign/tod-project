import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import ProtectedRoute from '../../components/ProtectedRoute'
import DashboardLayout from '../../components/dashboard/DashboardLayout'
import { useAuth } from '../../context/AuthContext'
import { useToast } from '../../components/ui/ToastContext'

const LANGUAGES = ['English', 'French', 'Spanish', 'Portuguese']
const TIMEZONES = ['UTC', 'Africa/Lagos', 'Europe/London', 'America/New_York', 'Asia/Dubai']

const defaultProfileState = {
  fullName: '',
  displayName: '',
  email: '',
  phone: '',
  company: '',
  website: '',
  jobTitle: '',
  country: '',
  state: '',
  city: '',
  address: '',
  bio: '',
  socialLinks: {
    twitter: '',
    linkedin: '',
    instagram: '',
    facebook: ''
  },
  profileImage: '',
  profileImagePath: '',
  notifications: {
    email: true,
    orders: true,
    marketing: false,
    security: true
  },
  preferences: {
    darkMode: true,
    language: 'English',
    timezone: 'UTC'
  }
}

export default function Settings(){
  const { user, profile, updateProfile, uploadProfileImage, deleteProfileImage, changePassword } = useAuth()
  const toast = useToast()
  const [form, setForm] = useState(defaultProfileState)
  const [loading, setLoading] = useState(false)
  const [imageUploading, setImageUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [passwordState, setPasswordState] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' })
  const [passwordError, setPasswordError] = useState('')

  useEffect(()=>{
    if(!profile) return
    setForm({
      fullName: profile.fullName || '',
      displayName: profile.displayName || profile.fullName || '',
      email: profile.email || user?.email || '',
      phone: profile.phone || profile.phoneNumber || '',
      company: profile.company || '',
      website: profile.website || '',
      jobTitle: profile.jobTitle || '',
      country: profile.country || '',
      state: profile.state || '',
      city: profile.city || '',
      address: profile.address || '',
      bio: profile.bio || '',
      socialLinks: {
        twitter: profile.socialLinks?.twitter || '',
        linkedin: profile.socialLinks?.linkedin || '',
        instagram: profile.socialLinks?.instagram || '',
        facebook: profile.socialLinks?.facebook || ''
      },
      profileImage: profile.profileImage || profile.photoURL || '',
      profileImagePath: profile.profileImagePath || '',
      notifications: {
        email: profile.notifications?.email ?? true,
        orders: profile.notifications?.orders ?? true,
        marketing: profile.notifications?.marketing ?? false,
        security: profile.notifications?.security ?? true
      },
      preferences: {
        darkMode: profile.preferences?.darkMode ?? true,
        language: profile.preferences?.language || 'English',
        timezone: profile.preferences?.timezone || 'UTC'
      }
    })
  }, [profile, user])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleSocialChange = (key, e) => {
    const { value } = e.target
    setForm((current) => ({
      ...current,
      socialLinks: {
        ...current.socialLinks,
        [key]: value
      }
    }))
  }

  const validateWebsite = (value) => {
    if (!value) return true
    try {
      const uri = value.startsWith('http') ? value : `https://${value}`
      new URL(uri)
      return true
    } catch {
      return false
    }
  }

  const validateProfile = () => {
    if (!form.fullName.trim()) throw new Error('Please enter your full name.')
    if (!form.displayName.trim()) throw new Error('Please enter a display name.')
    if (!form.email.trim()) throw new Error('Your account email is required.')
    if (form.website && !validateWebsite(form.website.trim())) throw new Error('Please enter a valid website address.')
    return true
  }

  const handleToggle = (section, key) => {
    setForm((current) => ({
      ...current,
      [section]: {
        ...current[section],
        [key]: !current[section][key]
      }
    }))
  }

  const handlePreference = (key, value) => {
    setForm((current) => ({
      ...current,
      preferences: {
        ...current.preferences,
        [key]: value
      }
    }))
  }

  const handleImage = async (e) => {
    const file = e.target.files?.[0]
    if(!file) return

    setImageUploading(true)
    setUploadProgress(0)

    try {
      const maxBytes = 5 * 1024 * 1024
      if (file.size > maxBytes) throw new Error('file-too-large')
      if (!/^(image\/jpeg|image\/png|image\/webp)$/i.test(file.type)) throw new Error('invalid-file-type')

      const uploadDetails = await uploadProfileImage(file, (snapshot) => {
        if (snapshot?.totalBytes) {
          setUploadProgress(Math.min(100, Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)))
        }
      }, form.profileImagePath)

      if (uploadDetails) {
        setForm((current) => ({
          ...current,
          profileImage: uploadDetails.url,
          profileImagePath: uploadDetails.path
        }))
        toast.push({ message: 'Profile image uploaded successfully', type: 'success' })
      }
    } catch (e) {
      console.error('Profile image upload error:', e)
      const errorMap = {
        'file-too-large': 'Image must be under 5 MB.',
        'invalid-file-type': 'Only JPG, PNG, and WEBP are allowed.'
      }
      const codeSuffix = e?.code ? ` (${e.code})` : ''
      const message = errorMap[e.message] || (typeof e.message === 'string' ? `${e.message}${codeSuffix}` : `Upload failed${codeSuffix}`)
      toast.push({ message, type: 'error' })
    } finally {
      setImageUploading(false)
      setUploadProgress(0)
      if (e?.target) e.target.value = ''
    }
  }

  const handleDeleteImage = async () => {
    if (!form.profileImagePath) {
      setForm((current) => ({ ...current, profileImage: '', profileImagePath: '' }))
      return
    }

    setLoading(true)
    try {
      await deleteProfileImage(form.profileImagePath)
      setForm((current) => ({ ...current, profileImage: '', profileImagePath: '' }))
      toast.push({ message: 'Profile image removed', type: 'success' })
    } catch (e) {
      toast.push({ message: e.message || 'Removal failed', type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  const saveProfile = async () => {
    setLoading(true)
    try {
      validateProfile()
      await updateProfile(form)
      toast.push({ message: 'Your profile has been updated successfully.', type: 'success' })
    } catch (e) {
      toast.push({ message: e.message || 'Save failed', type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  const handlePasswordSave = async () => {
    setPasswordError('')
    if (!passwordState.currentPassword || !passwordState.newPassword) {
      setPasswordError('Please enter your current and new password.')
      return
    }
    if (passwordState.newPassword !== passwordState.confirmPassword) {
      setPasswordError('New passwords do not match.')
      return
    }
    if (passwordState.newPassword.length < 6) {
      setPasswordError('Password must be at least 6 characters.')
      return
    }

    setLoading(true)
    try {
      await changePassword(passwordState.currentPassword, passwordState.newPassword)
      setPasswordState({ currentPassword: '', newPassword: '', confirmPassword: '' })
      toast.push({ message: 'Password updated successfully', type: 'success' })
    } catch (e) {
      setPasswordError(e.message || 'Password update failed.')
    } finally {
      setLoading(false)
    }
  }

  if (!user) return <div className="container">Please login to manage settings.</div>

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="section-title">
          <h2>Account Settings</h2>
          <p>Manage your personal profile, security settings, notifications, and preferences.</p>
        </div>

        <div className="settings-grid">
          <section className="card settings-card">
            <h3>Profile</h3>
            <p>Update your display info and profile photo for the dashboard.</p>

            <div className="profile-photo-panel">
              {form.profileImage ? (
                <Image src={form.profileImage} alt="Profile avatar" width={120} height={120} className="profile-picture-preview" unoptimized />
              ) : (
                <div className="profile-picture-preview fallback">{(form.fullName || form.displayName || user.email || '?')[0]?.toUpperCase()}</div>
              )}

              <div className="profile-photo-actions">
                <label className="btn btn-secondary">
                  Upload image
                  <input type="file" accept="image/jpeg,image/png,image/webp" hidden onChange={handleImage} />
                </label>
                {form.profileImage && (
                  <button type="button" className="btn btn-ghost" onClick={handleDeleteImage} disabled={loading}>Delete</button>
                )}
              </div>

              {imageUploading && (
                <div className="upload-progress-bar">
                  <span className="upload-progress-fill" style={{ width: `${uploadProgress}%` }} />
                  <small>{uploadProgress}% uploaded</small>
                </div>
              )}

              <p className="settings-hint">Allowed: JPG, PNG, WEBP. Images are resized and optimized for secure dashboard delivery.</p>
            </div>
          </section>

          <section className="card settings-card">
            <h3>Personal Information</h3>
            <div className="form-grid">
              <label className="form-field">
                <span>Full Name</span>
                <input name="fullName" value={form.fullName} onChange={handleChange} placeholder="Full name" />
              </label>
              <label className="form-field">
                <span>Display Name</span>
                <input name="displayName" value={form.displayName} onChange={handleChange} placeholder="Display name" />
              </label>
              <label className="form-field">
                <span>Email</span>
                <input name="email" value={form.email} readOnly />
              </label>
              <label className="form-field">
                <span>Phone</span>
                <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" />
              </label>
              <label className="form-field">
                <span>Company</span>
                <input name="company" value={form.company} onChange={handleChange} placeholder="Company" />
              </label>
              <label className="form-field">
                <span>Website</span>
                <input name="website" value={form.website} onChange={handleChange} placeholder="https://yoursite.com" type="text" />
              </label>
              <label className="form-field">
                <span>Job Title</span>
                <input name="jobTitle" value={form.jobTitle} onChange={handleChange} placeholder="Job title" />
              </label>
              <label className="form-field">
                <span>Country</span>
                <input name="country" value={form.country} onChange={handleChange} placeholder="Country" />
              </label>
              <label className="form-field">
                <span>State</span>
                <input name="state" value={form.state} onChange={handleChange} placeholder="State" />
              </label>
              <label className="form-field">
                <span>City</span>
                <input name="city" value={form.city} onChange={handleChange} placeholder="City" />
              </label>
              <label className="form-field full-width">
                <span>Address</span>
                <input name="address" value={form.address} onChange={handleChange} placeholder="Address" />
              </label>
              <label className="form-field full-width">
                <span>Bio</span>
                <textarea name="bio" value={form.bio} onChange={handleChange} placeholder="Tell us about yourself" rows="4" />
              </label>
            </div>
          </section>

          <section className="card settings-card">
            <h3>Social Media</h3>
            <div className="form-grid">
              <label className="form-field">
                <span>Twitter / X</span>
                <input value={form.socialLinks.twitter} onChange={(e) => handleSocialChange('twitter', e)} placeholder="@yourhandle" />
              </label>
              <label className="form-field">
                <span>LinkedIn</span>
                <input value={form.socialLinks.linkedin} onChange={(e) => handleSocialChange('linkedin', e)} placeholder="linkedin.com/in/..." />
              </label>
              <label className="form-field">
                <span>Instagram</span>
                <input value={form.socialLinks.instagram} onChange={(e) => handleSocialChange('instagram', e)} placeholder="@yourhandle" />
              </label>
              <label className="form-field">
                <span>Facebook</span>
                <input value={form.socialLinks.facebook} onChange={(e) => handleSocialChange('facebook', e)} placeholder="facebook.com/..." />
              </label>
            </div>
          </section>

          <section className="card settings-card">
            <h3>Password & Security</h3>
            <div className="form-grid">
              <label className="form-field">
                <span>Current Password</span>
                <input type="password" name="currentPassword" value={passwordState.currentPassword} onChange={(e) => setPasswordState((current) => ({ ...current, currentPassword: e.target.value }))} placeholder="Current password" />
              </label>
              <label className="form-field">
                <span>New Password</span>
                <input type="password" name="newPassword" value={passwordState.newPassword} onChange={(e) => setPasswordState((current) => ({ ...current, newPassword: e.target.value }))} placeholder="New password" />
              </label>
              <label className="form-field">
                <span>Confirm Password</span>
                <input type="password" name="confirmPassword" value={passwordState.confirmPassword} onChange={(e) => setPasswordState((current) => ({ ...current, confirmPassword: e.target.value }))} placeholder="Confirm password" />
              </label>
            </div>
            {passwordError && <div className="auth-error" style={{ marginTop: 12 }}>{passwordError}</div>}
            <div className="settings-actions" style={{ marginTop: 18 }}>
              <button type="button" className="btn btn-primary" onClick={handlePasswordSave} disabled={loading}>
                {loading ? 'Updating password…' : 'Update password'}
              </button>
            </div>
          </section>

          <section className="card settings-card">
            <h3>Notifications</h3>
            <div className="settings-toggle-grid">
              <label className="switch-toggle">
                <input type="checkbox" checked={form.notifications.email} onChange={() => handleToggle('notifications', 'email')} />
                <span>Email notifications</span>
              </label>
              <label className="switch-toggle">
                <input type="checkbox" checked={form.notifications.orders} onChange={() => handleToggle('notifications', 'orders')} />
                <span>Order updates</span>
              </label>
              <label className="switch-toggle">
                <input type="checkbox" checked={form.notifications.marketing} onChange={() => handleToggle('notifications', 'marketing')} />
                <span>Marketing emails</span>
              </label>
              <label className="switch-toggle">
                <input type="checkbox" checked={form.notifications.security} onChange={() => handleToggle('notifications', 'security')} />
                <span>Security alerts</span>
              </label>
            </div>
          </section>

          <section className="card settings-card">
            <h3>Preferences</h3>
            <div className="settings-toggle-grid">
              <label className="switch-toggle">
                <input type="checkbox" checked={form.preferences.darkMode} onChange={() => handlePreference('darkMode', !form.preferences.darkMode)} />
                <span>Dark mode</span>
              </label>
              <label className="form-field full-width">
                <span>Language</span>
                <select value={form.preferences.language} onChange={(e) => handlePreference('language', e.target.value)}>
                  {LANGUAGES.map((lang) => <option key={lang} value={lang}>{lang}</option>)}
                </select>
              </label>
              <label className="form-field full-width">
                <span>Time zone</span>
                <select value={form.preferences.timezone} onChange={(e) => handlePreference('timezone', e.target.value)}>
                  {TIMEZONES.map((zone) => <option key={zone} value={zone}>{zone}</option>)}
                </select>
              </label>
            </div>
          </section>
        </div>

        <div className="settings-actions" style={{ marginTop: 24 }}>
          <button className="btn btn-primary" onClick={saveProfile} disabled={loading || imageUploading}>
            {loading ? 'Saving profile…' : 'Save changes'}
          </button>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
