"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { UserWithOffice } from "@/interfaces/users.interface";
import { UpdateUserForm } from "./UpdateUserForm";

type UpdateUserProps = {
  user: UserWithOffice;
};

const UpdateUser = ({ user }: UpdateUserProps) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  return (
    <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" aria-label="Editar">
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Usuario</DialogTitle>
          <DialogDescription>
            Actualiza la información del usuario.
          </DialogDescription>
        </DialogHeader>
        <UpdateUserForm initialData={user} setOpen={setIsEditModalOpen} />
      </DialogContent>
    </Dialog>
  );
};
export default UpdateUser;
