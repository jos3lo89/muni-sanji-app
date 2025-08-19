"use server";

import prisma from "@/lib/prisma";
import { UserCreateSchema } from "@/schemas/user.schema";
import { hashPassword } from "@/utils/password";

export interface FormState {
  success: boolean;
  message: string;
}

export async function register(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    const validatedFields = UserCreateSchema.safeParse(
      Object.fromEntries(formData.entries())
    );

    if (!validatedFields.success) {
      return {
        success: false,
        message: "Los datos enviados no son válidos.",
      };
    }

    const { dni, email, name, lastName, password, role, officeId } =
      validatedFields.data;
    const passwordHash = await hashPassword(password);

    await prisma.user.create({
      data: {
        dni,
        email,
        name,
        username: `${dni}-${name}`,
        lastName,
        passwordHash,
        role,
        officeId,
      },
    });

    return { success: true, message: "¡Usuario registrado con éxito!" };
  } catch (error) {
    console.error(error);
    if (
      error instanceof Error &&
      "code" in error &&
      (error as any).code === "P2002"
    ) {
      return {
        success: false,
        message: "El DNI o el Email ya están registrados.",
      };
    }

    return {
      success: false,
      message: "Ocurrió un error en el servidor. Inténtalo de nuevo.",
    };
  }
}
