import React, { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useAuth } from '../context/AuthContext'

const CATEGORIES = [
  {
    id: 'graphic-design',
    title: 'Graphic Design',
    services: [
      { id: 'flyer-design', title: 'Flyer Design' },
      { id: 'poster-design', title: 'Poster Design' },
      { id: 'banner-design', title: 'Banner Design' },
      { id: 'social-media-design', title: 'Social Media Design' },
      { id: 'logo-design', title: 'Logo Design' },
      { id: 'brand-identity', title: 'Brand Identity' },
      { id: 'business-card', title: 'Business Card' },
      { id: 'brochure', title: 'Brochure' },
      { id: 'packaging-design', title: 'Packaging Design' }
    ]
  },
  {
    id: 'web-development',
    title: 'Web Development',
    services: [
      { id: 'landing-pages', title: 'Landing Pages' },
      { id: 'business-website', title: 'Business Website' },
      { id: 'ecommerce-website', title: 'Ecommerce Website' },
      { id: 'portfolio-website', title: 'Portfolio Website' },
      { id: 'school-portal', title: 'School Portal' },
      { id: 'church-website', title: 'Church Website' },
      { id: 'ngo-website', title: 'NGO Website' },
      { id: 'real-estate-website', title: 'Real Estate Website' },
      { id: 'cms', title: 'CMS' },
      { id: 'seo', title: 'SEO' },
      { id: 'website-maintenance', title: 'Website Maintenance' }
    ]
  },
  {
    id: 'app-development',
    title: 'App Development',
    services: [
      { id: 'android-apps', title: 'Android Apps' },
      { id: 'ios-apps', title: 'iOS Apps' },
      { id: 'cross-platform-apps', title: 'Cross-platform Apps' },
      { id: 'admin-dashboard', title: 'Admin Dashboard' },
      { id: 'api-integration', title: 'API Integration' }
    ]
  },
  {
    id: 'training',
    title: 'Training',
    services: [
      { id: 'training-graphic-design', title: 'Graphic Design' },
      { id: 'training-website-development', title: 'Website Development' },
      { id: 'training-app-development', title: 'App Development' },
      { id: 'training-ui-ux', title: 'UI/UX' },
      { id: 'training-ai-productivity', title: 'AI Productivity' },
      { id: 'training-freelancing', title: 'Freelancing' }
    ]
  }
]

const PACKAGES = [
  { id: 'basic', title: 'Basic', description: 'Quick start package for smaller briefs.', amount: 15000, badge: 'Starter', delivery: '3 days', revisions: '2 revisions', support: 'Standard support', icon: '🚀' },
  { id: 'standard', title: 'Standard', description: 'Balanced package for most business needs.', amount: 35000, badge: 'Most popular', delivery: '5 days', revisions: '5 revisions', support: 'Priority support', icon: '💻' },
  { id: 'premium', title: 'Premium', description: 'Full-service delivery with accelerated timelines.', amount: 75000, badge: 'Premium', delivery: '7 days', revisions: 'Unlimited revisions', support: 'Dedicated support', icon: '💎' }
]

const getService = (serviceId) => {
  const all = CATEGORIES.flatMap(category => category.services.map(service => ({ ...service, categoryId: category.id, category: category.title })))
  return all.find(item => item.id === serviceId)
}

