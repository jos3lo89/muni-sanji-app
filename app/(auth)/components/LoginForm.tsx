"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState } from "react";
import { authenticate, signinFormState } from "../signin/action";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, XCircle } from "lucide-react";
import SigninSubmitButton from "./SigninSubmitButton";

const initialState: signinFormState = {
  success: false,
  message: "",
};
const LoginForm = () => {
  const [state, formAction] = useActionState(authenticate, initialState);

  return (
    <form action={formAction} className="space-y-6">
      <div>
        {state.message && (
          <Alert
            className={
              state.success
                ? "border-green-200 bg-green-50 dark:bg-green-950"
                : "border-red-200 bg-red-50 dark:bg-red-950"
            }
          >
            {state.success ? (
              <CheckCircle className="h-4 w-4 text-green-600" />
            ) : (
              <XCircle className="h-4 w-4 text-red-600" />
            )}
            <AlertDescription
              className={
                state.success
                  ? "text-green-800 dark:text-green-200"
                  : "text-red-800 dark:text-red-200"
              }
            >
              {state.message}
            </AlertDescription>
          </Alert>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium text-foreground">
          Correo electrónico
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="on"
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
          autoComplete="off"
          placeholder="••••••••"
          className="h-12 text-base transition-all duration-200 focus:ring-2 focus:ring-primary/20"
          required
        />
      </div>

      <SigninSubmitButton />
    </form>
  );
};
export default LoginForm;
