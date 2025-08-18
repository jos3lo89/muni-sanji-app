import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { OfficesActions } from "./components/offices-actions";

// Interfaz actualizada para incluir parentOfficeId
interface Office {
  id: string;
  name: string;
  acronym: string | null;
  isMainOffice: boolean;
  parentOffice: { name: string } | null;
  parentOfficeId: string | null; // AÑADIDO: Incluir esta propiedad
}

const getOffices = async (): Promise<Office[]> => {
  const res = await fetch("http://localhost:4000/api/v1/offices", {
    cache: "no-store",
  });
  if (!res.ok) {
    console.error("Failed to fetch offices");
    return [];
  }
  const offices = await res.json();
  return offices;
};

export default async function OfficesPage() {
  const offices = await getOffices();

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestión de Oficinas</h1>
        <Button asChild>
          <Link href="/admin/oficinas/crear">Crear Nueva Oficina</Link>
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Acrónimo</TableHead>
              <TableHead>Oficina Principal</TableHead>
              <TableHead>Oficina Padre</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {offices.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  No hay oficinas registradas.
                </TableCell>
              </TableRow>
            ) : (
              offices.map((office) => (
                <TableRow key={office.id}>
                  <TableCell className="font-medium">{office.name}</TableCell>
                  <TableCell>{office.acronym || "-"}</TableCell>
                  <TableCell>{office.isMainOffice ? "Sí" : "No"}</TableCell>
                  <TableCell>
                    {office.parentOffice ? office.parentOffice.name : "Ninguna"}
                  </TableCell>
                  <TableCell className="text-right">
                    <OfficesActions office={office} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
