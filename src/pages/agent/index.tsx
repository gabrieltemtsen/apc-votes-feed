import { useSession } from 'next-auth/react'
import { Container } from '@/components/layout/Container'
import { EmptyState } from '@/components/ui/EmptyState'
import { LoadingSkeleton } from '@/components/ui/LoadingSkeleton'
import { GoogleSignInButton } from '@/components/auth/GoogleSignInButton'
import { Clock, AlertCircle, Upload } from 'lucide-react'

export default function AgentPage() {
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
          <h1 className="text-2xl font-bold">Agent Portal</h1>
          <p className="text-muted-foreground">
            Sign in to access the agent portal and submit polling unit results
          </p>
          <GoogleSignInButton callbackUrl="/agent" />
        </div>
      </Container>
    )
  }

  const userRole = session.user?.role
  const isApproved = session.user?.approved

  if (userRole !== 'agent') {
    return (
      <Container className="py-12">
        <EmptyState
          icon={AlertCircle}
          title="Access Denied"
          description="You need agent permissions to access this page"
        />
      </Container>
    )
  }

  if (!isApproved) {
    return (
      <Container className="py-12">
        <EmptyState
          icon={Clock}
          title="Approval Pending"
          description="Your agent account is pending approval from an administrator. You'll be notified once you can start submitting results."
        />
      </Container>
    )
  }

  return (
    <Container className="py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Agent Portal</h1>
        <p className="text-muted-foreground">
          Submit and manage polling unit results
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="rounded-lg border bg-card p-6 text-center">
          <div className="text-2xl font-bold">5</div>
          <div className="text-sm text-muted-foreground">Assigned PUs</div>
        </div>
        <div className="rounded-lg border bg-card p-6 text-center">
          <div className="text-2xl font-bold text-apc-green">3</div>
          <div className="text-sm text-muted-foreground">Submitted</div>
        </div>
        <div className="rounded-lg border bg-card p-6 text-center">
          <div className="text-2xl font-bold text-amber-600">2</div>
          <div className="text-sm text-muted-foreground">Pending</div>
        </div>
      </div>

      {/* Submit Results Section */}
      <div className="rounded-2xl border bg-card p-8 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-apc-blue/10 flex items-center justify-center mx-auto">
          <Upload className="h-8 w-8 text-apc-blue" />
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-2">Submit New Results</h2>
          <p className="text-muted-foreground">
            Select a polling unit and submit the election results with photo evidence
          </p>
        </div>
        <div className="text-sm text-muted-foreground">
          Form components will be implemented next...
        </div>
      </div>

      {/* Recent Submissions */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Recent Submissions</h2>
        <div className="rounded-lg border bg-card p-6">
          <EmptyState
            title="No submissions yet"
            description="Your submitted results will appear here"
          />
        </div>
      </div>
    </Container>
  )
}