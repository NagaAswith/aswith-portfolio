import { NextResponse } from 'next/server';

export type HttpStatusCode = 400 | 401 | 403 | 404 | 409 | 413 | 422 | 429 | 500;

export function apiErrorResponse(
  message: string,
  status: HttpStatusCode = 500,
  details?: unknown
): NextResponse {
  return NextResponse.json(
    {
      success: false,
      error: message,
      ...(details ? { details } : {}),
    },
    { status }
  );
}
