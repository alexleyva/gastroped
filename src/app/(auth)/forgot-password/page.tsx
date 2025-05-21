
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@/components/icons";
import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <div className="w-full max-w-md">
      <div className="p-1 bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 rounded-xl shadow-2xl">
        <Card className="overflow-hidden">
          <CardHeader className="text-center">
             <div className="mx-auto mb-4 flex items-center justify-center">
                <Icon name="KeyRound" className="w-12 h-12 text-primary" />
             </div>
            <CardTitle className="text-3xl font-bold">¿Olvidó su Contraseña?</CardTitle>
            <CardDescription>Ingrese su dirección de correo electrónico a continuación y le enviaremos un enlace para restablecer su contraseña.</CardDescription>
          </CardHeader>
          <CardContent>
            <ForgotPasswordForm />
          </CardContent>
          <CardFooter className="flex justify-center text-sm">
             <Link href="/login" className="font-medium text-primary hover:underline">
                Volver a Iniciar Sesión
              </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

