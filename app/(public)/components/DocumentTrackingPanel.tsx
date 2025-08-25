"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, FileText, Clock } from "lucide-react";

// Esquemas de validación con Zod
const futSchema = z.object({
  codigo: z
    .string()
    .min(1, "El código del FUT es requerido")
    .min(3, "El código debe tener al menos 3 caracteres")
    .max(20, "El código no puede exceder 20 caracteres")
    .regex(
      /^[A-Za-z0-9-]+$/,
      "El código solo puede contener letras, números y guiones"
    )
    .transform((val) => val.toUpperCase()),
});

const documentSchema = z.object({
  codigo: z
    .string()
    .min(1, "El código del documento es requerido")
    .min(5, "El código debe tener al menos 5 caracteres")
    .max(25, "El código no puede exceder 25 caracteres")
    .regex(
      /^[A-Za-z0-9-_]+$/,
      "El código solo puede contener letras, números, guiones y guiones bajos"
    )
    .transform((val) => val.toUpperCase()),
});

type FutFormData = z.infer<typeof futSchema>;
type DocumentFormData = z.infer<typeof documentSchema>;

const DocumentTrackingPanel = () => {
  const [activeTab, setActiveTab] = useState("fut");

  // Formulario para FUT
  const {
    register: registerFut,
    handleSubmit: handleSubmitFut,
    formState: { errors: errorsFut, isSubmitting: isSubmittingFut },
    reset: resetFut,
  } = useForm<FutFormData>({
    resolver: zodResolver(futSchema),
  });

  // Formulario para Documento
  const {
    register: registerDoc,
    handleSubmit: handleSubmitDoc,
    formState: { errors: errorsDoc, isSubmitting: isSubmittingDoc },
    reset: resetDoc,
  } = useForm<DocumentFormData>({
    resolver: zodResolver(documentSchema),
  });

  const onSubmitFut = (data: FutFormData) => {
    console.log("=== BÚSQUEDA DE FUT ===");
    console.log("Código del FUT:", data.codigo);
    console.log("Timestamp:", new Date().toISOString());
    console.log("Tipo de búsqueda: FUT");
    console.log("========================");

    // Simular búsqueda
    setTimeout(() => {
      console.log(`Buscando estado del FUT: ${data.codigo}...`);
      resetFut();
    }, 1000);
  };

  const onSubmitDoc = (data: DocumentFormData) => {
    console.log("=== BÚSQUEDA DE DOCUMENTO ===");
    console.log("Código del documento:", data.codigo);
    console.log("Timestamp:", new Date().toISOString());
    console.log("Tipo de búsqueda: Documento");
    console.log("=============================");

    // Simular búsqueda
    setTimeout(() => {
      console.log(`Buscando estado del documento: ${data.codigo}...`);
      resetDoc();
    }, 1000);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2 text-2xl">
            <Search className="h-6 w-6" />
            Sistema de Seguimiento
          </CardTitle>
          <CardDescription>
            Consulta el estado de tus FUTs y documentos ingresando el código
            correspondiente
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="fut" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Consultar FUT
              </TabsTrigger>
              <TabsTrigger value="document" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Consultar Documento
              </TabsTrigger>
            </TabsList>

            <TabsContent value="fut" className="space-y-4">
              <form
                onSubmit={handleSubmitFut(onSubmitFut)}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label htmlFor="fut-codigo" className="text-sm font-medium">
                    Código del FUT
                  </Label>
                  <Input
                    id="fut-codigo"
                    type="text"
                    placeholder="Ej: FUT-2024-001"
                    {...registerFut("codigo")}
                    className={errorsFut.codigo ? "border-red-500" : ""}
                  />
                  {errorsFut.codigo && (
                    <p className="text-sm text-red-500">
                      {errorsFut.codigo.message}
                    </p>
                  )}
                  <p className="text-xs text-gray-500">
                    Ingresa el código de tu Formulario Único de Trámite
                  </p>
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmittingFut}
                >
                  {isSubmittingFut ? "Buscando..." : "Buscar Estado del FUT"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="document" className="space-y-4">
              <form
                onSubmit={handleSubmitDoc(onSubmitDoc)}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label htmlFor="doc-codigo" className="text-sm font-medium">
                    Código del Documento
                  </Label>
                  <Input
                    id="doc-codigo"
                    type="text"
                    placeholder="Ej: DOC-2024-12345"
                    {...registerDoc("codigo")}
                    className={errorsDoc.codigo ? "border-red-500" : ""}
                  />
                  {errorsDoc.codigo && (
                    <p className="text-sm text-red-500">
                      {errorsDoc.codigo.message}
                    </p>
                  )}
                  <p className="text-xs text-gray-500">
                    Ingresa el código de seguimiento de tu documento
                  </p>
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmittingDoc}
                >
                  {isSubmittingDoc
                    ? "Buscando..."
                    : "Buscar Estado del Documento"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          {/* <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-700">
              <strong>Nota:</strong> Los resultados de la búsqueda se mostrarán
              en la consola del navegador. Abre las herramientas de
              desarrollador (F12) para ver los detalles.
            </p>
          </div> */}
        </CardContent>
      </Card>
    </div>
  );
};

export default DocumentTrackingPanel;
