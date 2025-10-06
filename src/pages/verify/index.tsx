import { useSession } from 'next-auth/react'
import { Container } from '@/components/layout/Container'
import { EmptyState } from '@/components/ui/EmptyState'
import { LoadingSkeleton } from '@/components/ui/LoadingSkeleton'
import { GoogleSignInButton } from '@/components/auth/GoogleSignInButton'
import { AlertCircle, CheckCircle, Clock } from 'lucide-react'
import { isVerifier } from '@/lib/roles'

export default function VerifyPage() {
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
          <h1 className="text-2xl font-bold">Verification Portal</h1>
          <p className="text-muted-foreground">
            Sign in to access the verification portal
          </p>
          <GoogleSignInButton callbackUrl="/verify" />
        </div>
      </Container>
    )
  }

  const userRole = session.user?.role
  
  if (!isVerifier(userRole as 'public' | 'agent' | 'verifier' | 'admin')) {
    return (
      <Container className="py-12">
        <EmptyState
          icon={AlertCircle}
          title="Access Denied"
          description="You need verifier or admin permissions to access this page"
        />
      </Container>
    )
  }

  return (
    <Container className="py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Verification Portal</h1>
        <p className="text-muted-foreground">
          Review and verify submitted polling unit results
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
        <div className="rounded-lg border bg-card p-6 text-center">
          <div className="text-2xl font-bold text-amber-600">12</div>
          <div className="text-sm text-muted-foreground">Pending Review</div>
        </div>
        <div className="rounded-lg border bg-card p-6 text-center">
          <div className="text-2xl font-bold text-apc-green">45</div>
          <div className="text-sm text-muted-foreground">Verified Today</div>
        </div>
        <div className="rounded-lg border bg-card p-6 text-center">
          <div className="text-2xl font-bold text-apc-red">3</div>
          <div className="text-sm text-muted-foreground">Rejected Today</div>
        </div>
        <div className="rounded-lg border bg-card p-6 text-center">
          <div className="text-2xl font-bold">158</div>
          <div className="text-sm text-muted-foreground">Total Processed</div>
        </div>
      </div>

      {/* Verification Queue */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Verification Queue</h2>
        <div className="rounded-lg border bg-card p-6">
          <EmptyState
            icon={Clock}
            title="No pending submissions"
            description="All submissions have been processed"
          />
        </div>
      </div>
    </Container>
  )
}