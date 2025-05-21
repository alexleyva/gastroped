
import { MedicalCertificateForm } from "@/components/document-management/medical-certificate-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@/components/icons";

export default function MedicalCertificatePage() {
  return (
    <div className="container mx-auto py-8 px-4 md:px-6 lg:px-8">
      <Card className="w-full mx-auto shadow-xl">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <Icon name="NotebookText" className="h-8 w-8 text-primary" />
            <CardTitle className="text-3xl font-bold tracking-tight">Generar Certificado Médico</CardTitle>
          </div>
          <CardDescription>
            Complete el formulario para generar un nuevo certificado médico para un paciente.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <MedicalCertificateForm />
        </CardContent>
      </Card>
    </div>
  );
}

