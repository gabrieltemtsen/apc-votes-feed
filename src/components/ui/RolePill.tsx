import { UserRole } from '@/types'
import { getRoleColor, getRoleLabel } from '@/lib/roles'
import { cn } from '@/lib/utils'

interface RolePillProps {
  role: UserRole
  className?: string
}

export function RolePill({ role, className }: RolePillProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        getRoleColor(role),
        className
      )}
    >
      {getRoleLabel(role)}
    </span>
  )
}