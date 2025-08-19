"use server";

import { signIn, signOut } from "@/auth";
import prisma from "@/lib/prisma";
import { hashPassword } from "@/utils/password";
import { UserRole } from "@prisma/client";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import z from "zod";

export const handleSignOut = async () => {
  await signOut();
  redirect("/");
};

interface SignUpValues {
  email: string;
  password: string;
  name: string;
  lastName: string;
  dni: string;
  role: UserRole;
  officeId: string;
}

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
});

export const authenticate = async (formData: FormData) => {
  try {
    const values = Object.fromEntries(formData);
    const result = loginSchema.safeParse(values);

    console.log("sigin action: ", result);

    if (!result.success) {
      throw new AuthError("faltan valors");
    }

    const { email, password } = result.data;

    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    // await new Promise((resolve) => setTimeout(resolve, 1500)); // Simular delay de red
  } catch (error) {
    console.log(error);
  }
};
