import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (
  req: NextRequest,
  { params }: { params: Promise<{ officeId: string }> }
) => {
  try {
    const { officeId } = await params;

    await prisma.office.delete({
      where: {
        id: officeId,
      },
    });

    return NextResponse.json({ message: "Office deleted successfully." });
  } catch (error) {
    console.log("Error en la acción DELETE de la ruta /offices");
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};

export const PUT = async (
  req: NextRequest,
  { params }: { params: Promise<{ officeId: string }> }
) => {
  try {
    const body = await req.json();
    const { officeId } = await params;

    await prisma.office.update({
      where: {
        id: officeId,
      },
      data: body,
    });

    return NextResponse.json({ message: "Office updated successfully." });
  } catch (error) {
    console.log("Error en la acción PUT de la ruta /offices");
    return NextResponse.json(
      { error: "No se pudo actualizar el oficina." },
      { status: 500 }
    );
  }
};
