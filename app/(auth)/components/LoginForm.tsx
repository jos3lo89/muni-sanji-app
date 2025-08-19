import { authenticate } from "@/action/auth.action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const LoginForm = () => {
  return (
    <form action={authenticate} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium text-foreground">
          Correo electrónico
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="tu@ejemplo.com"
          className="h-12 text-base transition-all duration-200 focus:ring-2 focus:ring-primary/20"
          required
        />
      </div>

      <div className="space-y-2">
        <Label
          htmlFor="password"
          className="text-sm font-medium text-foreground"
        >
          Contraseña
        </Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="••••••••"
          className="h-12 text-base transition-all duration-200 focus:ring-2 focus:ring-primary/20"
          required
        />
      </div>

      <Button
        type="submit"
        className="w-full cursor-pointer h-12 text-base font-semibold bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
      >
        Iniciar sesión
      </Button>
    </form>
  );
};
export default LoginForm;
