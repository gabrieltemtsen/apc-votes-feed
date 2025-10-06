import { CheckCircle, Clock, XCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

type Status = 'verified' | 'pending' | 'rejected'

interface StatusPillProps {
  status: Status
  className?: string
  showIcon?: boolean
}

const statusConfig = {
  verified: {
    label: 'Verified',
    className: 'bg-apc-green/10 text-apc-green border-apc-green/20',
    icon: CheckCircle,
  },
  pending: {
    label: 'Pending',
    className: 'bg-amber-100 text-amber-800 border-amber-200',
    icon: Clock,
  },
  rejected: {
    label: 'Rejected',
    className: 'bg-apc-red/10 text-apc-red border-apc-red/20',
    icon: XCircle,
  },
}

export function StatusPill({ 
  status, 
  className, 
  showIcon = true 
}: StatusPillProps) {
  const config = statusConfig[status]
  const Icon = config.icon

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors",
        config.className,
        className
      )}
    >
      {showIcon && <Icon className="h-3 w-3" />}
      {config.label}
    </span>
  )
}