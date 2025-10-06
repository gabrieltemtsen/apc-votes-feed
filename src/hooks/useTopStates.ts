import { useState, useEffect } from 'react'
import { TopStateData } from '@/types'

// Mock data
const mockTopStates: TopStateData[] = [
  { state: 'Lagos', stateId: 'lagos', votes: 2500000, pusReporting: 1200, totalPUs: 1500 },
  { state: 'Kano', stateId: 'kano', votes: 1800000, pusReporting: 980, totalPUs: 1100 },
  { state: 'Kaduna', stateId: 'kaduna', votes: 1200000, pusReporting: 650, totalPUs: 800 },
  { state: 'Oyo', stateId: 'oyo', votes: 950000, pusReporting: 420, totalPUs: 600 },
  { state: 'Rivers', stateId: 'rivers', votes: 880000, pusReporting: 380, totalPUs: 450 },
  { state: 'Imo', stateId: 'imo', votes: 720000, pusReporting: 320, totalPUs: 400 },
]

export function useTopStates(limit = 10) {
  const [data, setData] = useState<TopStateData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        // TODO: Replace with actual Convex query
        await new Promise(resolve => setTimeout(resolve, 800))
        
        setData(mockTopStates.slice(0, limit))
      } catch (err) {
        setError('Failed to fetch top states data')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [limit])

  return { data, loading, error }
}