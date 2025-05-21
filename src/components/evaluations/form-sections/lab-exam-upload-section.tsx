
"use client";

import type React from "react";
import { useState } from "react";
import type { Control, UseFormSetValue } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card"; // Removed CardHeader, CardDescription as SectionCard handles it
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { UploadCloud, FileText, ImageIcon, Trash2, Eye } from "lucide-react";
import type { EvaluationFormValues } from "@/lib/schemas";
import type { LabExamFile } from "@/lib/types";
import { SectionCard } from "./section-card";
import { useToast } from "@/hooks/use-toast";

interface LabExamUploadSectionProps {
  control: Control<EvaluationFormValues>; // Control might not be directly used if managing state internally or via setValue
  setValue: UseFormSetValue<EvaluationFormValues>;
}

export function LabExamUploadSection({ setValue }: LabExamUploadSectionProps) {
  const [uploadedFiles, setUploadedFiles] = useState<LabExamFile[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileCategory, setFileCategory] = useState<'lab' | 'imaging'>('lab');
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      // Validate file type and size here if needed
      const allowedPdfTypes = ['application/pdf'];
      const allowedImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      
      let isValid = false;
      if (fileCategory === 'lab') {
        isValid = allowedPdfTypes.includes(file.type);
         if(!isValid) toast({title: "Tipo de Archivo Inválido", description:"Por favor, suba un PDF para exámenes de laboratorio.", variant:"destructive"});
      } else {
        isValid = allowedImageTypes.includes(file.type);
        if(!isValid) toast({title: "Tipo de Archivo Inválido", description:"Por favor, suba una imagen (JPEG, PNG, GIF, WEBP) para estudios de imagen.", variant:"destructive"});
      }

      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast({title: "Archivo Demasiado Grande", description:"Por favor, suba archivos de menos de 5MB.", variant:"destructive"});
        isValid = false;
      }
      
      if (isValid) {
        setSelectedFile(file);
      } else {
        setSelectedFile(null);
        event.target.value = ""; // Reset file input
      }
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast({title: "Ningún Archivo Seleccionado", description:"Por favor, seleccione un archivo para subir.", variant:"destructive"});
      return;
    }

    // Simulate file upload
    await new Promise(resolve => setTimeout(resolve, 500));
    const newFile: LabExamFile = {
      id: crypto.randomUUID(),
      fileName: selectedFile.name,
      fileType: selectedFile.type,
      fileUrl: URL.createObjectURL(selectedFile), // Placeholder URL, in reality, this would be from storage
      uploadedAt: new Date(),
      category: fileCategory,
    };

    const updatedFiles = [...uploadedFiles, newFile];
    setUploadedFiles(updatedFiles);
    setValue("labExams", updatedFiles, { shouldValidate: true });
    setSelectedFile(null); 
    // Reset the file input visually - this is tricky. Easiest way is to give the input a key that changes.
    // For simplicity, we'll rely on the user selecting a new file or the form resetting.
     toast({title: "Archivo Subido", description:`${newFile.fileName} ha sido subido.`, variant:"default"});
  };

  const handleRemoveFile = (fileId: string) => {
    const updatedFiles = uploadedFiles.filter(file => file.id !== fileId);
    setUploadedFiles(updatedFiles);
    setValue("labExams", updatedFiles, { shouldValidate: true });
    toast({title: "Archivo Eliminado", description:"El archivo seleccionado ha sido eliminado.", variant:"default"});
  };
  
  const handleViewFile = (fileUrl: string) => {
    window.open(fileUrl, '_blank');
  };


  return (
    <SectionCard title="Exámenes de Laboratorio" iconName="TestTube2" description="Subir y gestionar resultados de exámenes de laboratorio (PDF) y estudios de imagen (imágenes).">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end mb-6 p-4 border rounded-md bg-background/50">
        <div className="md:col-span-1">
          <label htmlFor="fileCategory" className="block text-sm font-medium text-foreground mb-1">Categoría de Archivo</label>
          <select
            id="fileCategory"
            value={fileCategory}
            onChange={(e) => setFileCategory(e.target.value as 'lab' | 'imaging')}
            className="w-full p-2 border border-input rounded-md bg-background focus:ring-ring focus:border-ring"
          >
            <option value="lab">Examen de Laboratorio (PDF)</option>
            <option value="imaging">Estudio de Imagen (Imagen)</option>
          </select>
        </div>
        <div className="md:col-span-1">
          <label htmlFor="fileUpload" className="block text-sm font-medium text-foreground mb-1">Seleccionar Archivo</label>
          <Input 
            id="fileUpload" 
            type="file" 
            onChange={handleFileChange} 
            accept={fileCategory === 'lab' ? ".pdf" : "image/*"}
            className="cursor-pointer"
           />
        </div>
        <Button onClick={handleUpload} disabled={!selectedFile} className="w-full md:w-auto">
          <UploadCloud className="mr-2 h-4 w-4" /> Subir Archivo
        </Button>
      </div>

      {uploadedFiles.length > 0 && (
        <div>
          <h4 className="text-md font-medium mb-2 text-foreground">Archivos Subidos</h4>
          <Card className="border-dashed">
            <CardContent className="p-0">
              <ScrollArea className="h-[200px]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nombre del Archivo</TableHead>
                      <TableHead>Categoría</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {uploadedFiles.map((file) => (
                      <TableRow key={file.id}>
                        <TableCell className="font-medium flex items-center">
                          {file.category === 'lab' ? <FileText className="mr-2 h-4 w-4 text-muted-foreground" /> : <ImageIcon className="mr-2 h-4 w-4 text-muted-foreground" />}
                          {file.fileName}
                        </TableCell>
                        <TableCell>{file.category === 'lab' ? 'Examen Lab.' : 'Imagen'}</TableCell>
                        <TableCell>{file.fileType}</TableCell>
                        <TableCell className="text-right space-x-2">
                           <Button variant="ghost" size="icon" onClick={() => handleViewFile(file.fileUrl)} title="Ver Archivo">
                             <Eye className="h-4 w-4" />
                             <span className="sr-only">Ver Archivo</span>
                           </Button>
                           <Button variant="ghost" size="icon" onClick={() => handleRemoveFile(file.id)} title="Eliminar Archivo" className="text-destructive hover:text-destructive">
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Eliminar Archivo</span>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      )}
       {uploadedFiles.length === 0 && (
         <p className="text-muted-foreground text-center py-4">Aún no se han subido archivos para esta evaluación.</p>
       )}
    </SectionCard>
  );
}

