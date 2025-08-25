"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload, User, Building, FileText, Send } from "lucide-react";

const documentSchema = z
  .object({
    tipoPersona: z.enum(["natural", "juridica"]),
    nombres: z.string().optional(),
    apellidoPaterno: z.string().optional(),
    apellidoMaterno: z.string().optional(),
    dni: z.string().optional(),
    razonSocial: z.string().optional(),
    ruc: z.string().optional(),
    representanteLegal: z.string().optional(),
    telefono: z.string().min(9, "El teléfono debe tener al menos 9 dígitos"),
    email: z.email("Ingrese un email válido"),
    direccion: z
      .string()
      .min(10, "La dirección debe tener al menos 10 caracteres"),
    tipoDocumento: z.string().min(1, "Seleccione el tipo de documento"),
    asunto: z.string().min(10, "El asunto debe tener al menos 10 caracteres"),
    descripcion: z
      .string()
      .min(20, "La descripción debe tener al menos 20 caracteres"),
    archivos: z.any().optional(),
    terminosCondiciones: z.boolean().refine((val) => val === true, {
      message: "Debe aceptar los términos y condiciones",
    }),
  })
  .refine(
    (data) => {
      if (data.tipoPersona === "natural") {
        return (
          data.nombres &&
          data.apellidoPaterno &&
          data.apellidoMaterno &&
          data.dni
        );
      } else {
        return data.razonSocial && data.ruc && data.representanteLegal;
      }
    },
    {
      message: "Complete todos los campos requeridos según el tipo de persona",
      path: ["tipoPersona"],
    }
  );

type DocumentFormData = z.infer<typeof documentSchema>;

