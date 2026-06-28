import Link from 'next/link'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useRouter } from 'next/router'
import { useAuth } from '../../context/AuthContext'
import { SEARCH_ENTRIES, POPULAR_SEARCHES } from '../../lib/searchData'

const STORAGE_KEY = 'the_odun_design_search_history'
const GROUP_ORDER = ['Pages', 'Services', 'Portfolio', 'Training', 'Dashboard']

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function highlightText(text, query) {
  if (!query) return text
  const regex = new RegExp(`(${escapeRegExp(query)})`, 'gi')
  const parts = text.split(regex)
  return parts.map((part, index) =>
    regex.test(part) ? (
      <mark key={index}>{part}</mark>
    ) : (
      <span key={index}>{part}</span>
    )
  )
}

export default function GlobalSearch({ open, onClose, onOpen }) {
  const { user } = useAuth()
  const [query, setQuery] = useState('')
  const [recentSearches, setRecentSearches] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [mounted, setMounted] = useState(false)
  const router = useRouter()
  const inputRef = useRef(null)
  const suggestionsRef = useRef(null)
  const modalRef = useRef(null)
  const previousFocusRef = useRef(null)

  // Load recent searches from localStorage
  useEffect(() => {
    setMounted(true)
    const raw = typeof window !== 'undefined' ? window.localStorage.getItem(STORAGE_KEY) : null
    if (raw) {
      try {
        const parsed = JSON.parse(raw)
        if (Array.isArray(parsed)) setRecentSearches(parsed.slice(0, 10))
      } catch (error) {
        console.warn('Search history parse failed', error)
      }
    }

    return () => setMounted(false)
  }, [])

  // Focus and body lock when opening
  useEffect(() => {
    if (open) {
      previousFocusRef.current = document.activeElement
      document.body.style.overflow = 'hidden'
      setSelectedIndex(0)
      const timer = setTimeout(() => inputRef.current?.focus(), 50)
      return () => clearTimeout(timer)
    }

    document.body.style.overflow = ''
    if (previousFocusRef.current?.focus) {
      previousFocusRef.current.focus()
    }
  }, [open])

  // Debounce loading state
  useEffect(() => {
    if (!open || !query) return
    setLoading(true)
    const timer = setTimeout(() => setLoading(false), 250)
    return () => clearTimeout(timer)
  }, [query, open])

  const normalizedQuery = query.trim().toLowerCase()

  // Filter and rank results
  const filteredResults = useMemo(() => {
    if (!normalizedQuery) return []

    const results = SEARCH_ENTRIES.filter((entry) => {
      if (entry.group === 'Dashboard' && !user) return false
      const haystack = [
        entry.title,
        entry.description,
        entry.category,
        entry.group,
        ...(entry.keywords || []),
        ...(entry.tags || [])
      ]
        .join(' ')
        .toLowerCase()

      return normalizedQuery
        .split(/\s+/)
        .every((term) => haystack.includes(term))
    })

    return results.sort((a, b) => {
      const groupDiff = GROUP_ORDER.indexOf(a.group) - GROUP_ORDER.indexOf(b.group)
      if (groupDiff !== 0) return groupDiff
      return a.title.localeCompare(b.title)
    })
  }, [normalizedQuery, user])

  // Group results by category
  const groupedResults = useMemo(() => {
    const groups = GROUP_ORDER.map((group) => ({ group, items: [] }))
    filteredResults.forEach((item) => {
      const bucket = groups.find((g) => g.group === item.group)
      if (bucket) bucket.items.push(item)
    })
    return groups.filter((group) => group.items.length > 0)
  }, [filteredResults])

  // Flat list for keyboard navigation
  const flattenedResults = useMemo(
    () => groupedResults.flatMap((group) => group.items),
    [groupedResults]
  )

  // Update recent searches in localStorage
  const updateRecentSearches = useCallback(
    (term) => {
      const trimmed = term.trim()
      if (!trimmed) return
      const next = [
        trimmed,
        ...recentSearches.filter((item) => item.toLowerCase() !== trimmed.toLowerCase())
      ].slice(0, 10)
      setRecentSearches(next)
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      }
    },
    [recentSearches]
  )

  const handleClose = useCallback(() => {
    setQuery('')
    setSelectedIndex(0)
    onClose()
    if (previousFocusRef.current?.focus) {
      previousFocusRef.current.focus()
    }
  }, [onClose])

  // Keyboard navigation and focus trapping
  useEffect(() => {
    const handleKeyDown = (event) => {
      const target = event.target
      const isFormElement =
        ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName) || target.isContentEditable

      // Open search with Cmd/Ctrl + K or Slash
      if (!open && !isFormElement) {
        if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
          event.preventDefault()
          onOpen()
          return
        }
        if (event.key === '/') {
          event.preventDefault()
          onOpen()
          return
        }
      }

      if (!open) return

      if (event.key === 'Escape') {
        event.preventDefault()
        handleClose()
        return
      }

      if (event.key === 'Tab' && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll(
          'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (!first || !last) return

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
          return
        }

        if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
          return
        }
      }

      // Navigation keys
      if (['ArrowDown', 'ArrowUp', 'Enter'].includes(event.key)) {
        event.preventDefault()
      }

      if (event.key === 'ArrowDown' && flattenedResults.length) {
        setSelectedIndex((index) => Math.min(index + 1, flattenedResults.length - 1))
      }

      if (event.key === 'ArrowUp' && flattenedResults.length) {
        setSelectedIndex((index) => Math.max(index - 1, 0))
      }

      if (event.key === 'Enter' && flattenedResults.length > 0) {
        const selected = flattenedResults[selectedIndex]
        if (selected) {
          router.push(selected.href)
          updateRecentSearches(normalizedQuery)
          handleClose()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open, onOpen, flattenedResults, normalizedQuery, selectedIndex, handleClose, updateRecentSearches, router])

  // Scroll selected item into view
  useEffect(() => {
    if (!suggestionsRef.current) return
    const selected = suggestionsRef.current.querySelector('.search-item.selected')
    if (selected) {
      selected.scrollIntoView({ block: 'nearest' })
    }
  }, [selectedIndex])

  const addRecentSearch = (term) => {
    setQuery(term)
    updateRecentSearches(term)
  }

  const clearHistory = () => {
    setRecentSearches([])
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(STORAGE_KEY)
    }
  }

  const googleSearchUrl = () => {
    const queryPhrase = encodeURIComponent(query || '')
    const hostname = typeof window !== 'undefined' ? window.location.hostname : ''
    if (hostname.includes('theodundesign.com')) {
      return `https://www.google.com/search?q=site:theodundesign.com+${queryPhrase}`
    }
    return `https://www.google.com/search?q=The+Odun+Design+${queryPhrase}`
  }

  return mounted && typeof document !== 'undefined'
    ? createPortal(
        <div
          className={`search-modal ${open ? 'show' : ''}`}
          role="dialog"
          aria-modal="true"
          aria-label="Search The Odun Design"
          style={{ display: open ? 'flex' : 'none' }}
        >
          <div className="search-modal-overlay" onClick={handleClose} />
          <div className="search-modal-content" ref={modalRef} onClick={(e) => e.stopPropagation()}>
            <div className="search-header">
              <div className="search-input-wrapper">
                <i>🔎</i>
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="search-input"
                  placeholder="Search services, portfolio, training, orders..."
                  aria-label="Search site"
                  autoComplete="off"
                />
                {query ? (
                  <button
                    className="search-clear"
                    type="button"
                    onClick={() => setQuery('')}
                    aria-label="Clear search"
                  >
                    ✕
                  </button>
                ) : null}
              </div>
              <button
                type="button"
                className="search-dismiss"
                onClick={handleClose}
                aria-label="Close search"
              >
                ✕
              </button>
            </div>

            <div className="search-hint" style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.9rem', marginBottom: '12px' }}>
              Tip: press <kbd style={{ padding: '4px 8px', borderRadius: '8px', background: 'rgba(255,255,255,0.08)', margin: '0 4px', border: '1px solid rgba(255,255,255,0.08)' }}>⌘K</kbd> / <kbd style={{ padding: '4px 8px', borderRadius: '8px', background: 'rgba(255,255,255,0.08)', margin: '0 4px', border: '1px solid rgba(255,255,255,0.08)' }}>Ctrl+K</kbd> or <kbd style={{ padding: '4px 8px', borderRadius: '8px', background: 'rgba(255,255,255,0.08)', margin: '0 4px', border: '1px solid rgba(255,255,255,0.08)' }}>/</kbd> to search.
            </div>

            <div className="search-suggestions" ref={suggestionsRef}>
              {loading ? (
                <div className="search-group">
                  <div className="search-group-title">Searching...</div>
                </div>
              ) : null}

              {!normalizedQuery ? (
                <>
                  {recentSearches.length > 0 && (
                    <div className="search-group">
                      <div className="search-group-title">Recent searches</div>
                      <div className="search-items">
                        {recentSearches.map((term) => (
                          <button
                            key={term}
                            type="button"
                            className="search-item"
                            onClick={() => addRecentSearch(term)}
                          >
                            <div className="search-item-icon">⏱️</div>
                            <div className="search-item-content">
                              <div className="search-item-title">{term}</div>
                              <div className="search-item-description">Search again</div>
                            </div>
                          </button>
                        ))}
                      </div>
                      <div
                        className="search-footer-hint"
                        style={{ justifyContent: 'space-between', padding: '12px 12px' }}
                      >
                        <span style={{ fontSize: '12px' }}>Saved locally in your browser.</span>
                        <button
                          type="button"
                          className="btn btn-secondary"
                          onClick={clearHistory}
                          style={{ padding: '6px 10px', fontSize: '12px' }}
                        >
                          Clear
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="search-group">
                    <div className="search-group-title">Popular searches</div>
                    <div
                      className="search-items"
                      style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        gap: '8px',
                        padding: '0 12px'
                      }}
                    >
                      {POPULAR_SEARCHES.map((term) => (
                        <button
                          key={term}
                          type="button"
                          className="search-item"
                          style={{
                            minWidth: 'auto',
                            padding: '8px 12px',
                            borderRadius: '12px',
                            gap: '0'
                          }}
                          onClick={() => addRecentSearch(term)}
                        >
                          <div className="search-item-content">
                            <div className="search-item-title">{term}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              ) : groupedResults.length > 0 ? (
                groupedResults.map((group) => (
                  <div className="search-group" key={group.group}>
                    <div className="search-group-title">{group.group}</div>
                    <div className="search-items">
                      {group.items.map((item) => {
                        const index = flattenedResults.findIndex((entry) => entry.id === item.id)
                        return (
                          <Link legacyBehavior key={item.id} href={item.href}>
                            <a
                              className={`search-item ${selectedIndex === index ? 'selected' : ''}`}
                              onClick={() => {
                                updateRecentSearches(normalizedQuery)
                                handleClose()
                              }}
                              onMouseEnter={() => setSelectedIndex(index)}
                            >
                              <div className="search-item-icon">{item.icon}</div>
                              <div className="search-item-content">
                                <div className="search-item-title">
                                  {highlightText(item.title, normalizedQuery)}
                                </div>
                                <div className="search-item-description">
                                  {highlightText(item.description, normalizedQuery)}
                                </div>
                              </div>
                              <div className="search-item-shortcut">{item.category}</div>
                            </a>
                          </Link>
                        )
                      })}
                    </div>
                  </div>
                ))
              ) : (
                <div className="search-group search-empty-state">
                  <div className="search-empty-title">No results found.</div>
                  <div className="search-empty-copy">Try a different query or search Google for matches.</div>
                  <div className="search-items">
                    <a
                      href={googleSearchUrl()}
                      className="search-item search-item-ghost"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => updateRecentSearches(normalizedQuery)}
                    >
                      <div className="search-item-icon">🌐</div>
                      <div className="search-item-content">
                        <div className="search-item-title">Search Google for &quot;{query}&quot;</div>
                        <div className="search-item-description">Open results in a new tab.</div>
                      </div>
                      <div className="search-item-shortcut">Google</div>
                    </a>
                  </div>
                </div>
              )}
            </div>

            <div className="search-footer">
              <div className="search-footer-hint">
                <span>Tip:</span>
                <span className="key">
                  {typeof navigator !== 'undefined' && /Mac|iPhone|iPad|iPod/.test(navigator.platform)
                    ? '⌘'
                    : 'Ctrl'}
                </span>
                <span>K to open search</span>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )
    : null
}
