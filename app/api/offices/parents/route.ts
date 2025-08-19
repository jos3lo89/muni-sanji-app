import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const parentOffices = await prisma.office.findMany({
      where: {
        isMainOffice: true,
      },
      select: {
        id: true,
        name: true,
      },
    });
    return NextResponse.json(parentOffices);
  } catch (error) {
    console.log("Error en la acción GET de la ruta /offices/parents");
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
