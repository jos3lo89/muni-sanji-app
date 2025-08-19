"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6 px-4">
        <div className="space-y-2">
          <h1 className="text-9xl font-bold text-primary/20 select-none">
            404
          </h1>
          <h2 className="text-3xl font-semibold text-foreground">
            Página no encontrada
          </h2>
        </div>

        <p className="text-muted-foreground text-lg max-w-md mx-auto">
          Lo sentimos, la página que estás buscando no existe o ha sido movida.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            onClick={() => {
              router.back();
            }}
            variant="default"
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver atrás
          </Button>

          {/* <Button
            onClick={() => router.push("/")}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            Ir al inicio
          </Button> */}
        </div>

        <div className="mt-12 opacity-50">
          <div className="w-32 h-32 mx-auto bg-muted rounded-full flex items-center justify-center">
            <div className="text-6xl">🔍</div>
          </div>
        </div>
      </div>
    </div>
  );
}
