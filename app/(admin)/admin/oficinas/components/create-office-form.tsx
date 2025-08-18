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

type CreateOfficeFormValues = z.infer<typeof formSchema>;

interface Office {
  id: string;
  name: string;
}

export const CreateOfficeForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [offices, setOffices] = useState<Office[]>([]);
  const [belongsToOffice, setBelongsToOffice] = useState(false);

  const form = useForm<CreateOfficeFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      acronym: "",
      parentOfficeId: null,
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

  const onSubmit = async (values: CreateOfficeFormValues) => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:4000/api/v1/offices", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          isMainOffice: !belongsToOffice,
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to create office");
      }

      toast.success("Oficina creada correctamente.", {
        description: "Se ha creado una nueva oficina con éxito.",
      });
      router.push("/admin/oficinas");
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
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Crear Nueva Oficina</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
            <FormLabel>¿Pertenece a una oficina?</FormLabel>
            <FormControl>
              <Switch
                checked={belongsToOffice}
                onCheckedChange={(checked) => {
                  setBelongsToOffice(checked);
                  form.setValue("parentOfficeId", null);
                }}
              />
            </FormControl>
          </FormItem>

          {belongsToOffice && (
            <FormField
              control={form.control}
              name="parentOfficeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Oficina que pertenece</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(value)}
                    defaultValue={field.value || ""}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona una oficina padre" />
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

          <Button disabled={loading} type="submit">
            {loading ? "Cargando..." : "Agregar"}
          </Button>
        </form>
      </Form>
    </div>
  );
};
