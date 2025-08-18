"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { EditOfficeForm } from "./edit-office-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface Office {
  id: string;
  name: string;
  acronym: string | null;
  isMainOffice: boolean;
  parentOfficeId: string | null;
}

export function OfficesActions({ office }: { office: Office }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // Nuevo estado para el modal de eliminación
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const res = await fetch(
        `http://localhost:4000/api/v1/offices/${office.id}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to delete office");
      }

      toast.success("Oficina eliminada correctamente.", {
        description: `La oficina "${office.name}" ha sido eliminada.`,
      });
      setIsDeleteModalOpen(false); // Cierra el modal de confirmación
      router.refresh(); // Refresca la página
    } catch (error: any) {
      toast.error("Error al eliminar la oficina.", {
        description:
          error.message || "Verifica si tiene suboficinas asociadas.",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      {/* Diálogo para Editar */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost" size="sm" aria-label="Editar">
            <Pencil className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Oficina</DialogTitle>
          </DialogHeader>
          <EditOfficeForm initialData={office} setOpen={setIsEditModalOpen} />
        </DialogContent>
      </Dialog>

      {/* Diálogo para Eliminar */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost" size="sm" aria-label="Eliminar">
            <Trash2 className="h-4 w-4 text-red-500" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirmar Eliminación</DialogTitle>
            <DialogDescription>
              Esta acción no se puede deshacer. ¿Estás seguro de que deseas
              eliminar la oficina {office.name}?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteModalOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? "Eliminando..." : "Eliminar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
