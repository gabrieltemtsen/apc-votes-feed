import { useState, useEffect } from 'react'
import { LatestVerifiedEntry } from '@/types'

// Mock data
const mockLatestVerified: LatestVerifiedEntry[] = [
  {
    id: '1',
    state: 'Lagos',
    lga: 'Ikeja',
    ward: 'Ward 01',
    pollingUnit: 'PU 001',
    apcVotes: 450,
    verifiedAt: new Date(Date.now() - 5 * 60 * 1000),
    agentName: 'John Doe',
  },
  {
    id: '2',
    state: 'Kano',
    lga: 'Nassarawa',
    ward: 'Ward 03',
    pollingUnit: 'PU 012',
    apcVotes: 320,
    verifiedAt: new Date(Date.now() - 8 * 60 * 1000),
    agentName: 'Ahmed Ibrahim',
  },
  {
    id: '3',
    state: 'Oyo',
    lga: 'Ibadan North',
    ward: 'Ward 05',
    pollingUnit: 'PU 024',
    apcVotes: 280,
    verifiedAt: new Date(Date.now() - 12 * 60 * 1000),
    agentName: 'Mary Johnson',
  },
  {
    id: '4',
    state: 'Rivers',
    lga: 'Port Harcourt',
    ward: 'Ward 02',
    pollingUnit: 'PU 008',
    apcVotes: 195,
    verifiedAt: new Date(Date.now() - 15 * 60 * 1000),
    agentName: 'Peter Okolie',
  },
  {
    id: '5',
    state: 'Kaduna',
    lga: 'Kaduna North',
    ward: 'Ward 07',
    pollingUnit: 'PU 031',
    apcVotes: 420,
    verifiedAt: new Date(Date.now() - 18 * 60 * 1000),
    agentName: 'Grace Adamu',
  },
]

export function useLatestVerified(limit = 20) {
  const [data, setData] = useState<LatestVerifiedEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        // TODO: Replace with actual Convex query
        await new Promise(resolve => setTimeout(resolve, 600))
        
        // Generate more entries by cycling through the mock data
        const expandedData = Array.from({ length: limit }, (_, i) => ({
          ...mockLatestVerified[i % mockLatestVerified.length],
          id: `${i + 1}`,
          verifiedAt: new Date(Date.now() - (i + 1) * 5 * 60 * 1000),
        }))
        
        setData(expandedData)
      } catch (err) {
        setError('Failed to fetch latest verified entries')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
    
    // Set up polling for live updates
    const interval = setInterval(fetchData, 60000) // Update every minute
    
    return () => clearInterval(interval)
  }, [limit])

  return { data, loading, error }
}