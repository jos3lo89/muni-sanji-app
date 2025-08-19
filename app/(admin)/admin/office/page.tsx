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
import prisma from "@/lib/prisma";
import { Badge } from "@/components/ui/badge";
import DeleteOffice from "./components/DeleteOffice";
import UpdateOffice from "./components/UpdateOffice";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const OfficesPage = async () => {
  const offices = await prisma.office.findMany({
    include: {
      subOffices: true,
      parentOffice: true,
    },
  });

  return (
    <div className="container mx-auto mb-20">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">Gestión de Oficinas</h1>
        <Button asChild>
          <Link href="/admin/office/create">Crear Nueva Oficina</Link>
        </Button>
      </div>
      <div className="w-full overflow-hidden grid grid-cols-1">
        <ScrollArea>
          <Table className="min-w-full table-auto mb-6">
            <TableHeader>
              <TableRow>
                <TableHead className="font-semibold">#</TableHead>
                <TableHead className="font-semibold">Nombre</TableHead>
                <TableHead className="font-semibold">Acrónimo</TableHead>
                <TableHead className="font-semibold">
                  Oficina Principal
                </TableHead>
                <TableHead className="font-semibold">Oficina Padre</TableHead>
                <TableHead className="font-semibold">Acciones</TableHead>
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
                offices.map((office, index) => (
                  <TableRow key={office.id}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell className="font-medium">{office.name}</TableCell>
                    <TableCell>{office.acronym || "-"}</TableCell>
                    <TableCell>
                      {office.isMainOffice ? (
                        <Badge variant="default">Sí</Badge>
                      ) : (
                        <Badge variant="destructive">No</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      {office.parentOffice ? (
                        office.parentOffice.name
                      ) : (
                        <span className="text-red-400">Ninguna</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <UpdateOffice office={office} />
                      <DeleteOffice officeId={office.id} />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
};
export default OfficesPage;
