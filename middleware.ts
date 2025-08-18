import { NextResponse } from "next/server";
import { auth } from "./auth";

export default auth(async function middleware(req) {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  if (!isLoggedIn) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (nextUrl.pathname.startsWith("/login") && isLoggedIn) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/login", "/private/:path*", "/inscription-state/:path*"],
};
