// (admin)/admin/user/components/ToggleUserStatus.tsx
"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { User } from "@prisma/client";
import { Check, X } from "lucide-react";

type ToggleUserStatusProps = {
  user: User;
};

const ToggleUserStatus = ({ user }: ToggleUserStatusProps) => {
  const router = useRouter();

  const handleToggleStatus = async () => {
    try {
      const res = await fetch(`/api/users/${user.id}/toggle-status`, {
        method: "PUT",
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to toggle user status");
      }

      toast.success(
        `Usuario ${
          user.isActive ? "deshabilitado" : "habilitado"
        } correctamente.`
      );
      router.refresh();
    } catch (error: any) {
      toast.error(error.message || "Hubo un error al procesar la solicitud.");
    }
  };

  return (
    <Button
      variant={user.isActive ? "destructive" : "default"}
      size="sm"
      aria-label={user.isActive ? "Deshabilitar" : "Habilitar"}
      onClick={handleToggleStatus}
    >
      {user.isActive ? (
        <X className="h-4 w-4" />
      ) : (
        <Check className="h-4 w-4" />
      )}
    </Button>
  );
};

export default ToggleUserStatus;