const DocumentSubmissionForm = () => {
  const [tipoPersona, setTipoPersona] = useState<"natural" | "juridica">(
    "natural"
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<DocumentFormData>({
    resolver: zodResolver(documentSchema),
    defaultValues: {
      tipoPersona: "natural",
      terminosCondiciones: false,
    },
  });

  const onSubmit = async (data: DocumentFormData) => {
    setIsSubmitting(true);

    console.log("=== DATOS DEL FORMULARIO ===");
    console.log("Tipo de Persona:", data.tipoPersona);

    if (data.tipoPersona === "natural") {
      console.log("--- PERSONA NATURAL ---");
      console.log("Nombres:", data.nombres);
      console.log("Apellido Paterno:", data.apellidoPaterno);
      console.log("Apellido Materno:", data.apellidoMaterno);
      console.log("DNI:", data.dni);
    } else {
      console.log("--- PERSONA JURÍDICA ---");
      console.log("Razón Social:", data.razonSocial);
      console.log("RUC:", data.ruc);
      console.log("Representante Legal:", data.representanteLegal);
    }

    console.log("--- DATOS DE CONTACTO ---");
    console.log("Teléfono:", data.telefono);
    console.log("Email:", data.email);
    console.log("Dirección:", data.direccion);

    console.log("--- DOCUMENTO ---");
    console.log("Tipo de Documento:", data.tipoDocumento);
    console.log("Asunto:", data.asunto);
    console.log("Descripción:", data.descripcion);
    console.log("Términos Aceptados:", data.terminosCondiciones);

    console.log("=== FIN DATOS ===");

    setTimeout(() => {
      setIsSubmitting(false);
      alert(
        "Documento enviado correctamente. Revise la consola para ver los datos."
      );
    }, 2000);
  };

  return (
    <div className="bg-white py-12">
      <div className="container mx-auto px-4">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <FileText className="h-6 w-6 mr-2 text-blue-600" />
              Formulario de Envío de Documentos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              <div className="space-y-4">
                <Label className="text-base font-semibold">
                  Tipo de Persona *
                </Label>
                <RadioGroup
                  value={tipoPersona}
                  onValueChange={(value: "natural" | "juridica") => {
                    setTipoPersona(value);
                    setValue("tipoPersona", value);
                  }}
                  className="flex space-x-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="natural" id="natural" />
                    <Label
                      htmlFor="natural"
                      className="flex items-center cursor-pointer"
                    >
                      <User className="h-4 w-4 mr-1" />
                      Persona Natural
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="juridica" id="juridica" />
                    <Label
                      htmlFor="juridica"
                      className="flex items-center cursor-pointer"
                    >
                      <Building className="h-4 w-4 mr-1" />
                      Persona Jurídica
                    </Label>
                  </div>
                </RadioGroup>
                {errors.tipoPersona && (
                  <p className="text-sm text-red-600">
                    {errors.tipoPersona.message}
                  </p>
                )}
              </div>

              {tipoPersona === "natural" ? (
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="nombres">Nombres *</Label>
                    <Input
                      id="nombres"
                      {...register("nombres")}
                      placeholder="Ingrese sus nombres"
                    />
                    {errors.nombres && (
                      <p className="text-sm text-red-600">
                        {errors.nombres.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="apellidoPaterno">Apellido Paterno *</Label>
                    <Input
                      id="apellidoPaterno"
                      {...register("apellidoPaterno")}
                      placeholder="Apellido paterno"
                    />
                    {errors.apellidoPaterno && (
                      <p className="text-sm text-red-600">
                        {errors.apellidoPaterno.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="apellidoMaterno">Apellido Materno *</Label>
                    <Input
                      id="apellidoMaterno"
                      {...register("apellidoMaterno")}
                      placeholder="Apellido materno"
                    />
                    {errors.apellidoMaterno && (
                      <p className="text-sm text-red-600">
                        {errors.apellidoMaterno.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dni">DNI *</Label>
                    <Input
                      id="dni"
                      {...register("dni")}
                      placeholder="12345678"
                      maxLength={8}
                    />
                    {errors.dni && (
                      <p className="text-sm text-red-600">
                        {errors.dni.message}
                      </p>
                    )}
                  </div>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="razonSocial">Razón Social *</Label>
                    <Input
                      id="razonSocial"
                      {...register("razonSocial")}
                      placeholder="Nombre de la empresa"
                    />
                    {errors.razonSocial && (
                      <p className="text-sm text-red-600">
                        {errors.razonSocial.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ruc">RUC *</Label>
                    <Input
                      id="ruc"
                      {...register("ruc")}
                      placeholder="12345678901"
                      maxLength={11}
                    />
                    {errors.ruc && (
                      <p className="text-sm text-red-600">
                        {errors.ruc.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="representanteLegal">
                      Representante Legal *
                    </Label>
                    <Input
                      id="representanteLegal"
                      {...register("representanteLegal")}
                      placeholder="Nombre completo del representante"
                    />
                    {errors.representanteLegal && (
                      <p className="text-sm text-red-600">
                        {errors.representanteLegal.message}
                      </p>
                    )}
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Datos de Contacto
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="telefono">Teléfono *</Label>
                    <Input
                      id="telefono"
                      {...register("telefono")}
                      placeholder="987654321"
                      type="tel"
                    />
                    {errors.telefono && (
                      <p className="text-sm text-red-600">
                        {errors.telefono.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      {...register("email")}
                      placeholder="correo@ejemplo.com"
                      type="email"
                    />
                    {errors.email && (
                      <p className="text-sm text-red-600">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="direccion">Dirección *</Label>
                    <Input
                      id="direccion"
                      {...register("direccion")}
                      placeholder="Dirección completa"
                    />
                    {errors.direccion && (
                      <p className="text-sm text-red-600">
                        {errors.direccion.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Información del Documento
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="tipoDocumento">Tipo de Documento *</Label>
                    <Select
                      onValueChange={(value) =>
                        setValue("tipoDocumento", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione el tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="solicitud">Solicitud</SelectItem>
                        <SelectItem value="reclamo">Reclamo</SelectItem>
                        <SelectItem value="consulta">Consulta</SelectItem>
                        <SelectItem value="recurso">Recurso</SelectItem>
                        <SelectItem value="otros">Otros</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.tipoDocumento && (
                      <p className="text-sm text-red-600">
                        {errors.tipoDocumento.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="asunto">Asunto *</Label>
                    <Input
                      id="asunto"
                      {...register("asunto")}
                      placeholder="Resumen del documento"
                    />
                    {errors.asunto && (
                      <p className="text-sm text-red-600">
                        {errors.asunto.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="descripcion">Descripción *</Label>
                    <Textarea
                      id="descripcion"
                      {...register("descripcion")}
                      placeholder="Describa detalladamente su solicitud..."
                      rows={4}
                    />
                    {errors.descripcion && (
                      <p className="text-sm text-red-600">
                        {errors.descripcion.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Archivos Adjuntos
                </h3>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 mb-2">
                    Arrastra tus archivos aquí o haz clic para seleccionar
                  </p>
                  <Input
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.jpg,.png,.xls,.xlsx"
                    className="hidden"
                    id="archivos"
                    {...register("archivos")}
                  />
                  <Label htmlFor="archivos" className="cursor-pointer">
                    <Button
                      type="button"
                      variant="outline"
                      className="mt-2 bg-transparent"
                    >
                      Seleccionar Archivos
                    </Button>
                  </Label>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="terminos"
                    onCheckedChange={(checked) =>
                      setValue("terminosCondiciones", !!checked)
                    }
                  />
                  <Label
                    htmlFor="terminos"
                    className="text-sm leading-relaxed cursor-pointer"
                  >
                    Acepto los términos y condiciones del servicio y autorizo el
                    tratamiento de mis datos personales conforme a la Ley de
                    Protección de Datos Personales.
                  </Label>
                </div>
                {errors.terminosCondiciones && (
                  <p className="text-sm text-red-600">
                    {errors.terminosCondiciones.message}
                  </p>
                )}
              </div>

              <div className="flex justify-center pt-6">
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full md:w-auto px-8"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Enviar Documento
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DocumentSubmissionForm;