export default function OrderPage(){
  const router = useRouter()
  const { service: queryService, category: queryCategory, reference } = router.query
  const { user } = useAuth()
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({ category: '', service: '', package: 'standard', description: '', files: [] })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if(queryCategory && !form.category) {
      setForm(f => ({ ...f, category: queryCategory }))
      setStep(2)
    }
    if(queryService) {
      const selected = getService(String(queryService))
      if(selected) {
        setForm(f => ({ ...f, service: selected.id, category: selected.categoryId }))
        setStep(3)
      }
    }
  }, [queryCategory, queryService, form.category])

  useEffect(() => {
    if(reference) {
      setStep(6)
    }
  }, [reference])

  const selectedCategory = CATEGORIES.find(category => category.id === form.category)
  const availableServices = selectedCategory ? selectedCategory.services : []
  const selectedService = useMemo(() => getService(form.service), [form.service])
  const selectedPackage = PACKAGES.find(pkg => pkg.id === form.package) || PACKAGES[1]

  const handleFileChange = (event) => {
    setForm(f => ({ ...f, files: Array.from(event.target.files || []).map(file => file.name) }))
  }

  const handleNextStep = () => {
    setError('')
    if(step === 1 && !form.category) return setError('Choose a service category to continue.')
    if(step === 2 && !form.service) return setError('Choose a service to continue.')
    if(step === 3 && !form.package) return setError('Choose a package to continue.')
    setStep(prev => Math.min(prev + 1, 6))
  }

  const handleOrderSubmit = async () => {
    if(!user){
      const redirect = encodeURIComponent(`/order?service=${form.service}`)
      router.replace(`/login?redirect=${redirect}`)
      return
    }

    if(!selectedService) return setError('Please select a service before continuing.')
    setLoading(true)
    setError('')

    try{
      const reference = `odun_${Date.now()}`
      
      // First, create order in Firestore with initial details
      const createOrderRes = await fetch('/api/orders/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.uid,
          userEmail: user.email,
          category: selectedCategory?.title || '',
          service: selectedService.title,
          packageName: selectedPackage.title,
          amount: selectedPackage.amount,
          description: form.description,
          files: form.files,
          customerName: user.displayName || '',
          customerEmail: user.email,
          deliveryDays: selectedPackage.delivery ? parseInt(selectedPackage.delivery) : 5,
          revisions: selectedPackage.revisions
        })
      })

      const createOrderData = await createOrderRes.json()
      if(!createOrderRes.ok) throw new Error(createOrderData.error || 'Failed to create order')

      // Then initialize payment with order ID
      const response = await fetch('/api/payments/initialize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.uid,
          email: user.email,
          orderId: createOrderData.orderId,
          category: selectedCategory?.title || '',
          service: selectedService.title,
          packageName: selectedPackage.title,
          amount: selectedPackage.amount,
          description: form.description,
          files: form.files,
          reference,
          callbackUrl: `${window.location.origin}/order`
        })
      })

      const payload = await response.json()
      if(!response.ok) throw new Error(payload.error || 'Unable to initialize payment.')
      window.location.href = payload.authorization_url
    }catch(e){
      console.error(e)
      setError(e.message || 'Payment initialization failed.')
    }finally{
      setLoading(false)
    }
  }

  return (
    <main className="container">
      <div className="section-title">
        <h2>Order a service</h2>
        <p>Follow the guided steps to submit a brief, choose a package, and complete payment securely.</p>
        <div style={{marginTop:10}}>
          <Link legacyBehavior href="/services"><a className="btn btn-secondary">Browse Services</a></Link>
        </div>
      </div>
      <div className="order-progress">
        {[
          { step: 1, label: 'Category' },
          { step: 2, label: 'Service' },
          { step: 3, label: 'Package' },
          { step: 4, label: 'Brief' },
          { step: 5, label: 'Files' },
          { step: 6, label: 'Review' }
        ].map(item => {
          const status = item.step < step ? 'completed' : item.step === step ? 'current' : 'pending'
          return (
            <div key={item.step} className={`order-progress-step ${status}`}>
              <div className="step-marker">{status === 'completed' ? '✔' : item.step}</div>
              <p>{item.label}</p>
            </div>
          )
        })}
      </div>

      {step === 1 && (
        <div className="order-category-grid">
          {CATEGORIES.map(category => (
            <button key={category.id} type="button" className={`order-category-card ${form.category === category.id ? 'active' : ''}`} onClick={() => { setForm(f => ({ ...f, category: category.id, service: '' })); setError(''); setStep(2) }}>
              <div className="order-category-icon">{category.icon}</div>
              <div className="order-category-body">
                <h3>{category.title}</h3>
                <p>{category.description}</p>
              </div>
              <div className="order-category-meta">
                <span>{category.services.length} services</span>
                <strong>Start from ₦15,000</strong>
              </div>
            </button>
          ))}
        </div>
      )}

      {step === 2 && (
        <div className="order-service-grid">
          {availableServices.length ? availableServices.map(service => (
            <button key={service.id} type="button" className={`order-service-card ${form.service === service.id ? 'active' : ''}`} onClick={() => { setForm(f => ({ ...f, service: service.id })); setError(''); setStep(3) }}>
              <div className="service-card-preview">{service.title.charAt(0)}</div>
              <div className="service-card-copy">
                <h3>{service.title}</h3>
                <p>Premium delivery for your business needs.</p>
                <div className="service-card-meta">
                  <span>3–5 days</span>
                  <strong>From ₦15,000</strong>
                </div>
              </div>
            </button>
          )) : <div className="empty-state">Choose a category first to see available services.</div>}
        </div>
      )}

      {step === 3 && (
        <div className="order-package-cards">
          {PACKAGES.map(pkg => (
            <button key={pkg.id} type="button" className={`order-package-card ${form.package === pkg.id ? 'selected' : ''}`} onClick={() => { setForm(f => ({ ...f, package: pkg.id })); setStep(4) }}>
              <div className="package-badge">{pkg.badge}</div>
              <div className="package-visual">{pkg.icon}</div>
              <h3>{pkg.title}</h3>
              <p>{pkg.description}</p>
              <ul className="package-features">
                <li>{pkg.revisions}</li>
                <li>{pkg.delivery}</li>
                <li>{pkg.support}</li>
              </ul>
              <div className="package-summary">
                <span>Starting price</span>
                <strong>N{pkg.amount.toLocaleString()}</strong>
              </div>
            </button>
          ))}
        </div>
      )}

      {step === 4 && (
        <div className="card">
          <label className="float-label">Describe your project<textarea rows={6} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} /></label>
        </div>
      )}

      {step === 5 && (
        <div className="card file-upload">
          <label className="float-label">Upload project files<input type="file" multiple onChange={handleFileChange} /></label>
          {form.files.length > 0 && (
            <div className="file-list">
              {form.files.map(name => <div key={name} className="file-chip">{name}</div>)}
            </div>
          )}
        </div>
      )}

      {step === 6 && (
        <div className="review-card">
          <h3>Review order</h3>
          <div className="review-row"><span>Category</span><strong>{selectedCategory?.title || 'Not selected'}</strong></div>
          <div className="review-row"><span>Service</span><strong>{selectedService?.title || 'Not selected'}</strong></div>
          <div className="review-row"><span>Package</span><strong>{selectedPackage?.title || ''}</strong></div>
          <div className="review-row"><span>Amount</span><strong>N{selectedPackage?.amount?.toLocaleString()}</strong></div>
          <div className="review-row"><span>Brief</span><p>{form.description || 'No brief provided yet.'}</p></div>
          <div className="review-row"><span>Files</span><p>{form.files.length ? `${form.files.length} files attached` : 'No files attached'}</p></div>
          {reference && <div className="order-status success">Payment reference received: {reference}</div>}
        </div>
      )}

      {error && <div className="error-message">{error}</div>}

      <div className="order-actions">
        {step > 1 && <button type="button" className="secondary-btn" onClick={() => setStep(prev => Math.max(prev - 1, 1))}>Back</button>}
        {(step === 4 || step === 5) && <button type="button" className="primary-btn" onClick={handleNextStep}>Continue</button>}
        {step === 6 && (
          <button type="button" className="primary-btn" onClick={handleOrderSubmit} disabled={loading}>
            {loading ? 'Starting payment…' : user ? 'Continue to payment' : 'Login to complete order'}
          </button>
        )}
      </div>

      <div className="meta-note">
        <p>After payment you will be redirected back and can track the order from your dashboard.</p>
      </div>

      <div className="order-help">
        <p>Need help? <Link legacyBehavior href="/contact"><a>Contact support</a></Link></p>
      </div>
    </main>
  )
}
