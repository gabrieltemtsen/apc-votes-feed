import { useState } from 'react'
import { Container } from '@/components/layout/Container'
import {
  AlertCircle, Upload, CheckCircle, Clock, MapPin, Camera,
  ChevronDown, Send, Info
} from 'lucide-react'
import { useParty } from '@/context/PartyContext'
import { PARTIES } from '@/lib/partyConfig'
import { STATES, LIVE_FEED } from '@/lib/mockData'
import { formatNumber, formatRelativeTime } from '@/lib/format'

// Mock agent data
const AGENT = {
  name: 'Chisom Adaeze',
  party: 'APC' as const,
  state: 'Lagos',
  lga: 'Ikeja',
  assignedPUs: [
    { code: 'LA/IK/01/001', name: 'Ikeja Town Hall PU 001', ward: 'Ikeja Central', submitted: true, verified: true },
    { code: 'LA/IK/01/002', name: 'Ikeja Primary School PU 002', ward: 'Ikeja Central', submitted: true, verified: false },
    { code: 'LA/IK/01/003', name: 'Ikeja Community Hall PU 003', ward: 'Ikeja Central', submitted: false, verified: false },
  ]
}

export default function AgentPage() {
  const { currentRole, selectedParty, setCurrentRole } = useParty()
  const partyCfg = PARTIES[selectedParty]

  const [showForm, setShowForm] = useState(false)
  const [selectedPU, setSelectedPU] = useState('')
  const [votes, setVotes] = useState({ APC: '', PDP: '', LP: '', NNPP: '', valid: '', rejected: '' })
  const [submitted, setSubmitted] = useState(false)

  const myFeed = LIVE_FEED.filter(f => f.stateName === 'Lagos').slice(0, 5)

  if (currentRole !== 'agent' && currentRole !== 'admin') {
    return (
      <div className="bg-gray-50 min-h-screen">
        <Container className="py-16">
          <div className="max-w-md mx-auto text-center space-y-6">
            <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto">
              <AlertCircle className="h-8 w-8 text-blue-500" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Agent Portal</h1>
              <p className="text-gray-500 mt-2">Switch to <strong>Field Agent</strong> role to access this portal.</p>
            </div>
            <button
              onClick={() => setCurrentRole('agent')}
              className="px-6 py-3 rounded-xl text-white font-semibold transition-opacity hover:opacity-90"
              style={{ backgroundColor: partyCfg.color }}
            >
              Switch to Agent Role (Demo)
            </button>
            <p className="text-xs text-gray-400">Use the role picker in the header to switch roles.</p>
          </div>
        </Container>
      </div>
    )
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setShowForm(false)
      setVotes({ APC: '', PDP: '', LP: '', NNPP: '', valid: '', rejected: '' })
      setSelectedPU('')
    }, 2500)
  }

  const submittedCount = AGENT.assignedPUs.filter(p => p.submitted).length
  const verifiedCount = AGENT.assignedPUs.filter(p => p.verified).length
  const pendingCount = submittedCount - verifiedCount
  const unsubmittedCount = AGENT.assignedPUs.length - submittedCount

  return (
    <div className="bg-gray-50 min-h-screen">
      <Container className="py-6 space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Agent Portal</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              {AGENT.name} · <span className="font-medium" style={{ color: partyCfg.color }}>{partyCfg.shortName}</span> · {AGENT.state} / {AGENT.lga}
            </p>
          </div>
          <div className="h-10 w-10 rounded-xl flex items-center justify-center text-white text-sm font-bold" style={{ backgroundColor: partyCfg.color }}>
            {AGENT.name.split(' ').map(n => n[0]).join('')}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-3">
          {[
            { label: 'Assigned PUs', value: AGENT.assignedPUs.length, color: '#6366f1' },
            { label: 'Submitted', value: submittedCount, color: '#0ea5e9' },
            { label: 'Verified', value: verifiedCount, color: '#10b981' },
            { label: 'Remaining', value: unsubmittedCount, color: '#f59e0b' },
          ].map((s, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-200 p-4 text-center">
              <p className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</p>
              <p className="text-xs text-gray-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Assigned PUs */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h2 className="font-bold text-gray-900">My Polling Units</h2>
              <p className="text-xs text-gray-500 mt-0.5">{AGENT.assignedPUs.length} assigned · {submittedCount} submitted</p>
            </div>
            {unsubmittedCount > 0 && (
              <button
                onClick={() => setShowForm(true)}
                className="flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-xl text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: partyCfg.color }}
              >
                <Upload className="h-4 w-4" />
                Submit Results
              </button>
            )}
          </div>
          <div className="divide-y divide-gray-50">
            {AGENT.assignedPUs.map(pu => (
              <div key={pu.code} className="px-5 py-4 flex items-center justify-between gap-3">
                <div className="flex items-start gap-3 min-w-0">
                  <div className={`h-9 w-9 rounded-xl flex items-center justify-center shrink-0 ${
                    pu.verified ? 'bg-green-100' : pu.submitted ? 'bg-blue-100' : 'bg-gray-100'
                  }`}>
                    {pu.verified
                      ? <CheckCircle className="h-5 w-5 text-green-600" />
                      : pu.submitted
                      ? <Clock className="h-5 w-5 text-blue-500" />
                      : <MapPin className="h-5 w-5 text-gray-400" />
                    }
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-sm text-gray-900 truncate">{pu.name}</p>
                    <p className="text-xs text-gray-500">{pu.ward} · <span className="font-mono">{pu.code}</span></p>
                  </div>
                </div>
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium shrink-0 ${
                  pu.verified ? 'bg-green-100 text-green-700' :
                  pu.submitted ? 'bg-blue-100 text-blue-700' :
                  'bg-gray-100 text-gray-600'
                }`}>
                  {pu.verified ? '✓ Verified' : pu.submitted ? '⏳ Pending' : 'Not submitted'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Submission Form */}
        {showForm && (
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between" style={{ backgroundColor: `${partyCfg.color}10` }}>
              <div className="flex items-center gap-2">
                <Send className="h-4 w-4" style={{ color: partyCfg.color }} />
                <h2 className="font-bold text-gray-900">Submit PU Result</h2>
              </div>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600 text-sm">Cancel</button>
            </div>
            {submitted ? (
              <div className="p-10 text-center space-y-3">
                <div className="h-14 w-14 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                  <CheckCircle className="h-7 w-7 text-green-600" />
                </div>
                <p className="font-bold text-gray-900">Submission Received!</p>
                <p className="text-sm text-gray-500">Your result is queued for verification.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-5 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Select Polling Unit</label>
                  <div className="relative">
                    <select
                      className="w-full appearance-none bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none"
                      value={selectedPU}
                      onChange={e => setSelectedPU(e.target.value)}
                      required
                    >
                      <option value="">Choose a polling unit...</option>
                      {AGENT.assignedPUs.filter(p => !p.submitted).map(p => (
                        <option key={p.code} value={p.code}>{p.name} ({p.code})</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Votes per Party</label>
                  <div className="grid grid-cols-2 gap-3">
                    {(['APC', 'PDP', 'LP', 'NNPP'] as const).map(party => {
                      const cfg = PARTIES[party]
                      return (
                        <div key={party}>
                          <label className="block text-xs font-medium mb-1" style={{ color: cfg.color }}>{party} — {cfg.candidate.split(' ')[0]}</label>
                          <input
                            type="number"
                            min="0"
                            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none"
                            placeholder="0"
                            value={votes[party]}
                            onChange={e => setVotes(prev => ({ ...prev, [party]: e.target.value }))}
                            required
                          />
                        </div>
                      )
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">Total Valid Votes</label>
                    <input
                      type="number" min="0" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none"
                      placeholder="0" value={votes.valid} onChange={e => setVotes(prev => ({ ...prev, valid: e.target.value }))} required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">Rejected Ballots</label>
                    <input
                      type="number" min="0" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none"
                      placeholder="0" value={votes.rejected} onChange={e => setVotes(prev => ({ ...prev, rejected: e.target.value }))} required
                    />
                  </div>
                </div>

                <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl p-5 text-center">
                  <Camera className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 font-medium">Attach BVAS / EC8A Photo Evidence</p>
                  <p className="text-xs text-gray-400 mt-1">JPEG, PNG up to 10MB each</p>
                  <button type="button" className="mt-3 text-xs font-medium px-4 py-2 rounded-lg bg-white border border-gray-200 text-gray-700 hover:bg-gray-50">
                    Choose Photos
                  </button>
                </div>

                <div className="flex items-start gap-2 bg-blue-50 rounded-xl p-3">
                  <Info className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
                  <p className="text-xs text-blue-700">
                    By submitting, you confirm this data accurately reflects the EC8A result sheet for this polling unit as observed during the 2023 election.
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl text-white font-semibold transition-opacity hover:opacity-90"
                  style={{ backgroundColor: partyCfg.color }}
                >
                  Submit Result
                </button>
              </form>
            )}
          </div>
        )}

        {/* Recent activity */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100">
            <h2 className="font-bold text-gray-900">Nearby Results Feed</h2>
            <p className="text-xs text-gray-500 mt-0.5">Recent verified PU results from your state</p>
          </div>
          <div className="divide-y divide-gray-50">
            {myFeed.map(entry => (
              <div key={entry.id} className="px-5 py-3 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{entry.puName}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{entry.lgaName} · {entry.wardName}</p>
                </div>
                <div className="flex flex-col items-end gap-1 shrink-0">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold text-white" style={{ backgroundColor: PARTIES[entry.winner].color }}>
                    {entry.winner}
                  </span>
                  <span className="text-xs text-gray-400">{formatRelativeTime(entry.verifiedAt)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  )
}