import Link from 'next/link'
import { useRouter } from 'next/router'
import { Home, BarChart3, CheckCircle, Settings } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useParty } from '@/context/PartyContext'
import { PARTIES } from '@/lib/partyConfig'

const bottomNavItems = [
  { label: 'Dashboard', href: '/', icon: Home },
  { label: 'Results', href: '/results', icon: BarChart3 },
  { label: 'Verify', href: '/verify', icon: CheckCircle },
  { label: 'Admin', href: '/admin', icon: Settings },
]

export function BottomNav() {
  const router = useRouter()
  const { selectedParty } = useParty()
  const partyCfg = PARTIES[selectedParty]

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 md:hidden">
      <div className="grid grid-cols-4">
        {bottomNavItems.map((item) => {
          const isActive = router.pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center py-2 px-1 text-xs transition-colors',
                isActive ? 'font-semibold' : 'text-gray-400 hover:text-gray-600'
              )}
              style={isActive ? { color: partyCfg.color } : {}}
            >
              <item.icon className="h-5 w-5 mb-1" />
              <span className="truncate">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}