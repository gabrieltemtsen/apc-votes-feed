import { useState } from 'react'
import { Search, Filter, Download } from 'lucide-react'
import { Container } from '@/components/layout/Container'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { StatusPill } from '@/components/ui/StatusPill'
import { EmptyState } from '@/components/ui/EmptyState'
import { LoadingSkeleton, TableSkeleton } from '@/components/ui/LoadingSkeleton'
import { useSearchPU } from '@/hooks/useSearchPU'
import { useLatestVerified } from '@/hooks/useLatestVerified'
import { formatNumber, formatRelativeTime } from '@/lib/format'

export default function ResultsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const { results: searchResults, loading: searchLoading, search } = useSearchPU()
  const { data: latestVerified, loading: latestLoading } = useLatestVerified(50)

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Results', active: true },
  ]

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchQuery(value)
    search(value)
  }

  return (
    <Container className="py-8 space-y-8">
      <Breadcrumbs items={breadcrumbItems} />
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Election Results</h1>
          <p className="text-muted-foreground">
            Search and browse verified polling unit results
          </p>
        </div>
        <Button variant="outline" className="gap-2 self-start">
          <Download className="h-4 w-4" />
          Export CSV
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by state, LGA, ward, polling unit, or code..."
              value={searchQuery}
              onChange={handleSearch}
              className="pl-10"
            />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>

        {/* Search Results */}
        {searchQuery && (
          <div className="rounded-lg border bg-card">
            <div className="p-4 border-b">
              <h3 className="font-medium">
                Search Results {searchLoading ? '' : `(${searchResults.length})`}
              </h3>
            </div>
            <div className="p-4">
              {searchLoading ? (
                <LoadingSkeleton className="h-20" />
              ) : searchResults.length > 0 ? (
                <div className="space-y-3">
                  {searchResults.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-accent transition-colors cursor-pointer"
                    >
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {item.state} • {item.lga} • {item.ward}
                        </p>
                        <p className="text-xs text-muted-foreground font-mono">
                          {item.code}
                        </p>
                      </div>
                      <Button variant="ghost" size="sm">
                        View Details
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <EmptyState
                  title="No results found"
                  description="Try adjusting your search terms"
                />
              )}
            </div>
          </div>
        )}
      </div>

      {/* Results Table */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Latest Verified Results</h2>
        
        {latestLoading ? (
          <div className="rounded-lg border bg-card p-6">
            <TableSkeleton rows={10} cols={6} />
          </div>
        ) : (
          <div className="rounded-lg border bg-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left p-4 font-medium">Location</th>
                    <th className="text-left p-4 font-medium">Polling Unit</th>
                    <th className="text-left p-4 font-medium">APC Votes</th>
                    <th className="text-left p-4 font-medium">Status</th>
                    <th className="text-left p-4 font-medium">Agent</th>
                    <th className="text-left p-4 font-medium">Verified</th>
                  </tr>
                </thead>
                <tbody>
                  {latestVerified.map((entry, index) => (
                    <tr key={entry.id} className={index % 2 === 0 ? 'bg-muted/25' : ''}>
                      <td className="p-4">
                        <div className="space-y-1">
                          <p className="font-medium text-sm">{entry.state}</p>
                          <p className="text-xs text-muted-foreground">
                            {entry.lga} • {entry.ward}
                          </p>
                        </div>
                      </td>
                      <td className="p-4">
                        <p className="font-medium text-sm">{entry.pollingUnit}</p>
                      </td>
                      <td className="p-4">
                        <p className="font-semibold text-apc-green">
                          {formatNumber(entry.apcVotes)}
                        </p>
                      </td>
                      <td className="p-4">
                        <StatusPill status="verified" />
                      </td>
                      <td className="p-4">
                        <p className="text-sm">{entry.agentName}</p>
                      </td>
                      <td className="p-4">
                        <p className="text-xs text-muted-foreground">
                          {formatRelativeTime(entry.verifiedAt)}
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </Container>
  )
}