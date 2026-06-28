import React, { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import ProtectedRoute from '../../components/ProtectedRoute'
import DashboardLayout from '../../components/dashboard/DashboardLayout'
import { useAuth } from '../../context/AuthContext'

const PAGE_SIZE = 6
const ORDER_STATUSES = ['All', 'Pending', 'Processing', 'In Progress', 'Completed', 'Cancelled', 'On Hold']

const OrderListSkeleton = () => (
  <div style={{ display: 'grid', gap: '20px' }}>
    {[1, 2, 3].map((i) => (
      <div
        key={i}
        className="card"
        style={{
          padding: '20px',
          height: '140px',
          background: 'linear-gradient(90deg, rgba(255,255,255,0.02) 25%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.02) 75%)',
          backgroundSize: '200% 100%',
          animation: 'loading-shimmer 1.5s infinite'
        }}
      />
    ))}
  </div>
)

export default function DashboardOrders(){
  const { user } = useAuth()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [page, setPage] = useState(1)

  useEffect(()=>{
    if(!user) return
    let unsub = null
    setLoading(true)
    setError('')
    ;(async ()=>{
      try{
        const fb = await import('../../firebase/firebaseClient')
        const { collection, query, where, onSnapshot, orderBy } = await import('firebase/firestore')
        const q = query(collection(fb.db,'orders'), where('userId','==', user.uid), orderBy('createdAt','desc'))
        unsub = onSnapshot(q, (snap)=>{
          const data = snap.docs.map(d=>({ id: d.id, ...d.data() }))
          setOrders(data)
          setLoading(false)
          setError('')
        }, (e)=>{ 
          console.error(e)
          setError('Failed to load orders. Please refresh the page.')
          setLoading(false) 
        })
      }catch(e){ 
        console.error(e)
        setError('An error occurred while loading orders.')
        setLoading(false) 
      }
    })()
    return ()=>{ if(unsub) unsub() }
  },[user])

  const filtered = useMemo(() => {
    return orders.filter((order) => {
      const matchesStatus = statusFilter === 'All' || order.status === statusFilter
      const matchesSearch = [order.service, order.customerName, order.customerEmail, order.status, order.reference].some((field) => field?.toString().toLowerCase().includes(search.toLowerCase()))
      return matchesStatus && matchesSearch
    })
  }, [orders, search, statusFilter])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const pagedOrders = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const statusColorMap = {
    'Pending': '#fbbf24',
    'Processing': '#38bdf8',
    'In Progress': '#818cf8',
    'Completed': '#34d399',
    'Cancelled': '#f87171',
    'On Hold': '#a78bfa'
  }

  const handleRetry = () => {
    setError('')
    setLoading(true)
    window.location.reload()
  }

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="section-title">
          <h2>Orders</h2>
          <p>View recent service requests, order status, payment details, and customer activity.</p>
        </div>

        {/* Search and Filter Section */}
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '24px', flexDirection: 'row' }}>
          <input
            type="search"
            placeholder="Search by service, reference, or customer…"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1) }}
            className="dash-form-input"
            style={{ flex: 1, minWidth: '200px' }}
          />
          <select
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setPage(1) }}
            className="dash-form-select"
            style={{ minWidth: '160px' }}
          >
            {ORDER_STATUSES.map((status) => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>

        {/* Error State */}
        {error && (
          <div className="card" style={{ padding: '20px', background: 'rgba(248, 113, 113, 0.1)', borderLeft: '4px solid #f87171' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <div>
                <p style={{ margin: '0 0 6px 0', color: '#f87171', fontWeight: 600 }}>Error loading orders</p>
                <p style={{ margin: 0, color: 'rgba(255,255,255,0.75)', fontSize: '0.9rem' }}>{error}</p>
              </div>
              <button
                onClick={handleRetry}
                className="btn btn-secondary"
                style={{ whiteSpace: 'nowrap' }}
              >
                Retry
              </button>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && <OrderListSkeleton />}

        {/* Empty State */}
        {!loading && !error && filtered.length === 0 && (
          <div className="empty-state" style={{ textAlign: 'center', padding: '60px 20px' }}>
            <p style={{ fontSize: '1.1rem', marginBottom: '12px' }}>No orders found</p>
            <p style={{ color: 'rgba(255,255,255,0.65)', marginBottom: '24px' }}>
              {orders.length === 0 ? 'Start by placing a new order.' : 'Try adjusting your search or filters.'}
            </p>
            {orders.length === 0 && (
              <Link legacyBehavior href="/services">
                <a className="btn btn-primary">Browse Services</a>
              </Link>
            )}
          </div>
        )}

        {/* Orders Grid */}
        {!loading && !error && filtered.length > 0 && (
          <>
            <div style={{ display: 'grid', gap: '20px', marginBottom: '24px' }}>
              {pagedOrders.map((order) => (
                <Link legacyBehavior key={order.id} href={`/dashboard/orders/${order.id}`}>
                  <a className="service-card" style={{ display: 'block', position: 'relative', textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px', flexWrap: 'wrap' }}>
                      <div style={{ flex: 1, minWidth: '200px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px', flexWrap: 'wrap' }}>
                          <h3 style={{ margin: 0, fontSize: '1.1rem', flex: 1, minWidth: '150px' }}>{order.service || 'Order request'}</h3>
                          <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)' }}>{order.reference || 'No ref'}</span>
                        </div>
                        <p style={{ margin: '0 0 12px 0', color: 'rgba(255,255,255,0.72)', fontSize: '0.95rem', lineHeight: 1.5 }}>
                          {order.requirements || order.description || 'No additional details provided.'}
                        </p>
                      </div>
                      <div style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                        <span style={{ 
                          display: 'inline-flex', 
                          padding: '8px 14px', 
                          borderRadius: '999px', 
                          background: `${statusColorMap[order.status] || '#6b7280'}20`,
                          color: statusColorMap[order.status] || '#9ca3af',
                          fontWeight: 700,
                          fontSize: '0.85rem'
                        }}>
                          {order.status || 'Pending'}
                        </span>
                      </div>
                    </div>
                    <div style={{ marginTop: '16px', display: 'grid', gap: '12px', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', fontSize: '0.9rem' }}>
                      <div>
                        <span style={{ color: 'rgba(255,255,255,0.65)', display: 'block', marginBottom: '4px' }}>Payment</span>
                        <span style={{ fontWeight: 600 }}>{order.paymentStatus || 'Pending'}</span>
                      </div>
                      <div>
                        <span style={{ color: 'rgba(255,255,255,0.65)', display: 'block', marginBottom: '4px' }}>Amount</span>
                        <span style={{ fontWeight: 600 }}>₦{Number(order.amount || 0).toLocaleString()}</span>
                      </div>
                      <div>
                        <span style={{ color: 'rgba(255,255,255,0.65)', display: 'block', marginBottom: '4px' }}>Customer</span>
                        <span style={{ fontWeight: 600 }}>{order.customerName || 'Client'}</span>
                      </div>
                    </div>
                  </a>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '24px' }}>
                <button 
                  className="btn btn-ghost" 
                  type="button" 
                  disabled={page <= 1} 
                  onClick={() => setPage((value) => Math.max(1, value - 1))}
                >
                  ← Previous
                </button>
                <span style={{ alignSelf: 'center', color: 'rgba(255,255,255,0.75)', minWidth: '100px', textAlign: 'center' }}>
                  Page {page} of {totalPages}
                </span>
                <button 
                  className="btn btn-ghost" 
                  type="button" 
                  disabled={page >= totalPages} 
                  onClick={() => setPage((value) => Math.min(totalPages, value + 1))}
                >
                  Next →
                </button>
              </div>
            )}
          </>
        )}
      </DashboardLayout>
    </ProtectedRoute>
  )
}
