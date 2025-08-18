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
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

// Esquema de validación para el formulario
const formSchema = z.object({
  name: z.string().min(3, {
    message: "El nombre debe tener al menos 3 caracteres.",
  }),
  acronym: z.string().optional().nullable(),
  parentOfficeId: z.string().uuid().optional().nullable(),
});

type EditOfficeFormValues = z.infer<typeof formSchema>;

interface Office {
  id: string;
  name: string;
  acronym: string | null;
  isMainOffice: boolean;
  parentOfficeId: string | null;
}

interface EditOfficeFormProps {
  initialData: Office;
  setOpen: (open: boolean) => void;
}

export const EditOfficeForm = ({
  initialData,
  setOpen,
}: EditOfficeFormProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [offices, setOffices] = useState<Office[]>([]);

  const form = useForm<EditOfficeFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData.name,
      acronym: initialData.acronym || "",
      parentOfficeId: initialData.parentOfficeId || null,
    },
  });

  useEffect(() => {
    const fetchOffices = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/v1/offices");
        const data = await res.json();
        setOffices(data);
      } catch (error) {
        console.error("Error fetching offices:", error);
      }
    };
    fetchOffices();
  }, []);

  const onSubmit = async (values: EditOfficeFormValues) => {
    try {
      setLoading(true);
      const res = await fetch(
        `http://localhost:4000/api/v1/offices/${initialData.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to update office");
      }

      toast.success("Oficina actualizada correctamente.", {
        description: "Los datos de la oficina se han guardado con éxito.",
      });
      setOpen(false);
      router.refresh();
    } catch (error: any) {
      toast.error("Hubo un error al procesar la solicitud.", {
        description:
          error.message || "Verifica la información e intenta de nuevo.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre de Oficina</FormLabel>
              <FormControl>
                <Input placeholder="Nombre de la oficina" {...field} />
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
              <FormLabel>Acrónimo</FormLabel>
              <FormControl>
                <Input
                  placeholder="Acrónimo (ej. GDU)"
                  {...field}
                  value={field.value || ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="parentOfficeId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Oficina Padre</FormLabel>
              <Select
                onValueChange={(value) => field.onChange(value)}
                value={field.value || ""}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una oficina padre" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="null">Ninguna</SelectItem>{" "}
                  {/* FIXED: Change value="" to value="null" */}
                  {offices
                    .filter((o) => o.id !== initialData.id)
                    .map((office) => (
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

        <Button disabled={loading} type="submit">
          {loading ? "Cargando..." : "Guardar Cambios"}
        </Button>
      </form>
    </Form>
  );
};
