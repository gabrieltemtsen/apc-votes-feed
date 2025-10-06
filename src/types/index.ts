export type UserRole = 'public' | 'agent' | 'verifier' | 'admin'

export interface User {
  id: string
  email: string
  name: string
  image?: string
  role: UserRole
  approved: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Agent extends User {
  role: 'agent'
  phone?: string
  assignedPUs: string[]
  suspendedAt?: Date
  suspendedBy?: string
  suspensionReason?: string
}

export interface State {
  id: string
  name: string
  code: string
  lgas: LGA[]
}

export interface LGA {
  id: string
  name: string
  code: string
  stateId: string
  wards: Ward[]
}

export interface Ward {
  id: string
  name: string
  code: string
  lgaId: string
  pollingUnits: PollingUnit[]
}

export interface PollingUnit {
  id: string
  name: string
  code: string
  wardId: string
  lgaId: string
  stateId: string
  registeredVoters?: number
  location?: {
    latitude: number
    longitude: number
  }
}

export interface CandidateVotes {
  party: string
  votes: number
}

export interface SubmissionFigures {
  apcVotes: number
  validVotes: number
  rejectedBallots: number
  otherCandidates: CandidateVotes[]
}

export interface Submission {
  id: string
  pollingUnitId: string
  agentId: string
  figures: SubmissionFigures
  photos: Photo[]
  status: 'pending' | 'verified' | 'rejected'
  submittedAt: Date
  verifiedAt?: Date
  verifiedBy?: string
  rejectionReason?: string
  location?: {
    latitude: number
    longitude: number
  }
}

export interface Photo {
  id: string
  url: string
  thumbnailUrl: string
  caption?: string
  uploadedAt: Date
}

export interface VerificationAction {
  submissionId: string
  status: 'verified' | 'rejected'
  note?: string
  verifierId: string
}

export interface KPIStats {
  apcTotalVotes: number
  pusReporting: number
  verificationRate: number
  turnoutRate: number
  newSubmissions1h: number
  statesReporting: number
}

export interface TopStateData {
  state: string
  stateId: string
  votes: number
  pusReporting: number
  totalPUs: number
}

export interface SubmissionTimeData {
  timestamp: Date
  count: number
  cumulative: number
}

export interface VerificationMixData {
  verified: number
  pending: number
  rejected: number
}

export interface LatestVerifiedEntry {
  id: string
  state: string
  lga: string
  ward: string
  pollingUnit: string
  apcVotes: number
  verifiedAt: Date
  agentName: string
}

export interface SearchPUItem {
  id: string
  name: string
  code: string
  ward: string
  lga: string
  state: string
  category: 'state' | 'lga' | 'ward' | 'pu'
}

export interface AuditLogEntry {
  id: string
  actor: string
  actorRole: UserRole
  action: string
  target: string
  targetType: 'user' | 'submission' | 'polling_unit' | 'system'
  metadata?: Record<string, any>
  timestamp: Date
  ipAddress?: string
}

export interface GeographyUpload {
  id: string
  fileName: string
  uploadedBy: string
  uploadedAt: Date
  status: 'processing' | 'completed' | 'failed'
  stats?: {
    states: number
    lgas: number
    wards: number
    pollingUnits: number
  }
  errors?: string[]
}

export interface FilterOptions {
  states?: string[]
  lgas?: string[]
  wards?: string[]
  verifiedOnly?: boolean
  timeRange?: {
    start: Date
    end: Date
  }
}

export interface PaginationParams {
  page: number
  limit: number
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

export type SubmissionValidationError = {
  field: string
  message: string
}

export interface SubmissionFormData {
  pollingUnitId: string
  figures: SubmissionFigures
  photos: File[]
  useGPS: boolean
}

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  errors?: string[]
}

export interface NavigationItem {
  label: string
  href: string
  icon?: React.ComponentType<{ className?: string }>
  requiredRole?: UserRole[]
  badge?: string | number
}

export interface BreadcrumbItem {
  label: string
  href?: string
  active?: boolean
}