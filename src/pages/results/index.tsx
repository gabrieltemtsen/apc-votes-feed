import { useState, useMemo } from 'react'
import { Search, ChevronDown, ChevronRight, MapPin, ArrowLeft, CheckCircle, Clock } from 'lucide-react'
import { Container } from '@/components/layout/Container'
import { formatNumber, formatRelativeTime } from '@/lib/format'
import {
  STATES, StateData, getLGAsForState, MockLGA, ZoneData, getZones,
  LIVE_FEED
} from '@/lib/mockData'
import { PARTIES, PARTY_LIST, PartyId, getLeadingParty } from '@/lib/partyConfig'
import { useParty } from '@/context/PartyContext'

type DrillLevel = 'national' | 'state' | 'lga'

function PartyTag({ party, small }: { party: PartyId; small?: boolean }) {
  const cfg = PARTIES[party]
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded font-bold text-white ${small ? 'text-xs' : 'text-xs'}`}
      style={{ backgroundColor: cfg.color }}
    >
      {cfg.shortName}
    </span>
  )
}

function MiniVoteBar({ votes, total, color }: { votes: number; total: number; color: string }) {
  const pct = total > 0 ? (votes / total) * 100 : 0
  return (
    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
      <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: color }} />
    </div>
  )
}

export default function ResultsPage() {
  const { selectedParty } = useParty()
  const partyCfg = PARTIES[selectedParty]

  const [search, setSearch] = useState('')
  const [selectedZone, setSelectedZone] = useState<string>('all')
  const [drillState, setDrillState] = useState<StateData | null>(null)
  const [drillLGA, setDrillLGA] = useState<MockLGA | null>(null)
  const [drillLevel, setDrillLevel] = useState<DrillLevel>('national')

  const zones = useMemo(() => getZones(), [])
  const lgasForState = useMemo(
    () => drillState ? getLGAsForState(drillState.id) : [],
    [drillState]
  )

  const filteredStates = useMemo(() => {
    let list = STATES
    if (selectedZone !== 'all') list = list.filter(s => s.zone === selectedZone)
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(s => s.name.toLowerCase().includes(q) || s.zone.toLowerCase().includes(q))
    }
    return [...list].sort((a, b) => b.votes[selectedParty] - a.votes[selectedParty])
  }, [search, selectedZone, selectedParty])

  function openState(state: StateData) {
    setDrillState(state)
    setDrillLevel('state')
    setDrillLGA(null)
  }

  function openLGA(lga: MockLGA) {
    setDrillLGA(lga)
    setDrillLevel('lga')
  }

  function back() {
    if (drillLevel === 'lga') { setDrillLevel('state'); setDrillLGA(null) }
    else { setDrillLevel('national'); setDrillState(null) }
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Container className="py-6 space-y-5">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            {drillLevel !== 'national' && (
              <button
                onClick={back}
                className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 mb-2 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                {drillLevel === 'lga' ? drillState?.name : 'All States'}
              </button>
            )}
            <h1 className="text-2xl font-bold text-gray-900">
              {drillLevel === 'national' && 'Election Results'}
              {drillLevel === 'state' && drillState?.name}
              {drillLevel === 'lga' && `${drillLGA?.name} LGA`}
            </h1>
            <p className="text-sm text-gray-500 mt-0.5">
              {drillLevel === 'national' && `${filteredStates.length} states · sorted by ${partyCfg.shortName} votes`}
              {drillLevel === 'state' && `${drillState?.zone} · ${drillState?.totalPUs.toLocaleString()} total PUs`}
              {drillLevel === 'lga' && `${drillLGA?.wards} wards · ${drillLGA?.pus} polling units`}
            </p>
          </div>

          {/* Breadcrumb pills */}
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <button
              onClick={() => { setDrillLevel('national'); setDrillState(null); setDrillLGA(null) }}
              className="hover:text-gray-900 transition-colors"
            >National</button>
            {drillState && (
              <>
                <ChevronRight className="h-3 w-3" />
                <button onClick={() => { setDrillLevel('state'); setDrillLGA(null) }} className="hover:text-gray-900">{drillState.name}</button>
              </>
            )}
            {drillLGA && (
              <>
                <ChevronRight className="h-3 w-3" />
                <span className="text-gray-900 font-medium">{drillLGA.name}</span>
              </>
            )}
          </div>
        </div>

        {/* National Level */}
        {drillLevel === 'national' && (
          <>
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:border-transparent"
                  style={{ '--tw-ring-color': partyCfg.color } as React.CSSProperties}
                  placeholder="Search states..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
              <select
                className="bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-700 focus:outline-none"
                value={selectedZone}
                onChange={e => setSelectedZone(e.target.value)}
              >
                <option value="all">All Zones</option>
                {zones.map(z => <option key={z.name} value={z.name}>{z.name}</option>)}
              </select>
            </div>

            {/* Summary bar */}
            <div className="bg-white rounded-2xl border border-gray-200 p-4">
              <div className="flex flex-wrap gap-6">
                {PARTY_LIST.map(p => {
                  const total = filteredStates.reduce((s, st) => s + st.votes[p.id as PartyId], 0)
                  const statesLed = filteredStates.filter(s => getLeadingParty(s.votes) === p.id).length
                  return (
                    <div key={p.id} className="flex items-center gap-2.5">
                      <div className="h-8 w-8 rounded-lg flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: p.color }}>{p.shortName}</div>
                      <div>
                        <p className="font-bold text-sm text-gray-900">{formatNumber(total)}</p>
                        <p className="text-xs text-gray-500">{statesLed} states leading</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* States Table */}
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100 bg-gray-50">
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">#</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">State</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden md:table-cell">Zone</th>
                      {PARTY_LIST.map(p => (
                        <th key={p.id} className="text-right px-4 py-3 text-xs font-semibold uppercase tracking-wide" style={{ color: p.color }}>{p.shortName}</th>
                      ))}
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden lg:table-cell">PUs</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Winner</th>
                      <th className="px-4 py-3"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {filteredStates.map((state, i) => {
                      const total = state.votes.APC + state.votes.PDP + state.votes.LP + state.votes.NNPP
                      const leader = getLeadingParty(state.votes)
                      const puPct = Math.round((state.reportingPUs / state.totalPUs) * 100)
                      return (
                        <tr
                          key={state.id}
                          className="hover:bg-gray-50 cursor-pointer transition-colors"
                          onClick={() => openState(state)}
                        >
                          <td className="px-4 py-3 text-xs text-gray-400 font-medium">{i + 1}</td>
                          <td className="px-4 py-3">
                            <div className="font-semibold text-gray-900 text-sm">{state.name}</div>
                            <div className="text-xs text-gray-400 mt-0.5 md:hidden">{state.zone}</div>
                          </td>
                          <td className="px-4 py-3 text-xs text-gray-500 hidden md:table-cell">{state.zone}</td>
                          {PARTY_LIST.map(p => (
                            <td key={p.id} className="px-4 py-3 text-right">
                              <span className={`text-sm font-semibold ${leader === p.id ? 'text-gray-900' : 'text-gray-400'}`}>
                                {formatNumber(state.votes[p.id as PartyId])}
                              </span>
                            </td>
                          ))}
                          <td className="px-4 py-3 hidden lg:table-cell">
                            <div className="flex items-center gap-2">
                              <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden w-16">
                                <div className="h-full rounded-full bg-green-400" style={{ width: `${puPct}%` }} />
                              </div>
                              <span className="text-xs text-gray-400">{puPct}%</span>
                            </div>
                          </td>
                          <td className="px-4 py-3"><PartyTag party={leader} /></td>
                          <td className="px-4 py-3">
                            <ChevronRight className="h-4 w-4 text-gray-300" />
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* State Level — LGA breakdown */}
        {drillLevel === 'state' && drillState && (
          <>
            {/* State summary */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {PARTY_LIST.map(p => {
                const v = drillState.votes[p.id as PartyId]
                const total = drillState.votes.APC + drillState.votes.PDP + drillState.votes.LP + drillState.votes.NNPP
                const pct = total > 0 ? (v / total) * 100 : 0
                const isLeader = getLeadingParty(drillState.votes) === p.id
                return (
                  <div
                    key={p.id}
                    className={`bg-white rounded-xl border-2 p-4 ${isLeader ? '' : 'border-transparent'}`}
                    style={isLeader ? { borderColor: p.color } : {}}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold" style={{ color: p.color }}>{p.shortName}</span>
                      {isLeader && <CheckCircle className="h-3.5 w-3.5" style={{ color: p.color }} />}
                    </div>
                    <p className="text-xl font-bold text-gray-900">{formatNumber(v)}</p>
                    <p className="text-sm text-gray-500">{pct.toFixed(1)}%</p>
                  </div>
                )
              })}
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
                <p className="text-2xl font-bold text-gray-900">{formatNumber(drillState.reportingPUs)}</p>
                <p className="text-xs text-gray-500 mt-1">PUs Reporting</p>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
                <p className="text-2xl font-bold text-gray-900">
                  {Math.round((drillState.reportingPUs / drillState.totalPUs) * 100)}%
                </p>
                <p className="text-xs text-gray-500 mt-1">Coverage</p>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
                <p className="text-2xl font-bold text-gray-900">
                  {Math.round((drillState.validVotes / drillState.registeredVoters) * 100)}%
                </p>
                <p className="text-xs text-gray-500 mt-1">Turnout</p>
              </div>
            </div>

            {/* LGA Table */}
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100">
                <h3 className="font-bold text-gray-900">LGA Breakdown</h3>
                <p className="text-xs text-gray-500 mt-0.5">Click any LGA to drill down to ward level</p>
              </div>
              <div className="divide-y divide-gray-50">
                {lgasForState.map((lga, i) => {
                  const total = lga.votes.APC + lga.votes.PDP + lga.votes.LP + lga.votes.NNPP
                  const leader = getLeadingParty(lga.votes)
                  const puPct = lga.pus > 0 ? Math.round((lga.reportingPUs / lga.pus) * 100) : 0
                  return (
                    <div
                      key={lga.id}
                      className="px-5 py-4 hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={() => openLGA(lga)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-400 font-medium w-5">{i + 1}</span>
                          <span className="font-semibold text-gray-900 text-sm">{lga.name} LGA</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <PartyTag party={leader} />
                          <ChevronRight className="h-4 w-4 text-gray-300" />
                        </div>
                      </div>
                      <div className="ml-7 space-y-1.5">
                        {PARTY_LIST.map(p => {
                          const v = lga.votes[p.id as PartyId]
                          const pct = total > 0 ? (v / total) * 100 : 0
                          return (
                            <div key={p.id} className="flex items-center gap-2">
                              <span className="text-xs font-bold w-10" style={{ color: p.color }}>{p.shortName}</span>
                              <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: p.color }} />
                              </div>
                              <span className="text-xs text-gray-500 w-16 text-right">{formatNumber(v)}</span>
                            </div>
                          )
                        })}
                        <p className="text-xs text-gray-400 pt-1">{puPct}% of {lga.pus} PUs reporting · {lga.wards} wards</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </>
        )}

        {/* LGA Level — Ward / PU view */}
        {drillLevel === 'lga' && drillLGA && drillState && (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {PARTY_LIST.map(p => {
                const v = drillLGA.votes[p.id as PartyId]
                const total = drillLGA.votes.APC + drillLGA.votes.PDP + drillLGA.votes.LP + drillLGA.votes.NNPP
                const pct = total > 0 ? (v / total) * 100 : 0
                const isLeader = getLeadingParty(drillLGA.votes) === p.id
                return (
                  <div key={p.id} className={`bg-white rounded-xl border-2 p-4 ${isLeader ? '' : 'border-transparent border border-gray-200'}`}
                    style={isLeader ? { borderColor: p.color } : {}}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold" style={{ color: p.color }}>{p.shortName}</span>
                      {isLeader && <CheckCircle className="h-3.5 w-3.5" style={{ color: p.color }} />}
                    </div>
                    <p className="text-xl font-bold text-gray-900">{formatNumber(v)}</p>
                    <p className="text-sm text-gray-500">{pct.toFixed(1)}%</p>
                  </div>
                )
              })}
            </div>

            {/* Recent PU Results from this state */}
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100">
                <h3 className="font-bold text-gray-900">Recent Polling Unit Results</h3>
                <p className="text-xs text-gray-500 mt-0.5">Verified submissions from {drillLGA.name} LGA area</p>
              </div>
              <div className="divide-y divide-gray-50">
                {LIVE_FEED
                  .filter(f => f.stateName === drillState.name)
                  .slice(0, 8)
                  .map(entry => (
                    <div key={entry.id} className="px-5 py-4">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div>
                          <p className="font-semibold text-sm text-gray-900">{entry.puName}</p>
                          <p className="text-xs text-gray-500 mt-0.5">{entry.lgaName} · {entry.wardName}</p>
                        </div>
                        <div className="flex flex-col items-end gap-1.5 shrink-0">
                          <PartyTag party={entry.winner} />
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                            entry.status === 'verified' ? 'bg-green-100 text-green-700' :
                            entry.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {entry.status === 'verified' ? '✓ Verified' : entry.status === 'pending' ? '⏳ Pending' : '✕ Rejected'}
                          </span>
                        </div>
                      </div>
                      <div className="grid grid-cols-4 gap-2">
                        {PARTY_LIST.map(p => (
                          <div key={p.id} className="text-center p-2 rounded-lg" style={{ backgroundColor: p.lightColor }}>
                            <p className="text-xs font-bold" style={{ color: p.color }}>{p.shortName}</p>
                            <p className="text-sm font-bold text-gray-900 mt-0.5">{entry.votes[p.id as PartyId]}</p>
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-gray-400">Agent: {entry.agentName}</span>
                        <span className="text-xs text-gray-400">Code: {entry.puCode}</span>
                        <span className="text-xs text-gray-400">{formatRelativeTime(entry.verifiedAt)}</span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </>
        )}
      </Container>
    </div>
  )
}