import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

function secureCompare(a: string, b: string): boolean {
  if (a.length !== b.length) {
    return false;
  }

  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }

  return result === 0;
}

export function middleware(request: NextRequest) {
  const authHeader = request.headers.get('authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return new NextResponse(
      JSON.stringify({
        success: false,
        message: 'Authorization header missing or invalid',
      }),
      { status: 401, headers: { 'content-type': 'application/json' } }
    );
  }

  const requestToken = authHeader.split(' ')[1];
  const storedToken = process.env.SERVER_API_TOKEN;

  if (!requestToken || !storedToken) {
    return new NextResponse(
      JSON.stringify({ success: false, message: 'Token missing' }),
      {
        status: 401,
        headers: { 'content-type': 'application/json' },
      }
    );
  }

  try {
    const safeCompare = secureCompare(requestToken.trim(), storedToken.trim());

    if (!safeCompare) {
      throw new Error('Invalid token');
    }

    return NextResponse.next();
  } catch {
    return new NextResponse(
      JSON.stringify({ success: false, message: 'Invalid token' }),
      {
        status: 401,
        headers: { 'content-type': 'application/json' },
      }
    );
  }
}

export const config = {
  matcher: '/api/:path*',
};
