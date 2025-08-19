"use client";

import { Office } from "@prisma/client";
import { FormState, register } from "../create/actions";
import { useActionState } from "react";
import SubmitButton from "./SubmitButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Building,
  CheckCircle,
  Lock,
  Mail,
  User,
  UserCheck,
  XCircle,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CreateUserFormProps {
  offices: Pick<Office, "id" | "name">[];
}

const initialState: FormState = {
  success: false,
  message: "",
};

export function CreateUserForm({ offices }: CreateUserFormProps) {
  const [state, formAction] = useActionState(register, initialState);

  return (
    <div className="flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-xl">
        <CardHeader className="space-y-1 text-center">
          <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <User className="w-6 h-6 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">
            Registro de Usuario
          </CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
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

          <form action={formAction} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Nombre
                </Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Ingrese su nombre"
                  required
                  className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Apellidos
                </Label>
                <Input
                  id="lastName"
                  name="lastName"
                  placeholder="Ingrese sus apellidos"
                  required
                  className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dni" className="flex items-center gap-2">
                <UserCheck className="w-4 h-4" />
                DNI
              </Label>
              <Input
                id="dni"
                name="dni"
                placeholder="Ingrese su DNI"
                required
                className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="role" className="flex items-center gap-2">
                  <UserCheck className="w-4 h-4" />
                  Rol
                </Label>
                <Select name="role" defaultValue="administrador" required>
                  <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-primary/20">
                    <SelectValue placeholder="Seleccione un rol" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="administrador">Administrador</SelectItem>
                    <SelectItem value="mesa_de_partes">
                      Mesa de partes
                    </SelectItem>
                    <SelectItem value="funcionario">Funcionario</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="officeId" className="flex items-center gap-2">
                  <Building className="w-4 h-4" />
                  Oficina
                </Label>
                <Select name="officeId" required>
                  <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-primary/20">
                    <SelectValue placeholder="Seleccione una oficina" />
                  </SelectTrigger>
                  <SelectContent>
                    {offices.map((office) => (
                      <SelectItem key={office.id} value={office.id}>
                        {office.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="ejemplo@correo.com"
                required
                className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Contraseña
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Ingrese una contraseña segura"
                required
                className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div className="pt-4">
              <SubmitButton />
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
