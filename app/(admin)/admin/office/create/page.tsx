"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
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
import {
  createFormSchema,
  CreateOfficeFormValues,
  ParentOffices,
} from "@/schemas/offices.schema";

const CreateOffice = () => {
  const router = useRouter();
  const [offices, setOffices] = useState<ParentOffices[]>([]);
  const [belongsToOffice, setBelongsToOffice] = useState(false);
  const [isLoadingOffices, setIsLoadingOffices] = useState(false);

  const form = useForm<CreateOfficeFormValues>({
    resolver: zodResolver(createFormSchema),
    defaultValues: {
      name: "",
      acronym: "",
      parentOfficeId: null,
    },
  });

  const fetchOffices = async () => {
    setIsLoadingOffices(true);
    try {
      const res = await fetch("/api/offices/parents");
      if (!res.ok) {
        throw new Error("Failed to fetch offices");
      }
      const data = await res.json();
      console.log(data);

      setOffices(data);
    } catch (error) {
      toast.error("Hubo un error al cargar las oficinas.");
      console.error("Error fetching offices:", error);
    } finally {
      setIsLoadingOffices(false);
    }
  };

  const handleSwitchChange = (checked: boolean) => {
    setBelongsToOffice(checked);
    if (checked) {
      if (offices.length === 0) {
        fetchOffices();
      }
    } else {
      form.setValue("parentOfficeId", null);
    }
  };

  const onSubmit = async (values: CreateOfficeFormValues) => {
    try {
      const data = {
        ...values,
        isMainOffice: !belongsToOffice,
        parentOfficeId: belongsToOffice ? values.parentOfficeId : null,
      };
      console.log(data);

      const res = await fetch("/api/offices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to create office");
      toast.success("Oficina creada correctamente.");
      router.push("/admin/office");
    } catch (error) {
      console.log(error);
      if (error instanceof Error) toast.error(error.message);
      else toast.error("Hubo un error al procesar la solicitud.");
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Crear Nueva Oficina</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <FormLabel>¿Es una Sub-Oficina?</FormLabel>
              <p className="text-sm text-muted-foreground">
                Activa esto si la nueva oficina depende de otra ya existente.
              </p>
            </div>
            <FormControl>
              <Switch
                checked={belongsToOffice}
                onCheckedChange={handleSwitchChange}
              />
            </FormControl>
          </FormItem>

          {belongsToOffice && (
            <FormField
              control={form.control}
              name="parentOfficeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Oficina Principal a la que pertenece</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value || ""}
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

          <Button disabled={form.formState.isSubmitting} type="submit">
            {form.formState.isSubmitting ? "Guardando..." : "Crear Oficina"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateOffice;
