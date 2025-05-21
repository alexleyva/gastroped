
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Icon } from "@/components/icons";
import Link from "next/link";

// Mock data for demonstration
const mockPatients = [
  { id: "P001", name: "Alice Wonderland", dob: "2018-07-22", lastEvaluation: "2023-10-15", fileNumber: "FN-001" },
  { id: "P002", name: "Bob The Builder", dob: "2019-03-10", lastEvaluation: "2023-11-01", fileNumber: "FN-002" },
  { id: "P003", name: "Charlie Brown", dob: "2017-11-05", lastEvaluation: "2023-09-20", fileNumber: "FN-003" },
];

export default function PatientsPage() {
  return (
    <div className="space-y-8">
      <section className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Registros de Pacientes</h1>
          <p className="text-muted-foreground text-lg">
            Buscar, ver y gestionar la información de los pacientes.
          </p>
        </div>
        <Button asChild>
          <Link href="/evaluations/new">
            <Icon name="FilePlus2" className="mr-2 h-4 w-4" /> Añadir Nuevo Paciente / Evaluación
          </Link>
        </Button>
      </section>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Todos los Pacientes</CardTitle>
          <CardDescription>Una lista de todos los pacientes registrados en el sistema.</CardDescription>
           <div className="pt-4">
             <Input
              placeholder="Buscar pacientes por nombre, ID o número de expediente..."
              className="max-w-sm"
            />
           </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nº Expediente</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Fecha de Nacimiento</TableHead>
                <TableHead>Última Evaluación</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockPatients.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell className="font-medium">{patient.fileNumber}</TableCell>
                  <TableCell>{patient.name}</TableCell>
                  <TableCell>{patient.dob}</TableCell>
                  <TableCell>{patient.lastEvaluation}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Abrir menú</span>
                          <Icon name="MoreHorizontal" className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                        <DropdownMenuItem>
                          <Icon name="Eye" className="mr-2 h-4 w-4" /> Ver Detalles
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Icon name="FileEdit" className="mr-2 h-4 w-4" /> Editar Registro
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10">
                          <Icon name="Trash2" className="mr-2 h-4 w-4" /> Eliminar Registro
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
               {mockPatients.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    No se encontraron pacientes.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

