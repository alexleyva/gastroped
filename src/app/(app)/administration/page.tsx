
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@/components/icons";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AdministrationPage() {
  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-bold tracking-tight">Panel de Administración</h1>
        <p className="text-muted-foreground text-lg">
          Gestionar la configuración del sistema y los usuarios.
        </p>
      </section>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <Icon name="UserCog" className="h-7 w-7 text-primary" />
              <CardTitle className="text-xl">Gestión de Usuarios</CardTitle>
            </div>
            <CardDescription>
              Administrar cuentas de personal médico, roles y credenciales.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link href="/administration/user-management">
                Ir a Gestión de Usuarios
              </Link>
            </Button>
          </CardContent>
        </Card>
        {/* Add more admin sections here as cards if needed */}
      </div>
    </div>
  );
}

