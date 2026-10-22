import { NextResponse } from 'next/server';
import axios from 'axios';
import { cookies } from 'next/headers';

export async function POST() {
  const cookieStore = await cookies();
  const backendUrl = process.env.BACKEND_URL;

  if (!backendUrl) {
    return NextResponse.json(
      { error: 'Backend URL is not configured' },
      { status: 500 },
    );
  }

  const authCookies = ['sessionId', 'accessToken', 'refreshToken'];

  const cookieHeader = authCookies
    .map((name) => {
      const value = cookieStore.get(name)?.value;
      return value ? `${name}=${value}` : null;
    })
    .filter(Boolean)
    .join('; ');

  try {
    await axios.post(
      `${backendUrl}/api/auth/logout`,
      {},
      { headers: { Cookie: cookieHeader } },
    );

    for (const name of authCookies) {
      cookieStore.delete(name);
    }

    return new NextResponse(null, { status: 204 });
  } catch {
    return NextResponse.json({ error: 'Failed to log out' }, { status: 500 });
  }
}
