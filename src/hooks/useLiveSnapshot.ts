import { useState, useEffect } from 'react'
import { KPIStats } from '@/types'

// Mock data
const mockKPIStats: KPIStats = {
  apcTotalVotes: 15420000,
  pusReporting: 8947,
  verificationRate: 78.5,
  turnoutRate: 45.2,
  newSubmissions1h: 234,
  statesReporting: 34,
}

export function useLiveSnapshot() {
  const [data, setData] = useState<KPIStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      try {
        setLoading(true)
        // TODO: Replace with actual Convex query
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Add some variation to simulate live updates
        const variation = () => Math.floor(Math.random() * 100) - 50
        
        setData({
          ...mockKPIStats,
          apcTotalVotes: mockKPIStats.apcTotalVotes + variation() * 1000,
          pusReporting: mockKPIStats.pusReporting + variation(),
          newSubmissions1h: Math.max(0, mockKPIStats.newSubmissions1h + variation()),
        })
      } catch (err) {
        setError('Failed to fetch live data')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
    
    // Set up polling for live updates
    const interval = setInterval(fetchData, 30000) // Update every 30 seconds
    
    return () => clearInterval(interval)
  }, [])

  return { data, loading, error, refresh: () => window.location.reload() }
}