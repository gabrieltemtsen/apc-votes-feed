import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { BarChart3, Menu, X, Radio, ChevronDown } from 'lucide-react'
import { Container } from './Container'
import { cn } from '@/lib/utils'
import { PARTY_LIST, PartyId } from '@/lib/partyConfig'
import { useParty, UserRole } from '@/context/PartyContext'

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/' },
  { label: 'Results', href: '/results' },
  { label: 'Agent Portal', href: '/agent', roles: ['agent', 'admin'] as UserRole[] },
  { label: 'Verify', href: '/verify', roles: ['verifier', 'admin'] as UserRole[] },
  { label: 'Admin', href: '/admin', roles: ['admin'] as UserRole[] },
]

const ROLE_OPTIONS: { value: UserRole; label: string }[] = [
  { value: 'public', label: 'Public View' },
  { value: 'agent', label: 'Field Agent' },
  { value: 'verifier', label: 'Verifier' },
  { value: 'admin', label: 'Admin' },
]

export function SiteHeader() {
  const { selectedParty, setSelectedParty, currentRole, setCurrentRole } = useParty()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [roleDropOpen, setRoleDropOpen] = useState(false)
  const router = useRouter()

  const visibleNavItems = NAV_ITEMS.filter(item =>
    !item.roles || item.roles.includes(currentRole)
  )

  const currentParty = PARTY_LIST.find(p => p.id === selectedParty)!
  const currentRoleLabel = ROLE_OPTIONS.find(r => r.value === currentRole)?.label ?? 'Public View'

  return (
    <>
      {/* Gradient top stripe */}
      <div style={{ height: 4, background: `linear-gradient(90deg, ${currentParty.color} 0%, ${currentParty.darkColor} 100%)` }} />

      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 shadow-sm">
        <Container>
          <div className="flex h-16 items-center justify-between gap-4">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 shrink-0">
              <div
                className="h-9 w-9 rounded-lg flex items-center justify-center shadow-sm"
                style={{ backgroundColor: currentParty.color }}
              >
                <BarChart3 className="h-5 w-5 text-white" />
              </div>
              <div className="hidden sm:block">
                <p className="font-bold text-sm leading-none text-gray-900">ElectFeed NG</p>
                <p className="text-xs text-gray-500 leading-none mt-0.5">Live Election Monitor</p>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {visibleNavItems.map(item => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'px-3 py-2 rounded-md text-sm font-medium transition-colors',
                    router.pathname === item.href
                      ? 'text-white'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  )}
                  style={router.pathname === item.href ? { backgroundColor: currentParty.color } : {}}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Right Controls */}
            <div className="flex items-center gap-2 shrink-0">

              {/* Live Indicator */}
              <div className="hidden sm:flex items-center gap-1.5 bg-red-50 text-red-600 px-2.5 py-1.5 rounded-full text-xs font-semibold">
                <Radio className="h-3 w-3 animate-pulse" />
                LIVE
              </div>

              {/* Party Switcher */}
              <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
                {PARTY_LIST.map(party => (
                  <button
                    key={party.id}
                    onClick={() => setSelectedParty(party.id as PartyId)}
                    className={cn(
                      'px-2.5 py-1 rounded-md text-xs font-bold transition-all',
                      selectedParty === party.id
                        ? 'text-white shadow-sm scale-105'
                        : 'text-gray-500 hover:text-gray-700'
                    )}
                    style={selectedParty === party.id ? { backgroundColor: party.color } : {}}
                    title={party.name}
                  >
                    {party.shortName}
                  </button>
                ))}
              </div>

              {/* Role Picker */}
              <div className="relative hidden sm:block">
                <button
                  onClick={() => setRoleDropOpen(prev => !prev)}
                  className="flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-700 transition-colors"
                >
                  <span>{currentRoleLabel}</span>
                  <ChevronDown className="h-3 w-3" />
                </button>
                {roleDropOpen && (
                  <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-1 min-w-[140px] z-50">
                    {ROLE_OPTIONS.map(opt => (
                      <button
                        key={opt.value}
                        onClick={() => { setCurrentRole(opt.value); setRoleDropOpen(false) }}
                        className={cn(
                          'w-full text-left px-3 py-2 text-xs hover:bg-gray-50 transition-colors',
                          currentRole === opt.value ? 'font-semibold' : 'text-gray-700'
                        )}
                        style={currentRole === opt.value ? { color: currentParty.color } : {}}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-2 rounded-lg hover:bg-gray-100"
                onClick={() => setMobileOpen(prev => !prev)}
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </Container>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden border-t bg-white">
            <Container>
              <div className="py-3 space-y-1">
                {visibleNavItems.map(item => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      'block px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                      router.pathname === item.href
                        ? 'text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    )}
                    style={router.pathname === item.href ? { backgroundColor: currentParty.color } : {}}
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="pt-2 border-t">
                  <p className="text-xs text-gray-500 px-3 mb-1">Viewing as</p>
                  {ROLE_OPTIONS.map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => { setCurrentRole(opt.value); setMobileOpen(false) }}
                      className={cn(
                        'w-full text-left px-3 py-2 rounded-lg text-sm transition-colors',
                        currentRole === opt.value ? 'font-semibold' : 'text-gray-700 hover:bg-gray-100'
                      )}
                      style={currentRole === opt.value ? { color: currentParty.color } : {}}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </Container>
          </div>
        )}
      </header>
    </>
  )
}