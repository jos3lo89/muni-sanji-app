import { UserRole } from "@prisma/client";
import z from "zod";

export const UserCreateSchema = z.object({
  email: z.email("Email inválido."),
  name: z.string(),
  lastName: z.string(),
  password: z
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres."),
  dni: z.string().regex(/^\d{8}$/, "El DNI debe tener 8 dígitos."),
  role: z.enum(UserRole),
  officeId: z.uuid("Oficina inválida."),
});

export const UpdateUserSchema = z.object({
  email: z.string().email("Email inválido."),
  name: z.string().min(1, "El nombre no puede estar vacío."),
  lastName: z.string().min(1, "El apellido no puede estar vacío."),
  role: z.nativeEnum(UserRole),
  officeId: z.string().uuid("Oficina inválida."),
});

export type UpdateUserFormValues = z.infer<typeof UpdateUserSchema>;
