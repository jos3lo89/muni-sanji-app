import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { verifyPassword } from "./lib/bcryptjs";
import { UserRole } from "@prisma/client";
import prisma from "./lib/prisma";
import { signInSchema } from "./schemas/auth.schema";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {
          type: "email",
          label: "Email",
          placeholder: "johndoe@gmail.com",
        },
        password: {
          type: "password",
          label: "Password",
          placeholder: "*****",
        },
      },
      authorize: async (credentials) => {
        const result = signInSchema.safeParse(credentials);

        if (!result.success) {
          throw new Error("datos invalidos");
        }

        const { email, password } = result.data;

        const user = await prisma.user.findFirst({
          where: {
            email,
          },
        });

        if (!user) {
          throw new Error("Usuario no econtrado");
        }

        const pwdIsMatch = await verifyPassword({
          hash: user.passwordHash,
          password,
        });

        if (!pwdIsMatch) {
          throw new Error("Constrania o correo invalidos");
        }

        return {
          id: user.id,
          name: `${user.name} ${user.lastName}`,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    session({ session, token, user }) {
      if (session.user) {
        session.user.id = token.sub as string;
        session.user.role = token.role as UserRole;
      }
      return session;
    },
    jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
  },
  pages: {
    signIn: "/signin",
  },
});
