import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { BreadcrumbItem } from '@/types'

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav 
      aria-label="Breadcrumb" 
      className={cn("flex items-center space-x-1 text-sm text-muted-foreground", className)}
    >
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          {index > 0 && (
            <ChevronRight className="h-4 w-4 mx-1 flex-shrink-0" />
          )}
          {item.href && !item.active ? (
            <Link 
              href={item.href}
              className="hover:text-foreground transition-colors truncate"
            >
              {item.label}
            </Link>
          ) : (
            <span className={cn(
              "truncate",
              item.active && "text-foreground font-medium"
            )}>
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  )
}