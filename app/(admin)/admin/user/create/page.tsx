import prisma from "@/lib/prisma";
import { CreateUserForm } from "../components/CreateUserForm";

const CreateUserPage = async () => {
  try {
    const offices = await prisma.office.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    return <CreateUserForm offices={offices} />;
  } catch (error) {
    console.error("Failed to fetch offices:", error);
    return (
      <div className="flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-destructive">
            Error al cargar los datos
          </h2>
          <p className="text-muted-foreground">
            No se pudieron obtener las oficinas. Por favor, intente recargar la
            página.
          </p>
        </div>
      </div>
    );
  }
};

export default CreateUserPage;
