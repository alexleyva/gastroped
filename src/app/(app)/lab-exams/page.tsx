
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Icon } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

// Mock data for demonstration
const mockLabExams = [
  { id: "L001", patientName: "Alice Wonderland", patientFile: "FN-001", examName: "Complete Blood Count", dateUploaded: "2023-10-14", type: "Lab Result (PDF)", category: "lab" },
  { id: "L002", patientName: "Bob The Builder", patientFile: "FN-002", examName: "Abdominal X-Ray", dateUploaded: "2023-11-01", type: "Imaging (JPEG)", category: "imaging" },
  { id: "L003", patientName: "Charlie Brown", patientFile: "FN-003", examName: "Stool Analysis", dateUploaded: "2023-09-19", type: "Lab Result (PDF)", category: "lab" },
  { id: "L004", patientName: "Alice Wonderland", patientFile: "FN-001", examName: "Ultrasound Abdomen", dateUploaded: "2023-10-15", type: "Imaging (PNG)", category: "imaging" },
];

export default function LabExamsPage() {
  return (
    <div className="space-y-8">
      <section className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Exámenes de Laboratorio</h1>
          <p className="text-muted-foreground text-lg">
            Gestionar y ver resultados de laboratorio y estudios de imagen subidos.
          </p>
        </div>
         <Button asChild>
            {/* This link might go to a dedicated upload page or a section in patient's detail */}
          <Link href="/evaluations/new"> 
            <Icon name="UploadCloud" className="mr-2 h-4 w-4" /> Subir Nuevo Examen
          </Link>
        </Button>
      </section>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Todos los Exámenes Subidos</CardTitle>
          <CardDescription>Una lista de todos los exámenes de laboratorio y estudios de imagen en el sistema.</CardDescription>
           <div className="pt-4">
             <Input
              placeholder="Buscar exámenes por nombre de paciente, número de expediente o nombre del examen..."
              className="max-w-sm"
            />
           </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nº Expediente Pac.</TableHead>
                <TableHead>Nombre del Paciente</TableHead>
                <TableHead>Nombre del Examen</TableHead>
                <TableHead>Fecha de Carga</TableHead>
                <TableHead>Categoría</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockLabExams.map((exam) => (
                <TableRow key={exam.id}>
                  <TableCell className="font-medium">{exam.patientFile}</TableCell>
                  <TableCell>{exam.patientName}</TableCell>
                  <TableCell>{exam.examName}</TableCell>
                  <TableCell>{exam.dateUploaded}</TableCell>
                  <TableCell>
                    <Badge variant={exam.category === 'lab' ? 'secondary' : 'default'}>
                      {exam.category === 'lab' ? 'Lab.' : 'Imagen'}
                    </Badge>
                  </TableCell>
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
                          <Icon name="DownloadCloud" className="mr-2 h-4 w-4" /> Descargar
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                           <Icon name="Eye" className="mr-2 h-4 w-4" /> Ver Detalles
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10">
                           <Icon name="Trash2" className="mr-2 h-4 w-4" /> Eliminar Examen
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
               {mockLabExams.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    No se encontraron exámenes de laboratorio.
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

