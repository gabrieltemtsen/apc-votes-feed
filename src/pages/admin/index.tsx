import { useState } from 'react'
import { Container } from '@/components/layout/Container'
import {
  Users, MapPin, Activity, Shield, AlertCircle, CheckCircle,
  XCircle, Clock, Search, Ban, UserCheck
} from 'lucide-react'
import { useParty } from '@/context/PartyContext'
import { PARTIES, PARTY_LIST, PartyId } from '@/lib/partyConfig'
import { MOCK_AGENTS, MockAgent, STATES, getNationalTotals } from '@/lib/mockData'
import { formatNumber, formatRelativeTime } from '@/lib/format'

const AUDIT_LOG = [
  { id: 1, actor: 'Chidi Admin', action: 'Approved agent', target: 'Chisom Adaeze', time: new Date(Date.now() - 5 * 60000), type: 'approval' },
  { id: 2, actor: 'Chidi Admin', action: 'Verified submission', target: 'LA/IK/01/001', time: new Date(Date.now() - 18 * 60000), type: 'verify' },
  { id: 3, actor: 'Emeka Admin', action: 'Rejected submission', target: 'KN/KM/01/004', time: new Date(Date.now() - 34 * 60000), type: 'reject' },
  { id: 4, actor: 'Chidi Admin', action: 'Suspended agent', target: 'Yakubu Peters', time: new Date(Date.now() - 120 * 60000), type: 'suspend' },
  { id: 5, actor: 'Emeka Admin', action: 'Approved agent', target: 'Emeka Okonkwo', time: new Date(Date.now() - 180 * 60000), type: 'approval' },
  { id: 6, actor: 'System', action: 'Geography data upload', target: 'Lagos State PUs', time: new Date(Date.now() - 360 * 60000), type: 'system' },
]

const GEO_STATS = [
  { label: 'States', value: 37, icon: '🗺️' },
  { label: 'LGAs', value: 774, icon: '📍' },
  { label: 'Wards', value: 8809, icon: '🏘️' },
  { label: 'Polling Units', value: 176846, icon: '🗳️' },
]

