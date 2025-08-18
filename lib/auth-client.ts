import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  // La URL base de nuestro servidor NestJS
  baseURL: "http://localhost:4000/api",
  // baseURL: "/api/auth",
});

// Opcionalmente, exportar métodos específicos para facilitar su uso
export const { signIn, signUp, signOut, useSession } = authClient;
