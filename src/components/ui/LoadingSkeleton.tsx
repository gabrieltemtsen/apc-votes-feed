import { cn } from '@/lib/utils'

interface LoadingSkeletonProps {
  className?: string
  variant?: 'text' | 'circular' | 'rectangular'
  width?: string | number
  height?: string | number
}

export function LoadingSkeleton({ 
  className,
  variant = 'text',
  width,
  height,
}: LoadingSkeletonProps) {
  const variantClasses = {
    text: 'h-4 rounded',
    circular: 'rounded-full aspect-square',
    rectangular: 'rounded-lg',
  }

  const style: React.CSSProperties = {}
  if (width) style.width = width
  if (height) style.height = height

  return (
    <div
      className={cn(
        'animate-pulse bg-muted',
        variantClasses[variant],
        className
      )}
      style={style}
    />
  )
}

export function TableSkeleton({ rows = 5, cols = 4 }: { rows?: number; cols?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center space-x-4">
          {Array.from({ length: cols }).map((_, j) => (
            <LoadingSkeleton 
              key={j} 
              className={cn(
                "h-4",
                j === 0 ? "w-16" : j === cols - 1 ? "w-12" : "flex-1"
              )} 
            />
          ))}
        </div>
      ))}
    </div>
  )
}

export function ChartSkeleton() {
  return (
    <div className="space-y-4">
      <LoadingSkeleton className="h-6 w-32" />
      <div className="h-64 rounded-lg bg-muted animate-pulse flex items-end justify-around p-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="bg-muted-foreground/20 rounded-t w-8"
            style={{ height: `${Math.random() * 80 + 20}%` }}
          />
        ))}
      </div>
    </div>
  )
}

export function CardSkeleton({ lines = 3 }: { lines?: number }) {
  return (
    <div className="rounded-2xl border p-6 space-y-3">
      <LoadingSkeleton className="h-5 w-3/4" />
      {Array.from({ length: lines }).map((_, i) => (
        <LoadingSkeleton 
          key={i} 
          className={cn(
            "h-4",
            i === lines - 1 ? "w-1/2" : "w-full"
          )} 
        />
      ))}
    </div>
  )
}