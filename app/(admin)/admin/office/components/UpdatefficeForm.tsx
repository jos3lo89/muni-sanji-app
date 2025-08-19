"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { OfficeWithRelations } from "@/interfaces/offices.interface";
import { Office } from "@prisma/client";
import {
  updateOfficeForm,
  UpdateOfficeFormValues,
} from "@/schemas/offices.schema";

interface UpdateOfficeFormProps {
  initialData: OfficeWithRelations;
  setOpen: (open: boolean) => void;
}

export const UpdateOfficeForm = ({
  initialData,
  setOpen,
}: UpdateOfficeFormProps) => {
  const router = useRouter();
  const [offices, setOffices] = useState<Office[]>([]);
  const [isLoadingOffices, setIsLoadingOffices] = useState(false);
  const [isSubOffice, setIsSubOffice] = useState(!!initialData.parentOfficeId);

  const form = useForm<UpdateOfficeFormValues>({
    resolver: zodResolver(updateOfficeForm),
    defaultValues: {
      name: initialData.name,
      acronym: initialData.acronym || "",
      parentOfficeId: initialData.parentOfficeId || null,
    },
  });

  const fetchParentOffices = async () => {
    setIsLoadingOffices(true);
    try {
      const res = await fetch("/api/offices/parents");
      if (!res.ok) throw new Error("Failed to fetch parent offices");
      const data = await res.json();
      setOffices(data.filter((o: Office) => o.id !== initialData.id));
    } catch (error) {
      toast.error("Hubo un error al cargar las oficinas principales.");
    } finally {
      setIsLoadingOffices(false);
    }
  };

  useEffect(() => {
    if (isSubOffice) {
      fetchParentOffices();
    }
  }, [isSubOffice]);

  const handleSwitchChange = (checked: boolean) => {
    setIsSubOffice(checked);
    if (checked && offices.length === 0) {
      fetchParentOffices();
    } else if (!checked) {
      form.setValue("parentOfficeId", null);
    }
  };

  const onSubmit = async (values: UpdateOfficeFormValues) => {
    try {
      const payload = {
        ...values,
        isMainOffice: !isSubOffice,
        parentOfficeId: isSubOffice ? values.parentOfficeId : null,
      };

      // Validamos que si es una sub-oficina, haya seleccionado un padre
      if (isSubOffice && !payload.parentOfficeId) {
        form.setError("parentOfficeId", {
          type: "manual",
          message: "Debe seleccionar una oficina principal.",
        });
        return;
      }

      const res = await fetch(`/api/offices/${initialData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to update office");
      }

      toast.success("Oficina actualizada correctamente.");
      setOpen(false);
      router.refresh();
    } catch (error: any) {
      toast.error(error.message || "Hubo un error al procesar la solicitud.");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
          <div className="space-y-0.5">
            <FormLabel>¿Es una Sub-Oficina?</FormLabel>
            <p className="text-sm text-muted-foreground">
              Activa esto si la oficina depende de otra.
            </p>
          </div>
          <FormControl>
            <Switch
              checked={isSubOffice}
              onCheckedChange={handleSwitchChange}
            />
          </FormControl>
        </FormItem>

        {isSubOffice && (
          <FormField
            control={form.control}
            name="parentOfficeId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Oficina Principal a la que pertenece</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value || ""}
                  disabled={isLoadingOffices}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona una oficina principal" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {offices.map((office) => (
                      <SelectItem key={office.id} value={office.id}>
                        {office.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre de la Oficina</FormLabel>
              <FormControl>
                <Input
                  placeholder="Ej: Gerencia de Desarrollo Urbano"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="acronym"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Acrónimo (Opcional)</FormLabel>
              <FormControl>
                <Input
                  placeholder="Ej: GDU"
                  {...field}
                  value={field.value || ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2">
          <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
          <Button disabled={form.formState.isSubmitting} type="submit">
            {form.formState.isSubmitting ? "Guardando..." : "Guardar Cambios"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
