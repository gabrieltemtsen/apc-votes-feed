import Link from 'next/link'
import { useRouter } from 'next/router'
import { Home, BarChart3, Search, Radio } from 'lucide-react'
import { cn } from '@/lib/utils'

const bottomNavItems = [
  {
    label: 'Home',
    href: '/',
    icon: Home,
  },
  {
    label: 'Results',
    href: '/results',
    icon: BarChart3,
  },
  {
    label: 'Search',
    href: '/results?search=true',
    icon: Search,
  },
  {
    label: 'Live',
    href: '/?live=true',
    icon: Radio,
  },
]

export function BottomNav() {
  const router = useRouter()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t md:hidden">
      <div className="grid grid-cols-4">
        {bottomNavItems.map((item) => {
          const isActive = router.pathname === item.href || 
            (item.href === '/' && router.pathname === '/') ||
            (item.href.includes('results') && router.pathname.includes('results'))
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center py-2 px-1 text-xs transition-colors",
                isActive
                  ? "text-apc-blue bg-apc-blue/10"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <item.icon className={cn(
                "h-5 w-5 mb-1",
                isActive && "text-apc-blue"
              )} />
              <span className="truncate">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}