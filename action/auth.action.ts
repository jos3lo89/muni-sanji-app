"use server";

import { signIn, signOut } from "@/auth";
import prisma from "@/lib/prisma";
import { hashPassword } from "@/utils/password";
import { UserRole } from "@prisma/client";
import { redirect } from "next/navigation";

export const login = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  try {
    await signIn("credentials", {
      email,
      password,
    });
  } catch (error) {
    console.log(error);
  }
};

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

export const register = async (formData: FormData) => {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const name = formData.get("name") as string;
    const lastName = formData.get("lastName") as string;
    const dni = formData.get("dni") as string;
    const role = formData.get("role") as string;
    const officeId = formData.get("officeId") as string;

    const passwordHash = await hashPassword(password);
    const newUser = await prisma.user.create({
      data: {
        dni,
        email,
        name,
        username: `${dni}-${name}`,
        lastName,
        passwordHash: passwordHash,
        role: UserRole.administrador,
        officeId: "werqewrdsfxsfeqw",
      },
    });

    console.log("Registered user:", newUser);

    // redirect("/");
  } catch (error) {
    console.log(error);
  }
};
