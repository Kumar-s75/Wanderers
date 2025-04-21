import { withAuth } from "next-auth/middleware"
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

const rateLimit = new Map<string, { count: number; resetTime: number }>()

async function checkRateLimit(ip: string) {
  const now = Date.now()
  const windowMs = 60 * 1000 // 1 minute
  const maxRequests = 100

  const current = rateLimit.get(ip)
  
  if (!current || now > current.resetTime) {
    rateLimit.set(ip, {
      count: 1,
      resetTime: now + windowMs,
    })
    return { success: true }
  }

  if (current.count >= maxRequests) {
    return { success: false }
  }

  current.count++
  return { success: true }
}

// Create a custom middleware that combines rate limiting and auth
export default withAuth(
  async function middleware(request: NextRequest) {
    // Rate limiting
    const ip = request.headers.get('x-forwarded-for') ?? request.headers.get('x-real-ip') ?? '127.0.0.1'
    const rateLimitResult = await checkRateLimit(ip)
    
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: 'Too many requests' },
        { status: 429 }
      )
    }

    if (request.nextUrl.pathname.startsWith('/api/protected')) {
      const token = await getToken({ req: request })
      
      if (!token) {
        return NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        )
      }
    }
    
    return NextResponse.next()
  },
  {
    pages: {
      signIn: "/login",
    },
  }
)

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/bookings/:path*",
  ],
}