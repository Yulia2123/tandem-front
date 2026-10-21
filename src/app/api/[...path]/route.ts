import { NextRequest } from 'next/server';
import { proxyToBackend } from '@/lib/proxy';

export const dynamic = 'force-dynamic';

export const GET = (request: NextRequest) => proxyToBackend(request);

export const POST = (request: NextRequest) => proxyToBackend(request);

export const PUT = (request: NextRequest) => proxyToBackend(request);

export const PATCH = (request: NextRequest) => proxyToBackend(request);

export const DELETE = (request: NextRequest) => proxyToBackend(request);
