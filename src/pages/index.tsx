import { BarChart3, Users, CheckCircle, TrendingUp, Clock, MapPin } from 'lucide-react'
import { Container } from '@/components/layout/Container'
import { StatCard } from '@/components/ui/StatCard'
import { LoadingSkeleton, ChartSkeleton, TableSkeleton } from '@/components/ui/LoadingSkeleton'
import { useLiveSnapshot } from '@/hooks/useLiveSnapshot'
import { useTopStates } from '@/hooks/useTopStates'
import { useLatestVerified } from '@/hooks/useLatestVerified'
import { formatNumber, formatRelativeTime } from '@/lib/format'

export default function HomePage() {
  const { data: kpiData, loading: kpiLoading } = useLiveSnapshot()
  const { data: topStates, loading: statesLoading } = useTopStates(6)
  const { data: latestVerified, loading: latestLoading } = useLatestVerified(10)

  return (
    <Container className="py-8 space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">
          APC Live Results
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Real-time polling unit results from across Nigeria
        </p>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        <StatCard
          title="APC Total Votes"
          value={kpiData?.apcTotalVotes || 0}
          icon={BarChart3}
          loading={kpiLoading}
          delta={kpiData ? { value: 45230, isPositive: true, label: "since last hour" } : undefined}
        />
        <StatCard
          title="PUs Reporting"
          value={kpiData?.pusReporting || 0}
          icon={MapPin}
          loading={kpiLoading}
          delta={kpiData ? { value: 23, isPositive: true, label: "new this hour" } : undefined}
        />
        <StatCard
          title="Verified"
          value={kpiData ? Math.round(kpiData.verificationRate) : 0}
          icon={CheckCircle}
          loading={kpiLoading}
          className="text-apc-green"
        />
        <StatCard
          title="Turnout Rate"
          value={kpiData ? Math.round(kpiData.turnoutRate) : 0}
          icon={TrendingUp}
          loading={kpiLoading}
        />
        <StatCard
          title="New (1h)"
          value={kpiData?.newSubmissions1h || 0}
          icon={Clock}
          loading={kpiLoading}
        />
        <StatCard
          title="States Reporting"
          value={kpiData?.statesReporting || 0}
          icon={Users}
          loading={kpiLoading}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top States Chart */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Top States by APC Votes</h2>
          {statesLoading ? (
            <ChartSkeleton />
          ) : (
            <div className="rounded-2xl border bg-card p-6">
              <div className="space-y-4">
                {topStates.map((state, index) => (
                  <div key={state.stateId} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-apc-blue/10 flex items-center justify-center text-sm font-semibold text-apc-blue">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium">{state.state}</p>
                        <p className="text-sm text-muted-foreground">
                          {state.pusReporting}/{state.totalPUs} PUs
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{formatNumber(state.votes)}</p>
                      <p className="text-sm text-muted-foreground">
                        {Math.round((state.pusReporting / state.totalPUs) * 100)}% reporting
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Latest Verified Submissions */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Latest Verified Results</h2>
          {latestLoading ? (
            <div className="rounded-2xl border bg-card p-6">
              <TableSkeleton rows={6} cols={3} />
            </div>
          ) : (
            <div className="rounded-2xl border bg-card">
              <div className="p-6">
                <div className="space-y-4">
                  {latestVerified.slice(0, 8).map((entry) => (
                    <div key={entry.id} className="flex items-center justify-between py-2 border-b last:border-0">
                      <div className="space-y-1">
                        <p className="font-medium text-sm">
                          {entry.state} • {entry.lga} • {entry.ward}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {entry.pollingUnit} • {entry.agentName}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-apc-green">
                          {formatNumber(entry.apcVotes)}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatRelativeTime(entry.verifiedAt)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Container>
  )
}
