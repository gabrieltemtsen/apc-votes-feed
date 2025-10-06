import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { Menu, Home, BarChart3, Users, CheckCircle, Settings, Info } from 'lucide-react'
import { Container } from './Container'
import { UserMenu } from '@/components/auth/UserMenu'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { MobileNavDrawer } from './MobileNavDrawer'
import { cn } from '@/lib/utils'
import { canViewPage } from '@/lib/roles'
import { NavigationItem } from '@/types'

const navigationItems: NavigationItem[] = [
  {
    label: 'Results',
    href: '/results',
    icon: BarChart3,
  },
  {
    label: 'Agents',
    href: '/agent',
    icon: Users,
    requiredRole: ['agent'],
  },
  {
    label: 'Verify',
    href: '/verify',
    icon: CheckCircle,
    requiredRole: ['verifier', 'admin'],
  },
  {
    label: 'Admin',
    href: '/admin',
    icon: Settings,
    requiredRole: ['admin'],
  },
  {
    label: 'About',
    href: '/about',
    icon: Info,
  },
]

export function SiteHeader() {
  const { data: session } = useSession()
  const userRole = session?.user?.role || 'public'

  const filteredNavItems = navigationItems.filter(item => 
    !item.requiredRole || item.requiredRole.includes(userRole)
  )

  return (
    <>
      <div className="apc-stripe" />
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <Container>
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-6">
              <Link 
                href="/"
                className="flex items-center gap-2 font-bold text-xl"
              >
                <div className="h-8 w-8 rounded bg-apc-blue flex items-center justify-center">
                  <Home className="h-5 w-5 text-white" />
                </div>
                <span className="hidden sm:block">APC Riders 001</span>
              </Link>

              <nav className="hidden md:flex items-center space-x-6">
                {filteredNavItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-primary",
                      "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="flex items-center gap-4">
              {session?.user ? (
                <UserMenu user={session.user} />
              ) : (
                <Button asChild size="sm">
                  <Link href="/api/auth/signin">Sign In</Link>
                </Button>
              )}

              <div className="md:hidden">
                <MobileNavDrawer items={filteredNavItems} />
              </div>
            </div>
          </div>
        </Container>
      </header>
    </>
  )
}