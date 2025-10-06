import { SubmissionFigures, SubmissionValidationError } from '@/types'

export function validateSubmissionFigures(figures: SubmissionFigures): SubmissionValidationError[] {
  const errors: SubmissionValidationError[] = []
  
  if (!Number.isInteger(figures.apcVotes) || figures.apcVotes < 0) {
    errors.push({
      field: 'apcVotes',
      message: 'APC votes must be a non-negative integer',
    })
  }
  
  if (!Number.isInteger(figures.validVotes) || figures.validVotes < 0) {
    errors.push({
      field: 'validVotes',
      message: 'Valid votes must be a non-negative integer',
    })
  }
  
  if (!Number.isInteger(figures.rejectedBallots) || figures.rejectedBallots < 0) {
    errors.push({
      field: 'rejectedBallots',
      message: 'Rejected ballots must be a non-negative integer',
    })
  }
  
  const totalCandidateVotes = figures.apcVotes + figures.otherCandidates.reduce((sum, candidate) => sum + candidate.votes, 0)
  const totalVotes = figures.validVotes + figures.rejectedBallots
  
  if (totalCandidateVotes !== figures.validVotes) {
    errors.push({
      field: 'validVotes',
      message: `Sum of candidate votes (${totalCandidateVotes}) must equal valid votes`,
    })
  }
  
  figures.otherCandidates.forEach((candidate, index) => {
    if (!candidate.party.trim()) {
      errors.push({
        field: `otherCandidates.${index}.party`,
        message: 'Party name is required',
      })
    }
    
    if (!Number.isInteger(candidate.votes) || candidate.votes < 0) {
      errors.push({
        field: `otherCandidates.${index}.votes`,
        message: 'Votes must be a non-negative integer',
      })
    }
  })
  
  return errors
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function validatePhoneNumber(phone: string): boolean {
  const phoneRegex = /^(\+234|0)[789]\d{9}$/
  return phoneRegex.test(phone.replace(/\s/g, ''))
}

export function validatePollingUnitCode(code: string): boolean {
  const parts = code.split('/')
  return parts.length === 4 && parts.every(part => part.trim().length > 0)
}

export function validateImageFile(file: File): { valid: boolean; error?: string } {
  const maxSize = 5 * 1024 * 1024 // 5MB
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
  
  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: 'Only JPEG, PNG, and WebP images are allowed',
    }
  }
  
  if (file.size > maxSize) {
    return {
      valid: false,
      error: 'Image size must be less than 5MB',
    }
  }
  
  return { valid: true }
}

export function sanitizeInput(input: string): string {
  return input.trim().replace(/[<>]/g, '')
}

export function validateCSVFile(file: File): { valid: boolean; error?: string } {
  const allowedTypes = ['text/csv', 'application/vnd.ms-excel']
  const maxSize = 10 * 1024 * 1024 // 10MB
  
  if (!allowedTypes.includes(file.type) && !file.name.endsWith('.csv')) {
    return {
      valid: false,
      error: 'Only CSV files are allowed',
    }
  }
  
  if (file.size > maxSize) {
    return {
      valid: false,
      error: 'File size must be less than 10MB',
    }
  }
  
  return { valid: true }
}