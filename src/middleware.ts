import { NextRequest, NextResponse } from "next/server";

const privateRoutes = ["/profile"];
const publicRoutes = ["/auth/login", "/auth/register"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route));
  const isPrivateRoute = privateRoutes.some((route) => pathname.startsWith(route));

  if (!accessToken) {
    if (refreshToken) {
      try {
        const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";
        
        const response = await fetch(`${backendUrl}/auth/refresh`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Cookie: request.headers.get("cookie") || "",
          },
          cache: "no-store",
        });

        if (response.ok) {
          const setCookieHeaders = response.headers.getSetCookie();

          const res = isPublicRoute
            ? NextResponse.redirect(new URL("/", request.url))
            : NextResponse.next();

          for (const cookieStr of setCookieHeaders) {
            res.headers.append("Set-Cookie", cookieStr);
          }

          return res;
        }
      } catch (error) {
        console.log('something bad', error)
      }
    }

    if (isPrivateRoute) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    if (isPublicRoute) {
      return NextResponse.next();
    }
  }

  if (isPublicRoute && accessToken) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (isPrivateRoute) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/auth/login", "/auth/register"],
};