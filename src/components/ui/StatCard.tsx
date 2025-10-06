import { LucideIcon } from 'lucide-react'
import { formatNumber, formatDelta } from '@/lib/format'
import { cn } from '@/lib/utils'

interface StatCardProps {
  title: string
  value: number
  delta?: {
    value: number
    isPositive: boolean
    label?: string
  }
  icon?: LucideIcon
  className?: string
  loading?: boolean
}

export function StatCard({ 
  title, 
  value, 
  delta, 
  icon: Icon, 
  className,
  loading = false 
}: StatCardProps) {
  if (loading) {
    return (
      <div className={cn(
        "rounded-2xl border bg-card p-6 text-card-foreground shadow-sm",
        "shimmer",
        className
      )}>
        <div className="space-y-2">
          <div className="h-4 bg-muted rounded animate-pulse" />
          <div className="h-8 bg-muted rounded animate-pulse" />
          <div className="h-3 bg-muted rounded w-1/2 animate-pulse" />
        </div>
      </div>
    )
  }

  return (
    <div className={cn(
      "rounded-2xl border bg-card p-6 text-card-foreground shadow-sm transition-shadow hover:shadow-md",
      className
    )}>
      <div className="flex items-center justify-between space-y-0 pb-2">
        <h3 className="text-sm font-medium text-muted-foreground">
          {title}
        </h3>
        {Icon && (
          <Icon className="h-5 w-5 text-muted-foreground" />
        )}
      </div>
      <div className="space-y-1">
        <div className="text-3xl font-bold tracking-tight">
          {formatNumber(value)}
        </div>
        {delta && (
          <p className="flex items-center gap-1 text-xs text-muted-foreground">
            <span className={cn(
              "inline-flex items-center gap-1 font-medium",
              delta.isPositive ? "text-apc-green" : "text-apc-red"
            )}>
              {delta.isPositive ? "+" : "-"}{formatNumber(delta.value)}
            </span>
            {delta.label && (
              <span>{delta.label}</span>
            )}
          </p>
        )}
      </div>
    </div>
  )
}