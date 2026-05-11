import { useState } from 'react'
import { Container } from '@/components/layout/Container'
import {
  AlertCircle, CheckCircle, XCircle, Clock, Camera, Flag, Eye
} from 'lucide-react'
import { useParty } from '@/context/PartyContext'
import { PARTIES, PARTY_LIST, PartyId } from '@/lib/partyConfig'
import { PENDING_SUBMISSIONS, PendingSubmission } from '@/lib/mockData'
import { formatNumber, formatRelativeTime } from '@/lib/format'

export default function VerifyPage() {
  const { currentRole, selectedParty, setCurrentRole } = useParty()
  const partyCfg = PARTIES[selectedParty]

  const [queue, setQueue] = useState<PendingSubmission[]>(PENDING_SUBMISSIONS)
  const [selected, setSelected] = useState<PendingSubmission | null>(null)
  const [verifiedCount, setVerifiedCount] = useState(45)
  const [rejectedCount, setRejectedCount] = useState(3)
  const [note, setNote] = useState('')

  if (currentRole !== 'verifier' && currentRole !== 'admin') {
    return (
      <div className="bg-gray-50 min-h-screen">
        <Container className="py-16">
          <div className="max-w-md mx-auto text-center space-y-6">
            <div className="h-16 w-16 rounded-full bg-amber-100 flex items-center justify-center mx-auto">
              <AlertCircle className="h-8 w-8 text-amber-500" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Verification Portal</h1>
              <p className="text-gray-500 mt-2">Switch to <strong>Verifier</strong> or <strong>Admin</strong> role to access this portal.</p>
            </div>
            <button
              onClick={() => setCurrentRole('verifier')}
              className="px-6 py-3 rounded-xl text-white font-semibold transition-opacity hover:opacity-90"
              style={{ backgroundColor: partyCfg.color }}
            >
              Switch to Verifier Role (Demo)
            </button>
          </div>
        </Container>
      </div>
    )
  }

  function approve(sub: PendingSubmission) {
    setQueue(prev => prev.filter(s => s.id !== sub.id))
    setVerifiedCount(c => c + 1)
    if (selected?.id === sub.id) setSelected(null)
    setNote('')
  }

  function reject(sub: PendingSubmission) {
    setQueue(prev => prev.filter(s => s.id !== sub.id))
    setRejectedCount(c => c + 1)
    if (selected?.id === sub.id) setSelected(null)
    setNote('')
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Container className="py-6 space-y-6">

        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Verification Portal</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Review and verify submitted polling unit result sheets
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Pending Review', value: queue.length, color: '#f59e0b', icon: Clock },
            { label: 'Verified Today', value: verifiedCount, color: '#10b981', icon: CheckCircle },
            { label: 'Rejected Today', value: rejectedCount, color: '#ef4444', icon: XCircle },
            { label: 'Total Processed', value: verifiedCount + rejectedCount, color: '#6366f1', icon: Eye },
          ].map((s, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-200 p-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${s.color}18` }}>
                <s.icon className="h-5 w-5" style={{ color: s.color }} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900" style={{ color: s.color }}>{s.value}</p>
                <p className="text-xs text-gray-500">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">

          {/* Queue list */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-bold text-gray-900 text-sm">Queue ({queue.length})</h2>
              {queue.some(s => s.flagged) && (
                <span className="flex items-center gap-1 text-xs text-red-600 font-medium">
                  <Flag className="h-3 w-3" /> {queue.filter(s => s.flagged).length} flagged
                </span>
              )}
            </div>
            {queue.length === 0 ? (
              <div className="p-8 text-center">
                <CheckCircle className="h-8 w-8 text-green-400 mx-auto mb-2" />
                <p className="font-semibold text-gray-700">All clear!</p>
                <p className="text-xs text-gray-400 mt-1">No pending submissions.</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-50">
                {queue.map(sub => (
                  <button
                    key={sub.id}
                    onClick={() => setSelected(sub)}
                    className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors ${selected?.id === sub.id ? 'bg-gray-50' : ''}`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          {sub.flagged && <Flag className="h-3 w-3 text-red-500 shrink-0" />}
                          <p className="font-semibold text-sm text-gray-900 truncate">{sub.puName}</p>
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5">{sub.state} · {sub.lga}</p>
                      </div>
                      <div className="flex flex-col items-end gap-1 shrink-0">
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-bold text-white" style={{ backgroundColor: PARTIES[sub.party].color }}>
                          {sub.party}
                        </span>
                        <span className="text-xs text-gray-400">{sub.photoCount} 📷</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">{formatRelativeTime(sub.submittedAt)} · {sub.agentName}</p>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Detail panel */}
          <div className="lg:col-span-3">
            {!selected ? (
              <div className="bg-white rounded-2xl border border-gray-200 h-full flex items-center justify-center p-10 text-center">
                <div>
                  <Eye className="h-8 w-8 text-gray-300 mx-auto mb-3" />
                  <p className="font-semibold text-gray-500">Select a submission to review</p>
                  <p className="text-sm text-gray-400 mt-1">Click any item in the queue to view details</p>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      {selected.flagged && <Flag className="h-4 w-4 text-red-500" />}
                      <h3 className="font-bold text-gray-900 text-sm">{selected.puName}</h3>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">{selected.puCode} · {selected.ward} · {selected.lga} · {selected.state}</p>
                  </div>
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold text-white" style={{ backgroundColor: PARTIES[selected.party].color }}>
                    {selected.party}
                  </span>
                </div>

                <div className="p-5 space-y-5">
                  {/* Vote table */}
                  <div>
                    <p className="text-xs font-semibold text-gray-500 mb-3 uppercase tracking-wide">Declared Votes</p>
                    <div className="grid grid-cols-2 gap-3">
                      {PARTY_LIST.map(p => {
                        const v = selected.votes[p.id as PartyId]
                        const total = selected.votes.APC + selected.votes.PDP + selected.votes.LP + selected.votes.NNPP
                        const pct = total > 0 ? (v / total) * 100 : 0
                        return (
                          <div key={p.id} className="rounded-xl p-3" style={{ backgroundColor: p.lightColor }}>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs font-bold" style={{ color: p.color }}>{p.shortName}</span>
                              <span className="text-xs text-gray-500">{pct.toFixed(1)}%</span>
                            </div>
                            <p className="text-xl font-bold text-gray-900">{formatNumber(v)}</p>
                            <div className="h-1 bg-gray-200 rounded-full mt-2 overflow-hidden">
                              <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: p.color }} />
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Agent + photo info */}
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="bg-gray-50 rounded-xl p-3">
                      <p className="text-xs text-gray-500 mb-1">Submitted By</p>
                      <p className="font-semibold text-gray-900">{selected.agentName}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{formatRelativeTime(selected.submittedAt)}</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-3">
                      <p className="text-xs text-gray-500 mb-1">Photo Evidence</p>
                      <div className="flex items-center gap-2">
                        <Camera className="h-4 w-4 text-gray-400" />
                        <p className="font-semibold text-gray-900">{selected.photoCount} photo{selected.photoCount !== 1 ? 's' : ''}</p>
                      </div>
                      <p className="text-xs text-gray-400 mt-0.5">BVAS/EC8A scans</p>
                    </div>
                  </div>

                  {selected.flagged && (
                    <div className="flex items-start gap-2 bg-red-50 border border-red-100 rounded-xl p-3">
                      <Flag className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
                      <p className="text-xs text-red-700 font-medium">
                        This submission has been auto-flagged for review. Verify the photo evidence carefully before approving.
                      </p>
                    </div>
                  )}

                  {/* Review note */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Review Note (optional)</label>
                    <textarea
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm resize-none focus:outline-none"
                      rows={2}
                      placeholder="Add a note for the audit log..."
                      value={note}
                      onChange={e => setNote(e.target.value)}
                    />
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => approve(selected)}
                      className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-green-500 hover:bg-green-600 text-white font-semibold transition-colors"
                    >
                      <CheckCircle className="h-4 w-4" />
                      Verify & Approve
                    </button>
                    <button
                      onClick={() => reject(selected)}
                      className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 font-semibold transition-colors border border-red-100"
                    >
                      <XCircle className="h-4 w-4" />
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  )
}