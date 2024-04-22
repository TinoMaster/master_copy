import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(request: NextRequestWithAuth) {
    console.log(request.nextauth?.token?.role);
    if (
      request.nextUrl.pathname === "/" &&
      request.nextauth?.token?.role !== "admin"
    ) {
      return NextResponse.rewrite(new URL("/dashboard/1", request.url));
    }
  },
  {
    pages: {
      signIn: "/login",
    },
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/dashboard/:path*"],
};
