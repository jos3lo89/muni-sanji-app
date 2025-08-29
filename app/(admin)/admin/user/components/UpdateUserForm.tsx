"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { UserWithOffice } from "@/interfaces/users.interface";
import { Office, UserRole } from "@prisma/client";
import { UpdateUserFormValues, UpdateUserSchema } from "@/schemas/user.schema";

interface UpdateUserFormProps {
  initialData: UserWithOffice;
  setOpen: (open: boolean) => void;
}

export const UpdateUserForm = ({
  initialData,
  setOpen,
}: UpdateUserFormProps) => {
  const router = useRouter();
  const [offices, setOffices] = useState<Office[]>([]);
  const [isLoadingOffices, setIsLoadingOffices] = useState(false);

  const form = useForm<UpdateUserFormValues>({
    resolver: zodResolver(UpdateUserSchema),
    defaultValues: {
      email: initialData.email,
      name: initialData.name,
      lastName: initialData.lastName,
      role: initialData.role,
      officeId: initialData.officeId,
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
      setOffices(data);
    } catch (error) {
      toast.error("Hubo un error al cargar las oficinas.");
      console.error("Error fetching offices:", error);
    } finally {
      setIsLoadingOffices(false);
    }
  };

  useEffect(() => {
    fetchOffices();
  }, []);

  const onSubmit = async (values: UpdateUserFormValues) => {
    try {
      const res = await fetch(`/api/users/${initialData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to update user");
      }

      toast.success("Usuario actualizado correctamente.");
      setOpen(false);
      router.refresh();
    } catch (error: any) {
      toast.error(error.message || "Hubo un error al procesar la solicitud.");
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
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input placeholder="Nombre" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Apellido</FormLabel>
              <FormControl>
                <Input placeholder="Apellido" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="email@ejemplo.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rol</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un rol" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.values(UserRole).map((role) => (
                    <SelectItem key={role} value={role}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="officeId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Oficina</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={isLoadingOffices}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una oficina" />
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
