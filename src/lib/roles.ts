import { UserRole } from '@/types'

export const ROLE_PERMISSIONS = {
  public: {
    canView: ['home', 'results', 'about'],
    canAccess: [],
  },
  agent: {
    canView: ['home', 'results', 'about', 'agent'],
    canAccess: ['submit_result', 'view_own_submissions'],
  },
  verifier: {
    canView: ['home', 'results', 'about', 'verify'],
    canAccess: ['verify_submissions', 'view_all_submissions'],
  },
  admin: {
    canView: ['home', 'results', 'about', 'verify', 'admin'],
    canAccess: [
      'verify_submissions',
      'view_all_submissions',
      'manage_agents',
      'manage_geography',
      'view_audit_logs',
      'system_settings',
    ],
  },
} as const

export function hasPermission(userRole: UserRole, permission: string): boolean {
  return ROLE_PERMISSIONS[userRole].canAccess.includes(permission as never)
}

export function canViewPage(userRole: UserRole, page: string): boolean {
  return ROLE_PERMISSIONS[userRole].canView.includes(page as never)
}

export function isAdmin(userRole: UserRole): boolean {
  return userRole === 'admin'
}

export function isVerifier(userRole: UserRole): boolean {
  return userRole === 'verifier' || userRole === 'admin'
}

export function isAgent(userRole: UserRole): boolean {
  return userRole === 'agent'
}

export function requiresApproval(userRole: UserRole): boolean {
  return userRole === 'agent'
}

export function getRoleColor(role: UserRole): string {
  switch (role) {
    case 'admin':
      return 'bg-apc-red text-white'
    case 'verifier':
      return 'bg-apc-blue text-white'
    case 'agent':
      return 'bg-apc-green text-white'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

export function getRoleLabel(role: UserRole): string {
  switch (role) {
    case 'admin':
      return 'Admin'
    case 'verifier':
      return 'Verifier'
    case 'agent':
      return 'Agent'
    default:
      return 'Public'
  }
}

export function getHighestRole(roles: UserRole[]): UserRole {
  const roleHierarchy: UserRole[] = ['admin', 'verifier', 'agent', 'public']
  
  for (const role of roleHierarchy) {
    if (roles.includes(role)) {
      return role
    }
  }
  
  return 'public'
}