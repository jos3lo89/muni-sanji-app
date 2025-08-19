import { NextResponse } from "next/server";
import { auth } from "./auth";
import { UserRole } from "@prisma/client";

export default auth(async function middleware(req) {
  // const { nextUrl } = req;
  // const pathname = nextUrl.pathname;

  // const isLoggedIn = !!req.auth;
  // const rol = req.auth?.user?.role as UserRole;

  // const publicRoutes = ["/"];
  // const authRoutess = ["/signin"];
  // const adminRoutes = ["/admin", "/admin/office", "/admin/office/create"];
  // const mesaDePartesRoutes = ["/mesa-de-partes"];

  // const isPublicRoute = publicRoutes.includes(pathname);
  // const isAuthRoute = authRoutess.includes(pathname);
  // const isAdminRoute = adminRoutes.some((route) => pathname.startsWith(route));
  // const isMesaDePartesRoute = mesaDePartesRoutes.some((route) =>
  //   pathname.startsWith(route)
  // );

  // const route = rol === "administrador" ? "/admin" : "/mesa-de-partes";

  // if (isPublicRoute) {
  //   return NextResponse.next();
  // }

  // if (isAuthRoute) {
  //   if (isLoggedIn) {
  //     return NextResponse.redirect(new URL(route, req.url));
  //   }
  //   return NextResponse.next();
  // }

  // if (!isLoggedIn) {
  //   const redirectUrl = new URL("/signin", req.url);
  //   redirectUrl.searchParams.set("callbackUrl", pathname);
  //   return NextResponse.redirect(redirectUrl);
  // }

  // if (isAdminRoute && rol !== UserRole.administrador) {
  //   return NextResponse.redirect(new URL(route, req.url));
  // }

  // if (isMesaDePartesRoute && rol !== UserRole.mesa_de_partes) {
  //   return NextResponse.redirect(new URL(route, req.url));
  // }

  return NextResponse.next();
});

export const config = {
  matcher: ["/signin", "/admin/:path*"],
};
