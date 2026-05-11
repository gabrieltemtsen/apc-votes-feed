import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  MapPin, Users, CheckCircle, TrendingUp, Clock, ArrowRight,
  Activity, Zap, Globe, Award
} from 'lucide-react'
import { Container } from '@/components/layout/Container'
import { formatNumber, formatRelativeTime } from '@/lib/format'
import { STATES, LIVE_FEED, getNationalTotals, getZones, LiveFeedEntry, ZoneData } from '@/lib/mockData'
import { PARTIES, PARTY_LIST, PartyId, getPartyColor, getLeadingParty } from '@/lib/partyConfig'
import { useParty } from '@/context/PartyContext'

// ─── Helpers ────────────────────────────────────────────────────────────────

function PartyTag({ party }: { party: PartyId }) {
  const cfg = PARTIES[party]
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold text-white"
      style={{ backgroundColor: cfg.color }}
    >
      {cfg.shortName}
    </span>
  )
}

function VoteBar({ votes, total }: { votes: number; total: number }) {
  const pct = total > 0 ? (votes / total) * 100 : 0
  return (
    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
      <div className="h-full rounded-full bg-current transition-all" style={{ width: `${pct}%` }} />
    </div>
  )
}

function NationalVoteShare({ totals }: { totals: ReturnType<typeof getNationalTotals> }) {
  const grandTotal = totals.votes.APC + totals.votes.PDP + totals.votes.LP + totals.votes.NNPP
  return (
    <div className="space-y-4">
      {PARTY_LIST.map(party => {
        const v = totals.votes[party.id as PartyId]
        const pct = grandTotal > 0 ? (v / grandTotal) * 100 : 0
        return (
          <div key={party.id} className="space-y-1.5">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span className="font-bold w-12" style={{ color: party.color }}>{party.shortName}</span>
                <span className="text-gray-500 text-xs hidden sm:block truncate max-w-[140px]">{party.candidate}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-semibold text-gray-900">{formatNumber(v)}</span>
                <span className="text-gray-500 w-12 text-right">{pct.toFixed(1)}%</span>
              </div>
            </div>
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{ width: `${pct}%`, backgroundColor: party.color }}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}

function ZoneCard({ zone }: { zone: ZoneData }) {
  const total = zone.votes.APC + zone.votes.PDP + zone.votes.LP + zone.votes.NNPP
  const leader = getLeadingParty(zone.votes)
  const leaderCfg = PARTIES[leader]
  const pctDone = zone.totalPUs > 0 ? Math.round((zone.reportingPUs / zone.totalPUs) * 100) : 0

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-gray-900 text-sm">{zone.name}</h3>
          <p className="text-xs text-gray-500 mt-0.5">{zone.states.length} states</p>
        </div>
        <PartyTag party={leader} />
      </div>

      <div className="space-y-2 mb-3">
        {PARTY_LIST.map(party => {
          const v = zone.votes[party.id as PartyId]
          const pct = total > 0 ? (v / total) * 100 : 0
          return (
            <div key={party.id} className="flex items-center gap-2">
              <span className="text-xs font-bold w-10" style={{ color: party.color }}>{party.shortName}</span>
              <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: party.color }} />
              </div>
              <span className="text-xs text-gray-500 w-8 text-right">{pct.toFixed(0)}%</span>
            </div>
          )
        })}
      </div>

      <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-100">
        <span>{formatNumber(zone.reportingPUs)}/{formatNumber(zone.totalPUs)} PUs</span>
        <span className="font-medium" style={{ color: leaderCfg.color }}>{pctDone}% done</span>
      </div>
    </div>
  )
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function HomePage() {
  const { selectedParty } = useParty()
  const partyCfg = PARTIES[selectedParty]
  const totals = getNationalTotals()
  const zones = getZones()
  const grandTotal = totals.votes.APC + totals.votes.PDP + totals.votes.LP + totals.votes.NNPP
  const leader = getLeadingParty(totals.votes)
  const leaderCfg = PARTIES[leader]
  const pctDone = Math.round((totals.reportingPUs / totals.totalPUs) * 100)
  const turnout = Math.round((totals.validVotes / totals.registeredVoters) * 100)

  const [feed, setFeed] = useState<LiveFeedEntry[]>(LIVE_FEED)
  const [lastUpdated, setLastUpdated] = useState(new Date())

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date())
    }, 30000)
    return () => clearInterval(interval)
  }, [])

  const topStates = [...STATES]
    .sort((a, b) => b.votes[selectedParty] - a.votes[selectedParty])
    .slice(0, 8)

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Banner */}
      <div className="bg-white border-b border-gray-200">
        <Container className="py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full text-white"
                  style={{ backgroundColor: '#dc2626' }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse inline-block" />
                  LIVE
                </span>
                <span className="text-xs text-gray-500">Updated {formatRelativeTime(lastUpdated)}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Nigeria Presidential Election</h1>
              <p className="text-gray-500 text-sm mt-1">February 25, 2023 · Real-time result aggregation system</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-xs text-gray-500">National Leader</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="font-bold text-lg" style={{ color: leaderCfg.color }}>{leaderCfg.shortName}</span>
                  <span className="text-sm text-gray-600">{formatNumber(totals.votes[leader])} votes</span>
                </div>
              </div>
              <div
                className="h-12 w-12 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow"
                style={{ backgroundColor: leaderCfg.color }}
              >
                {leaderCfg.shortName}
              </div>
            </div>
          </div>
        </Container>
      </div>

      <Container className="py-6 space-y-6">

        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              icon: Activity,
              label: 'Total Votes Counted',
              value: formatNumber(grandTotal),
              sub: `of ~${formatNumber(totals.registeredVoters)} registered`,
              color: '#6366f1',
            },
            {
              icon: MapPin,
              label: 'Polling Units Reporting',
              value: `${formatNumber(totals.reportingPUs)}`,
              sub: `${pctDone}% of ${formatNumber(totals.totalPUs)} total`,
              color: '#0ea5e9',
            },
            {
              icon: TrendingUp,
              label: 'Voter Turnout',
              value: `${turnout}%`,
              sub: `${formatNumber(totals.accreditedVoters)} accredited`,
              color: '#10b981',
            },
            {
              icon: Award,
              label: 'National Leader',
              value: leaderCfg.shortName,
              sub: leaderCfg.candidate,
              color: leaderCfg.color,
            },
          ].map((kpi, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-200 p-5 flex items-start gap-4">
              <div
                className="h-10 w-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: `${kpi.color}18` }}
              >
                <kpi.icon className="h-5 w-5" style={{ color: kpi.color }} />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-gray-500 leading-tight">{kpi.label}</p>
                <p className="text-xl font-bold text-gray-900 mt-0.5 leading-none" style={{ color: kpi.color }}>{kpi.value}</p>
                <p className="text-xs text-gray-400 mt-1 truncate">{kpi.sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Main grid: Vote Share + Live Feed */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* National Vote Share */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="font-bold text-gray-900">National Vote Share</h2>
                <p className="text-xs text-gray-500 mt-0.5">Presidential Election 2023</p>
              </div>
              <span className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full font-medium">
                {formatNumber(grandTotal)} total votes
              </span>
            </div>
            <NationalVoteShare totals={totals} />

            <div className="mt-6 pt-5 border-t border-gray-100">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {PARTY_LIST.map(party => {
                  const v = totals.votes[party.id as PartyId]
                  const pct = grandTotal > 0 ? (v / grandTotal) * 100 : 0
                  const statesWon = STATES.filter(s => getLeadingParty(s.votes) === party.id).length
                  return (
                    <div key={party.id} className="rounded-xl p-3 text-center" style={{ backgroundColor: party.lightColor }}>
                      <p className="text-xs font-bold" style={{ color: party.color }}>{party.shortName}</p>
                      <p className="text-base font-bold text-gray-900 mt-1">{pct.toFixed(1)}%</p>
                      <p className="text-xs text-gray-500">{statesWon} states</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Live Feed */}
          <div className="bg-white rounded-2xl border border-gray-200 flex flex-col overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-yellow-500" />
                <h2 className="font-bold text-gray-900 text-sm">Live Results Feed</h2>
              </div>
              <span className="text-xs text-gray-400">Polling Units</span>
            </div>
            <div className="flex-1 overflow-y-auto divide-y divide-gray-50">
              {feed.slice(0, 12).map(entry => {
                const winnerCfg = PARTIES[entry.winner]
                return (
                  <div key={entry.id} className="px-4 py-3 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-gray-900 truncate">{entry.puName}</p>
                        <p className="text-xs text-gray-500 mt-0.5 truncate">
                          {entry.stateName} · {entry.lgaName}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-1 shrink-0">
                        <PartyTag party={entry.winner} />
                        <span className="text-xs text-gray-400">{formatRelativeTime(entry.verifiedAt)}</span>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-2">
                      {PARTY_LIST.map(p => (
                        <span key={p.id} className="text-xs" style={{ color: p.color }}>
                          {p.shortName}: {entry.votes[p.id as PartyId]}
                        </span>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="p-3 border-t border-gray-100">
              <Link
                href="/results"
                className="flex items-center justify-center gap-1 text-xs font-medium py-2 rounded-lg hover:bg-gray-50 transition-colors text-gray-600"
              >
                View All Results <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>

        {/* Geopolitical Zones */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-bold text-gray-900">Results by Geopolitical Zone</h2>
              <p className="text-xs text-gray-500 mt-0.5">6 zones · 36 states + FCT</p>
            </div>
            <Globe className="h-5 w-5 text-gray-400" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {zones.map(zone => <ZoneCard key={zone.name} zone={zone} />)}
          </div>
        </div>

        {/* Party-Specific Top States */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="font-bold text-gray-900">
                Top States for{' '}
                <span style={{ color: partyCfg.color }}>{partyCfg.shortName}</span>
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                {partyCfg.candidate} · {partyCfg.name}
              </p>
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Users className="h-4 w-4" />
              Switch party in header to change view
            </div>
          </div>

          <div className="space-y-3">
            {topStates.map((state, i) => {
              const sv = state.votes[selectedParty]
              const total = state.votes.APC + state.votes.PDP + state.votes.LP + state.votes.NNPP
              const pct = total > 0 ? (sv / total) * 100 : 0
              const stateLeader = getLeadingParty(state.votes)
              const puPct = Math.round((state.reportingPUs / state.totalPUs) * 100)

              return (
                <div key={state.id} className="flex items-center gap-4">
                  <div className="w-6 text-xs font-bold text-gray-400 text-right">{i + 1}</div>
                  <div className="w-24 sm:w-32 shrink-0">
                    <div className="flex items-center gap-1.5">
                      <p className="text-sm font-semibold text-gray-900 truncate">{state.name}</p>
                      {stateLeader === selectedParty && (
                        <CheckCircle className="h-3.5 w-3.5 shrink-0" style={{ color: partyCfg.color }} />
                      )}
                    </div>
                    <p className="text-xs text-gray-400">{state.zone.replace('North ', 'N. ').replace('South ', 'S. ')}</p>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">{formatNumber(sv)}</span>
                      <span className="text-xs text-gray-400">{pct.toFixed(1)}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{ width: `${pct}%`, backgroundColor: partyCfg.color }}
                      />
                    </div>
                  </div>
                  <div className="hidden sm:block w-24 text-right">
                    <span className="text-xs text-gray-400">{puPct}% PUs</span>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end">
            <Link
              href="/results"
              className="flex items-center gap-1.5 text-sm font-medium transition-colors hover:opacity-80"
              style={{ color: partyCfg.color }}
            >
              View all 37 states <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Footer note */}
        <div className="text-center py-4">
          <p className="text-xs text-gray-400">
            🗳️ ElectFeed NG · Data is simulated for research and academic demonstration purposes.
            Based on the 2023 Nigerian Presidential Election context.
          </p>
        </div>
      </Container>
    </div>
  )
}
