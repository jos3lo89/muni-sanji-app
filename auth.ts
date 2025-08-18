import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { comparePassword } from "./utils/password";
import z from "zod";
import prisma from "./lib/prisma";

const credentialsSchema = z.object({
  email: z.email(),
  password: z.string(),
});

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
        const result = credentialsSchema.safeParse(credentials);

        if (!result.success) {
          throw new Error("Invalid credentials");
        }

        const { email, password } = result.data;

        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        });

        if (!user) {
          throw new Error("Invalid credentials.");
        }

        const isPasswordCorrect = await comparePassword(
          password,
          user.passwordHash
        );

        if (!isPasswordCorrect) {
          throw new Error("Password or email is incorrect.");
        }

        return user;
      },
    }),
  ],
});
