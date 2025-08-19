import z from "zod";

export const createFormSchema = z.object({
  name: z.string().min(3, {
    message: "El nombre debe tener al menos 3 caracteres.",
  }),
  acronym: z.string().optional(),
  parentOfficeId: z.uuid().optional().nullable(),
});

export type CreateOfficeFormValues = z.infer<typeof createFormSchema>;

export interface ParentOffices {
  id: string;
  name: string;
}

export const updateOfficeForm = z.object({
  name: z.string().min(3, {
    message: "El nombre debe tener al menos 3 caracteres.",
  }),
  acronym: z.string().optional().nullable(),
  parentOfficeId: z
    .uuid({ message: "Debe seleccionar una oficina válida." })
    .optional()
    .nullable(),
});

export type UpdateOfficeFormValues = z.infer<typeof updateOfficeForm>;

// API

export const officeSchemaApi = z.object({
  name: z.string().min(3, {
    message: "El nombre debe tener al menos 3 caracteres.",
  }),
  acronym: z.string(),
  parentOfficeId: z.uuid().nullable(),
  isMainOffice: z.boolean(),
});
