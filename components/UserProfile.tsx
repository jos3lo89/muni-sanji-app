"use client";

import { useSession, signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function UserProfile() {
  const { data: session, isPending, error } = useSession();
  const router = useRouter();

  if (isPending) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <a href="/signin">Iniciar Sesión</a>;
  }

  const handleSignOut = async () => {
    await signOut();
    router.push("/"); // Redirigir a la página de inicio
  };

  return (
    <div>
      <p>
        Bienvenido, {session?.user?.name} ({session?.user?.email})
      </p>
      <p>Tu rol es: {session?.user?.id}</p>
      <button onClick={handleSignOut}>Cerrar Sesión</button>
    </div>
  );
}
