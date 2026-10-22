import { NextResponse } from 'next/server';
import api, { ApiError } from '@/lib/api/api';
import { cookies } from 'next/headers';

type Props = {
  params: Promise<{ id: string }>;
};

export async function GET(request: Request, { params }: Props) {
  try {
    const cookieStore = await cookies();
    const { id } = await params;
    const res = await api(`/stories/${id}`, {
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

export async function POST(request: Request, { params }: Props) {
  try {
    const cookieStore = await cookies();
    const { id } = await params;

    const res = await api.post(`/users/me/saved-stories/${id}`, {}, {
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

export async function DELETE(request: Request, { params }: Props) {
    try {
      const cookieStore = await cookies();
      const { id } = await params;

      const res = await api.delete(`/users/me/saved-stories/${id}`, {
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

