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
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import UpdateUser from "./components/UpdateUser";
import ToggleUserStatus from "./components/ToggleUserStatus";

const UsersPage = async () => {
  const users = await prisma.user.findMany({
    include: {
      office: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="container mx-auto mb-20">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold">Gestión de Usuarios</h3>
        <Button asChild>
          <Link href="/admin/user/create">Crear Nuevo Usuario</Link>
        </Button>
      </div>
      <div className="w-full overflow-hidden grid grid-cols-1">
        <ScrollArea>
          <Table className="min-w-full table-auto mb-6">
            <TableHeader>
              <TableRow>
                <TableHead className="font-semibold">#</TableHead>
                <TableHead className="font-semibold">Nombre Completo</TableHead>
                <TableHead className="font-semibold">DNI</TableHead>
                <TableHead className="font-semibold">Email</TableHead>
                <TableHead className="font-semibold">Rol</TableHead>
                <TableHead className="font-semibold">Oficina</TableHead>
                <TableHead className="font-semibold">Estado</TableHead>
                <TableHead className="font-semibold">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center">
                    No hay usuarios registrados.
                  </TableCell>
                </TableRow>
              ) : (
                users.map((user, index) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell className="font-medium">
                      {user.name} {user.lastName}
                    </TableCell>
                    <TableCell>{user.dni}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge>{user.role}</Badge>
                    </TableCell>
                    <TableCell>{user.office.name}</TableCell>
                    <TableCell>
                      {user.isActive ? (
                        <Badge variant="default">Activo</Badge>
                      ) : (
                        <Badge variant="destructive">Inactivo</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right flex items-center gap-2">
                      <UpdateUser user={user} />
                      <ToggleUserStatus user={user} />
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

export default UsersPage;
