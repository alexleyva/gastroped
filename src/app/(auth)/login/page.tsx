
import { LoginForm } from "@/components/auth/login-form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@/components/icons";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="w-full max-w-md">
      <div className="p-1 bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 rounded-xl shadow-2xl">
        <Card className="overflow-hidden">
          <CardHeader className="text-center">
             <div className="mx-auto mb-4 flex items-center justify-center">
                <Icon name="ActivitySquare" className="w-12 h-12 text-primary" />
             </div>
            <CardTitle className="text-3xl font-bold">Iniciar Sesión</CardTitle>
            <CardDescription>Acceda a su cuenta de GastroKid Eval.</CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
          <CardFooter className="flex flex-col items-center text-sm text-muted-foreground">
            <p className="mt-4">
              Al iniciar sesión, usted acepta nuestros{" "}
              <Link href="/terms" className="underline hover:text-primary">
                Términos
              </Link>{" "}
              y{" "}
              <Link href="/privacy" className="underline hover:text-primary">
                Política de Privacidad
              </Link>
              .
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