export default function AdminPage() {
  const { currentRole, selectedParty, setCurrentRole } = useParty()
  const partyCfg = PARTIES[selectedParty]
  const [agentSearch, setAgentSearch] = useState('')
  const [activeTab, setActiveTab] = useState<'agents' | 'geo' | 'audit' | 'settings'>('agents')
  const [agentStatuses, setAgentStatuses] = useState<Record<string, MockAgent['status']>>({})

  const totals = getNationalTotals()

  if (currentRole !== 'admin') {
    return (
      <div className="bg-gray-50 min-h-screen">
        <Container className="py-16">
          <div className="max-w-md mx-auto text-center space-y-6">
            <div className="h-16 w-16 rounded-full bg-red-100 flex items-center justify-center mx-auto">
              <AlertCircle className="h-8 w-8 text-red-500" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Portal</h1>
              <p className="text-gray-500 mt-2">You need admin access to view this page.</p>
            </div>
            <button
              onClick={() => setCurrentRole('admin')}
              className="px-6 py-3 rounded-xl text-white font-semibold transition-opacity hover:opacity-90"
              style={{ backgroundColor: partyCfg.color }}
            >
              Switch to Admin Role (Demo)
            </button>
            <p className="text-xs text-gray-400">This is a demo — use the role picker in the header to switch roles.</p>
          </div>
        </Container>
      </div>
    )
  }

  const displayedAgents = MOCK_AGENTS.filter(a =>
    a.name.toLowerCase().includes(agentSearch.toLowerCase()) ||
    a.state.toLowerCase().includes(agentSearch.toLowerCase())
  )

  const pendingApprovals = MOCK_AGENTS.filter(a =>
    (agentStatuses[a.id] ?? a.status) === 'pending_approval'
  )

  const tabs = [
    { id: 'agents', label: 'Agents', icon: Users },
    { id: 'geo', label: 'Geography', icon: MapPin },
    { id: 'audit', label: 'Audit Log', icon: Activity },
    { id: 'settings', label: 'Settings', icon: Shield },
  ] as const

  return (
    <div className="bg-gray-50 min-h-screen">
      <Container className="py-6 space-y-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Portal</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              <span className="font-medium" style={{ color: partyCfg.color }}>{partyCfg.name}</span> · Party Control Centre
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: partyCfg.color }}>
              A
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">Admin User</p>
              <p className="text-xs text-gray-400">admin@{selectedParty.toLowerCase()}.ng</p>
            </div>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Total Agents', value: MOCK_AGENTS.length, icon: Users, color: partyCfg.color },
            { label: 'Active Agents', value: MOCK_AGENTS.filter(a => a.status === 'active').length, icon: CheckCircle, color: '#10b981' },
            { label: 'Pending Approval', value: pendingApprovals.length, icon: Clock, color: '#f59e0b' },
            { label: 'Suspended', value: MOCK_AGENTS.filter(a => a.status === 'suspended').length, icon: Ban, color: '#ef4444' },
          ].map((kpi, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-200 p-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${kpi.color}18` }}>
                <kpi.icon className="h-5 w-5" style={{ color: kpi.color }} />
              </div>
              <div>
                <p className="text-xl font-bold text-gray-900">{kpi.value}</p>
                <p className="text-xs text-gray-500">{kpi.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-gray-100 rounded-xl p-1">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all flex-1 justify-center ${
                activeTab === tab.id ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              <span className="hidden sm:block">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Agents Tab */}
        {activeTab === 'agents' && (
          <div className="space-y-4">
            {pendingApprovals.length > 0 && (
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="h-4 w-4 text-amber-600" />
                  <h3 className="font-semibold text-amber-800 text-sm">{pendingApprovals.length} Pending Approvals</h3>
                </div>
                <div className="space-y-2">
                  {pendingApprovals.map(agent => (
                    <div key={agent.id} className="flex items-center justify-between bg-white rounded-xl px-4 py-3 border border-amber-100">
                      <div>
                        <p className="font-semibold text-sm text-gray-900">{agent.name}</p>
                        <p className="text-xs text-gray-500">{agent.state} · {agent.lga} · {agent.phone}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setAgentStatuses(prev => ({ ...prev, [agent.id]: 'active' }))}
                          className="flex items-center gap-1 bg-green-500 text-white text-xs px-3 py-1.5 rounded-lg font-medium hover:bg-green-600 transition-colors"
                        >
                          <CheckCircle className="h-3 w-3" /> Approve
                        </button>
                        <button
                          onClick={() => setAgentStatuses(prev => ({ ...prev, [agent.id]: 'suspended' }))}
                          className="flex items-center gap-1 bg-red-50 text-red-600 text-xs px-3 py-1.5 rounded-lg font-medium hover:bg-red-100 transition-colors"
                        >
                          <XCircle className="h-3 w-3" /> Reject
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none"
                    placeholder="Search agents..."
                    value={agentSearch}
                    onChange={e => setAgentSearch(e.target.value)}
                  />
                </div>
              </div>
              <div className="divide-y divide-gray-50">
                {displayedAgents.map(agent => {
                  const status = agentStatuses[agent.id] ?? agent.status
                  return (
                    <div key={agent.id} className="px-5 py-4 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                          <span className="text-sm font-bold text-gray-600">{agent.name.split(' ').map(n => n[0]).join('')}</span>
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-sm text-gray-900 truncate">{agent.name}</p>
                          <p className="text-xs text-gray-500">{agent.state} · {agent.lga} · {agent.assignedPUs.length} PUs</p>
                        </div>
                      </div>
                      <div className="hidden sm:flex items-center gap-4 shrink-0 text-xs text-gray-500">
                        <div className="text-center">
                          <p className="font-bold text-gray-900 text-sm">{agent.submittedCount}</p>
                          <p>Submitted</p>
                        </div>
                        <div className="text-center">
                          <p className="font-bold text-amber-600 text-sm">{agent.pendingCount}</p>
                          <p>Pending</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                          status === 'active' ? 'bg-green-100 text-green-700' :
                          status === 'suspended' ? 'bg-red-100 text-red-700' :
                          'bg-amber-100 text-amber-700'
                        }`}>
                          {status === 'active' ? '● Active' : status === 'suspended' ? '● Suspended' : '● Pending'}
                        </span>
                        {status === 'active' && (
                          <button
                            onClick={() => setAgentStatuses(prev => ({ ...prev, [agent.id]: 'suspended' }))}
                            className="text-xs text-red-500 hover:text-red-700 transition-colors"
                            title="Suspend"
                          >
                            <Ban className="h-4 w-4" />
                          </button>
                        )}
                        {status === 'suspended' && (
                          <button
                            onClick={() => setAgentStatuses(prev => ({ ...prev, [agent.id]: 'active' }))}
                            className="text-xs text-green-500 hover:text-green-700 transition-colors"
                            title="Reactivate"
                          >
                            <UserCheck className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}

        {/* Geography Tab */}
        {activeTab === 'geo' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {GEO_STATS.map(g => (
                <div key={g.label} className="bg-white rounded-2xl border border-gray-200 p-5 text-center">
                  <p className="text-2xl">{g.icon}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{formatNumber(g.value)}</p>
                  <p className="text-xs text-gray-500 mt-1">{g.label}</p>
                </div>
              ))}
            </div>
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="font-bold text-gray-900 mb-4">States Coverage</h3>
              <div className="space-y-3">
                {STATES.slice(0, 10).map(state => {
                  const pct = Math.round((state.reportingPUs / state.totalPUs) * 100)
                  return (
                    <div key={state.id} className="flex items-center gap-3">
                      <span className="text-sm font-medium text-gray-700 w-28 shrink-0">{state.name}</span>
                      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: partyCfg.color }} />
                      </div>
                      <span className="text-xs text-gray-500 w-16 text-right">{formatNumber(state.reportingPUs)}/{formatNumber(state.totalPUs)}</span>
                      <span className="text-xs font-medium text-gray-700 w-10 text-right">{pct}%</span>
                    </div>
                  )
                })}
                <p className="text-xs text-gray-400 text-center pt-2">Showing 10 of 37 states</p>
              </div>
            </div>
          </div>
        )}

        {/* Audit Tab */}
        {activeTab === 'audit' && (
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100">
              <h3 className="font-bold text-gray-900">System Audit Log</h3>
              <p className="text-xs text-gray-500 mt-0.5">Recent admin actions and system events</p>
            </div>
            <div className="divide-y divide-gray-50">
              {AUDIT_LOG.map(log => (
                <div key={log.id} className="px-5 py-4 flex items-start gap-3">
                  <div className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 ${
                    log.type === 'approval' ? 'bg-green-100' :
                    log.type === 'verify' ? 'bg-blue-100' :
                    log.type === 'reject' ? 'bg-red-100' :
                    log.type === 'suspend' ? 'bg-orange-100' : 'bg-gray-100'
                  }`}>
                    {log.type === 'approval' && <CheckCircle className="h-4 w-4 text-green-600" />}
                    {log.type === 'verify' && <CheckCircle className="h-4 w-4 text-blue-600" />}
                    {log.type === 'reject' && <XCircle className="h-4 w-4 text-red-600" />}
                    {log.type === 'suspend' && <Ban className="h-4 w-4 text-orange-600" />}
                    {log.type === 'system' && <Activity className="h-4 w-4 text-gray-600" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">
                      <span className="font-semibold">{log.actor}</span>{' '}
                      <span className="text-gray-600">{log.action}</span>{' '}
                      <span className="font-medium">{log.target}</span>
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">{formatRelativeTime(log.time)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-5">
              <h3 className="font-bold text-gray-900">System Configuration</h3>
              {[
                { label: 'Election Name', value: 'Nigeria Presidential Election 2023' },
                { label: 'Election Date', value: 'February 25, 2023' },
                { label: 'Party', value: PARTIES[selectedParty].name },
                { label: 'Candidate', value: PARTIES[selectedParty].candidate },
                { label: 'Running Mate', value: PARTIES[selectedParty].runningMate },
                { label: 'Result Upload Deadline', value: 'March 1, 2023 · 23:59 WAT' },
              ].map(item => (
                <div key={item.label} className="flex items-start justify-between py-2 border-b border-gray-100 last:border-0">
                  <p className="text-sm text-gray-500">{item.label}</p>
                  <p className="text-sm font-medium text-gray-900 text-right max-w-xs">{item.value}</p>
                </div>
              ))}
            </div>
            <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-3">
              <h3 className="font-bold text-gray-900">Platform Features</h3>
              {[
                { label: 'Real-time WebSocket sync', enabled: true },
                { label: 'BVAS photo verification', enabled: true },
                { label: 'IReV integration', enabled: true },
                { label: 'Geolocation tagging', enabled: false },
                { label: 'AI result flagging', enabled: false },
              ].map(feat => (
                <div key={feat.label} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                  <p className="text-sm text-gray-700">{feat.label}</p>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${feat.enabled ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                    {feat.enabled ? 'Enabled' : 'Disabled'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </Container>
    </div>
  )
}