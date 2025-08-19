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
import { UpdateOfficeForm } from "./UpdatefficeForm";
import { OfficeWithRelations } from "@/interfaces/offices.interface";

type UpdateOfficeProps = {
  office: OfficeWithRelations;
};

const UpdateOffice = ({ office }: UpdateOfficeProps) => {
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
          <DialogTitle>Editar Oficina</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <UpdateOfficeForm initialData={office} setOpen={setIsEditModalOpen} />
      </DialogContent>
    </Dialog>
  );
};
export default UpdateOffice;
