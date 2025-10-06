import { useState, useEffect } from 'react'
import { SearchPUItem } from '@/types'
import { debounce } from '@/lib/utils'

// Mock data
const mockPUs: SearchPUItem[] = [
  { id: '1', name: 'Primary School, Ikeja', code: 'LAG/IKJ/01/001', ward: 'Ward 01', lga: 'Ikeja', state: 'Lagos', category: 'pu' },
  { id: '2', name: 'Community Hall, Surulere', code: 'LAG/SUR/02/015', ward: 'Ward 02', lga: 'Surulere', state: 'Lagos', category: 'pu' },
  { id: '3', name: 'Town Hall, Kano', code: 'KAN/NAS/01/008', ward: 'Ward 01', lga: 'Nassarawa', state: 'Kano', category: 'pu' },
  { id: '4', name: 'Central Mosque, Kaduna', code: 'KAD/KDN/03/022', ward: 'Ward 03', lga: 'Kaduna North', state: 'Kaduna', category: 'pu' },
  { id: '5', name: 'Public School, Ibadan', code: 'OYO/IBN/05/012', ward: 'Ward 05', lga: 'Ibadan North', state: 'Oyo', category: 'pu' },
  { id: '6', name: 'Market Square, Port Harcourt', code: 'RIV/PHC/02/007', ward: 'Ward 02', lga: 'Port Harcourt', state: 'Rivers', category: 'pu' },
]

export function useSearchPU() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchPUItem[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Debounced search function
  const debouncedSearch = debounce(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([])
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      setError(null)
      
      // TODO: Replace with actual Convex query
      await new Promise(resolve => setTimeout(resolve, 300))
      
      const filtered = mockPUs.filter(pu => 
        pu.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pu.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pu.ward.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pu.lga.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pu.state.toLowerCase().includes(searchQuery.toLowerCase())
      )
      
      setResults(filtered)
    } catch (err) {
      setError('Failed to search polling units')
      setResults([])
    } finally {
      setLoading(false)
    }
  }, 300)

  useEffect(() => {
    if (query) {
      setLoading(true)
      debouncedSearch(query)
    } else {
      setResults([])
      setLoading(false)
    }
  }, [query, debouncedSearch])

  const search = (searchQuery: string) => {
    setQuery(searchQuery)
  }

  const clear = () => {
    setQuery('')
    setResults([])
    setLoading(false)
    setError(null)
  }

  return {
    query,
    results,
    loading,
    error,
    search,
    clear,
  }
}