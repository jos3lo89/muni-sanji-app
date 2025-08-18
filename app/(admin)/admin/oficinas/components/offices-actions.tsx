"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { EditOfficeForm } from "../components/edit-office-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";

interface Office {
  id: string;
  name: string;
  acronym: string | null;
  isMainOffice: boolean;
  parentOfficeId: string | null;
}

export function OfficesActions({ office }: { office: Office }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Oficina</DialogTitle>
        </DialogHeader>
        <EditOfficeForm initialData={office} setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}
