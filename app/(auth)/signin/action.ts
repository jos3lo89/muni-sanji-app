"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export interface signinFormState {
  success: boolean;
  message: string;
}
export async function authenticate(
  prevState: signinFormState,
  formData: FormData,
): Promise<signinFormState> {
  try {
    await signIn("credentials", formData);

    return {
      success: true,
      message: "Sesión iniciada con éxito",
    };
  } catch (error: any) {
    if (
      error.type === "CredentialsSignin" ||
      error.digest?.startsWith("NEXT_REDIRECT")
    ) {
      throw error;
    }

    if (error instanceof AuthError) {
      const specificErrorMessage = error.cause?.err?.message;

      if (specificErrorMessage) {
        return {
          success: false,
          message: specificErrorMessage,
        };
      }
    }

    return {
      success: false,
      message: "Error al iniciar sesión33",
    };
  }
}
