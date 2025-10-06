import { useSession } from 'next-auth/react'
import { Container } from '@/components/layout/Container'
import { EmptyState } from '@/components/ui/EmptyState'
import { LoadingSkeleton } from '@/components/ui/LoadingSkeleton'
import { GoogleSignInButton } from '@/components/auth/GoogleSignInButton'
import { AlertCircle, Users, MapPin, Activity, Shield } from 'lucide-react'
import { isAdmin } from '@/lib/roles'

export default function AdminPage() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return (
      <Container className="py-8">
        <LoadingSkeleton className="h-8 w-64 mb-4" />
        <LoadingSkeleton className="h-64 w-full" />
      </Container>
    )
  }

  if (!session) {
    return (
      <Container className="py-12">
        <div className="max-w-md mx-auto text-center space-y-6">
          <h1 className="text-2xl font-bold">Admin Portal</h1>
          <p className="text-muted-foreground">
            Sign in to access the admin portal
          </p>
          <GoogleSignInButton callbackUrl="/admin" />
        </div>
      </Container>
    )
  }

  const userRole = session.user?.role
  
  if (!isAdmin(userRole as 'public' | 'agent' | 'verifier' | 'admin')) {
    return (
      <Container className="py-12">
        <EmptyState
          icon={AlertCircle}
          title="Access Denied"
          description="You need admin permissions to access this page"
        />
      </Container>
    )
  }

  return (
    <Container className="py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Portal</h1>
        <p className="text-muted-foreground">
          Manage agents, geography data, and system settings
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="rounded-lg border bg-card p-6 space-y-3">
          <div className="w-12 h-12 rounded-lg bg-apc-blue/10 flex items-center justify-center">
            <Users className="h-6 w-6 text-apc-blue" />
          </div>
          <h3 className="font-semibold">Manage Agents</h3>
          <p className="text-sm text-muted-foreground">
            Approve, suspend, and manage agent accounts
          </p>
        </div>

        <div className="rounded-lg border bg-card p-6 space-y-3">
          <div className="w-12 h-12 rounded-lg bg-apc-green/10 flex items-center justify-center">
            <MapPin className="h-6 w-6 text-apc-green" />
          </div>
          <h3 className="font-semibold">Geography Data</h3>
          <p className="text-sm text-muted-foreground">
            Upload and manage states, LGAs, wards, and polling units
          </p>
        </div>

        <div className="rounded-lg border bg-card p-6 space-y-3">
          <div className="w-12 h-12 rounded-lg bg-amber-500/10 flex items-center justify-center">
            <Activity className="h-6 w-6 text-amber-600" />
          </div>
          <h3 className="font-semibold">Audit Logs</h3>
          <p className="text-sm text-muted-foreground">
            View system activity and user actions
          </p>
        </div>

        <div className="rounded-lg border bg-card p-6 space-y-3">
          <div className="w-12 h-12 rounded-lg bg-apc-red/10 flex items-center justify-center">
            <Shield className="h-6 w-6 text-apc-red" />
          </div>
          <h3 className="font-semibold">System Settings</h3>
          <p className="text-sm text-muted-foreground">
            Configure system parameters and security
          </p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Recent Activity</h2>
        <div className="rounded-lg border bg-card p-6">
          <EmptyState
            title="System activity will appear here"
            description="Recent admin actions and system events"
          />
        </div>
      </div>

      {/* Pending Approvals */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Pending Agent Approvals</h2>
        <div className="rounded-lg border bg-card p-6">
          <EmptyState
            title="No pending approvals"
            description="All agent applications have been processed"
          />
        </div>
      </div>
    </Container>
  )
}