import NextAuth, { type NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { UserRole } from '@/types'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
      role: UserRole
      approved: boolean
    }
  }

  interface User {
    id: string
    name?: string | null
    email?: string | null
    image?: string | null
    role: UserRole
    approved: boolean
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role: UserRole
    approved: boolean
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === 'google') {
        // TODO: Check against Convex database for user role and approval status
        // For now, return mock data based on email
        return true
      }
      return false
    },
    async jwt({ token, user, account }) {
      if (account && user) {
        // TODO: Fetch user role and approval status from Convex
        // Mock implementation for now
        const email = user.email?.toLowerCase()
        
        if (email?.includes('admin')) {
          token.role = 'admin'
          token.approved = true
        } else if (email?.includes('verifier')) {
          token.role = 'verifier'
          token.approved = true
        } else if (email?.includes('agent')) {
          token.role = 'agent'
          token.approved = false // Agents need approval
        } else {
          token.role = 'public'
          token.approved = true
        }
      }
      
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub!
        session.user.role = token.role
        session.user.approved = token.approved
      }
      
      return session
    },
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
}

export default NextAuth(authOptions)