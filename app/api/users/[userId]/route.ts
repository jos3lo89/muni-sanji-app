import prisma from "@/lib/prisma";
import { UpdateUserSchema } from "@/schemas/user.schema";
import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params;
    const body = await request.json();
    const validatedFields = UpdateUserSchema.safeParse(body);

    if (!validatedFields.success) {
      return NextResponse.json(
        {
          message: "Datos de usuario no válidos.",
          errors: validatedFields.error.issues.map((issue) => issue.message),
        },
        { status: 400 }
      );
    }

    const { email, name, lastName, role, officeId } = validatedFields.data;

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        email,
        name,
        lastName,
        role,
        officeId,
      },
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { message: "Error al actualizar el usuario." },
      { status: 500 }
    );
  }
}
