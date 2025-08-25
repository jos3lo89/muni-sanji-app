"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

type DeleteOfficeProps = {
  officeId: string;
};

const DeleteOffice = ({ officeId }: DeleteOfficeProps) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [isDeleting, setIsDeleting] = useState(false);

  const router = useRouter();
  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      const res = await fetch(`/api/offices/${officeId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete office");
      }

      toast.success("Oficina eliminada correctamente.");
      setIsDeleteModalOpen(false);
      router.refresh();
    } catch (error) {
      console.log(error);
      if (error instanceof Error) toast.error(error.message);
      else toast.error("Hubo un error al procesar la solicitud.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
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
            eliminar la oficina?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
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
  );
};
export default DeleteOffice;
