import React, { createContext, useContext, useState } from 'react'
import { PartyId } from '@/lib/partyConfig'

export type UserRole = 'public' | 'agent' | 'verifier' | 'admin'

interface PartyContextValue {
  selectedParty: PartyId
  setSelectedParty: (party: PartyId) => void
  currentRole: UserRole
  setCurrentRole: (role: UserRole) => void
}

const PartyContext = createContext<PartyContextValue | null>(null)

export function PartyProvider({ children }: { children: React.ReactNode }) {
  const [selectedParty, setSelectedParty] = useState<PartyId>('APC')
  const [currentRole, setCurrentRole] = useState<UserRole>('public')

  return (
    <PartyContext.Provider value={{ selectedParty, setSelectedParty, currentRole, setCurrentRole }}>
      {children}
    </PartyContext.Provider>
  )
}

export function useParty() {
  const ctx = useContext(PartyContext)
  if (!ctx) throw new Error('useParty must be used within PartyProvider')
  return ctx
}
