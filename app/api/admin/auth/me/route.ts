import { NextResponse } from 'next/server';
import { isAuthenticatedAdmin } from '@/lib/adminAuth';

export async function GET(req: Request) {
  const isAuth = await isAuthenticatedAdmin(req);
  return NextResponse.json({
    authenticated: isAuth,
    user: isAuth ? 'aswith' : null,
  });
}
