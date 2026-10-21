import { NextRequest, NextResponse } from 'next/server';

export async function proxyToBackend(request: NextRequest) {
  try {
    const backendUrl = process.env.BACKEND_URL;

    if (!backendUrl) {
      throw new Error('BACKEND_URL is not configured');
    }

    const path = `${request.nextUrl.pathname}${request.nextUrl.search}`;
    const url = `${backendUrl.replace(/\/$/, '')}${path}`;

    const headers = new Headers();
    const cookie = request.headers.get('cookie');
    const contentType = request.headers.get('content-type');
    const authorization = request.headers.get('authorization');
    const accept = request.headers.get('accept');

    if (cookie) headers.set('Cookie', cookie);
    if (contentType) headers.set('Content-Type', contentType);
    if (authorization) headers.set('Authorization', authorization);
    if (accept) headers.set('Accept', accept);

    const method = request.method;
    const hasBody = method !== 'GET' && method !== 'HEAD';
    const body = hasBody ? await request.arrayBuffer() : undefined;

    const backendResponse = await fetch(url, {
      method,
      headers,
      body,
      cache: 'no-store',
      redirect: 'manual',
    });

    const responseHeaders = new Headers();
    const responseContentType = backendResponse.headers.get('content-type');

    if (responseContentType) {
      responseHeaders.set('Content-Type', responseContentType);
    }

    const response = new NextResponse(
      backendResponse.status === 204 || backendResponse.status === 304
        ? null
        : backendResponse.body,
      {
        status: backendResponse.status,
        headers: responseHeaders,
      },
    );
    for (const cookie of backendResponse.headers.getSetCookie()) {
      response.headers.append('Set-Cookie', cookie);
    }

    return response;
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Proxy error:', error);
    }

    return NextResponse.json(
      { message: 'Backend is unavailable' },
      { status: 503 },
    );
  }
}
