import prisma from "@/lib/prisma";
import { officeSchemaApi } from "@/schemas/offices.schema";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const offices = await prisma.office.findMany({
      include: {
        subOffices: true,
        parentOffice: true,
      },
    });
    return NextResponse.json(offices);
  } catch (error) {
    console.log("Error en la acción GET de la ruta /offices");
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();

    const result = officeSchemaApi.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ messag: "Faltan valores" }, { status: 400 });
    }

    console.log("result", result);
    const newOffice = await prisma.office.create({
      data: result.data,
    });

    console.log("newOffice", newOffice);

    return NextResponse.json(newOffice, { status: 201 });
  } catch (error) {
    console.log("Error en la acción POST de la ruta /offices");
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
