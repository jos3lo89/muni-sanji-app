import { auth } from "@/auth";
import { NextAuthRequest } from "next-auth";
import { NextResponse } from "next/server";

const roleRoutes = {
  administrador: "/admin",
  mesa_de_partes: "/reception-desk",
  funcionario: "/manager",
};

// Rutas que no requieren autenticación.
const publicRoutes = ["/signin"];

export default auth((req: NextAuthRequest) => {
  const { nextUrl } = req;
  const userRole = req.auth?.user.role as keyof typeof roleRoutes | undefined;
  const isAuth = !!req.auth;
  const { pathname } = nextUrl;

  // Comprueba si la ruta actual es una de las protegidas.
  const isProtectedRoute = Object.values(roleRoutes).some((route) =>
    pathname.startsWith(route)
  );

  // CASO 1: Usuario no autenticado intenta acceder a una ruta protegida.
  // ------------------------------------------------------------------
  // Si no hay sesión y la ruta es protegida, redirige a signin.
  if (!isAuth && isProtectedRoute) {
    const newUrl = new URL("/signin", nextUrl.origin);
    return NextResponse.redirect(newUrl);
  }

  // CASO 2: Usuario autenticado.
  // ------------------------------------------------------------------
  if (isAuth && userRole) {
    const dashboardUrl = roleRoutes[userRole];

    // 2.1: Si intenta acceder a la página de signin, redirígelo a su dashboard.
    if (pathname === "/signin") {
      const newUrl = new URL(dashboardUrl, nextUrl.origin);
      return NextResponse.redirect(newUrl);
    }

    // 2.2: Si está en la raíz, redirígelo a su dashboard.
    if (pathname === "/") {
      const newUrl = new URL(dashboardUrl, nextUrl.origin);
      return NextResponse.redirect(newUrl);
    }

    // 2.3: Si es una ruta protegida pero no es la que le corresponde,
    //      redirígelo a su dashboard correcto.
    if (isProtectedRoute && !pathname.startsWith(dashboardUrl)) {
      const newUrl = new URL(dashboardUrl, nextUrl.origin);
      return NextResponse.redirect(newUrl);
    }
  }

  // Si ninguna de las condiciones anteriores se cumple, permite el acceso.
  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
