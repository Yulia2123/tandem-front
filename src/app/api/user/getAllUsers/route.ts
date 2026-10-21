import { NextRequest, NextResponse } from 'next/server';
import api, { ApiError } from '@/lib/api/api';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const page = Number(request.nextUrl.searchParams.get('page') ?? 1);
    const perPage = Number(request.nextUrl.searchParams.get('perPage') ?? 10);

    const res = await api('/users', {
      params: {
        page,
        perPage,
      },
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          (error as ApiError).response?.data?.error ??
          (error as ApiError).message,
      },
      { status: (error as ApiError).status },
    );
  }
}
