
"use client";

import type * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { medicalCertificateSchema, type MedicalCertificateFormValues, type CertificateMockPatient } from "@/lib/schemas/medical-certificate-schema";
import { Icon } from "@/components/icons";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import React, { useEffect, useState } from "react";
import { format, differenceInYears } from 'date-fns';
import { es } from 'date-fns/locale';
import { cn } from "@/lib/utils";
import { v4 as uuidv4 } from 'uuid';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

// Mock patient data - extend this as needed for more realistic pre-filling
const mockPatients: CertificateMockPatient[] = [
  { id: "P001", name: "Alice Wonderland", lastName: "Wonderland", idNumber: "1234567890", fileNumber: "FN-001", dob: "2018-07-22", address: "Calle Principal 123", phone: "555-1234", lastDiagnosis: "Intolerancia a la lactosa" },
  { id: "P002", name: "Bob The Builder", lastName: "The Builder", idNumber: "0987654321", fileNumber: "FN-002", dob: "2019-03-10", address: "Avenida Roble 456", phone: "555-5678", lastDiagnosis: "Constipación"},
  { id: "P003", name: "Charlie Brown", lastName: "Brown", idNumber: "1122334455", fileNumber: "FN-003", dob: "2017-11-05", address: "Pasaje Pino 789", phone: "555-9012", lastDiagnosis: "Reflujo gastroesofágico"},
  { id: "P004", name: "Diana Prince", lastName: "Prince", idNumber: "5544332211", fileNumber: "FN-004", dob: "2020-01-15", address: "Camino Amazonas 101", phone: "555-3456" },
];

// Mock logged-in doctor details
const mockDoctor = {
  name: "Dr. Ejemplo Gastro", 
  specialty: "Gastroenterología Pediátrica",
  msp: "MSP-12345",
  email: "doctor@example.com",
};

export function MedicalCertificateForm() {
  const { toast } = useToast();
  const [currentDateNumeric, setCurrentDateNumeric] = useState("");
  const [currentDateWritten, setCurrentDateWritten] = useState("");
  const [patientSearchTerm, setPatientSearchTerm] = useState("");
  const [filteredPatients, setFilteredPatients] = useState<CertificateMockPatient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<CertificateMockPatient | null>(null);
  const [isPatientSearchOpen, setIsPatientSearchOpen] = useState(false);
  
  const [generatedCertificates, setGeneratedCertificates] = useState<MedicalCertificateFormValues[]>([]);
  const [editingCertificateData, setEditingCertificateData] = useState<MedicalCertificateFormValues | null>(null);

  const form = useForm<MedicalCertificateFormValues>({
    resolver: zodResolver(medicalCertificateSchema),
    defaultValues: {
      patientFullName: "",
      patientIdNumber: "",
      patientFileNumber: "",
      patientAge: "",
      attentionId: uuidv4().substring(0, 8).toUpperCase(),
      dateOfAttentionNumeric: "",
      dateOfAttentionWritten: "",
      attendedAtLocation: "CONSULTA EXTERNA de esta casa de salud",
      diagnosis: "",
      procedure: "",
      observations: "",
      patientWorkplace: "",
      patientWorkActivity: "",
      contingencyType: "Enfermedad general",
      symptomsPresent: undefined,
      symptomsDescription: "",
      patientAddress: "",
      patientPhone: "",
      doctorName: mockDoctor.name,
      doctorSpecialty: mockDoctor.specialty,
      doctorMsp: mockDoctor.msp,
      doctorEmail: mockDoctor.email,
    },
  });

  useEffect(() => {
    const now = new Date();
    const numericDate = format(now, 'dd/MM/yyyy');
    const writtenDate = format(now, "d 'de' MMMM 'de' yyyy", { locale: es });
    setCurrentDateNumeric(numericDate);
    setCurrentDateWritten(writtenDate);
    if (!editingCertificateData) { 
        form.setValue("dateOfAttentionNumeric", numericDate);
        form.setValue("dateOfAttentionWritten", writtenDate);
        form.setValue("attentionId", uuidv4().substring(0, 8).toUpperCase());
    }
  }, [form, editingCertificateData]); 

  useEffect(() => {
    if (patientSearchTerm.length > 1) {
      setFilteredPatients(
        mockPatients.filter(p =>
          p.name.toLowerCase().includes(patientSearchTerm.toLowerCase()) ||
          p.lastName.toLowerCase().includes(patientSearchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredPatients([]);
    }
  }, [patientSearchTerm]);

  const handlePatientSelect = (patient: CertificateMockPatient) => {
    setSelectedPatient(patient);
    form.setValue("patientId", patient.id);
    form.setValue("patientFullName", patient.name);
    form.setValue("patientIdNumber", patient.idNumber);
    form.setValue("patientFileNumber", patient.fileNumber);
    const age = differenceInYears(new Date(), new Date(patient.dob));
    form.setValue("patientAge", `${age} años`);
    form.setValue("patientAddress", patient.address || "");
    form.setValue("patientPhone", patient.phone || "");
    if (patient.lastDiagnosis) {
      form.setValue("diagnosis", patient.lastDiagnosis);
    }
    setIsPatientSearchOpen(false);
    setPatientSearchTerm(patient.name);
  };
  
  async function onSubmit(data: MedicalCertificateFormValues) {
    if (editingCertificateData) {
      setGeneratedCertificates(prevCerts =>
        prevCerts.map(cert =>
          cert.attentionId === editingCertificateData.attentionId 
            ? { ...data, attentionId: editingCertificateData.attentionId } 
            : cert
        )
      );
      toast({
        title: "Certificado Actualizado",
        description: `El certificado para ${data.patientFullName} ha sido actualizado.`,
      });
    } else {
      setGeneratedCertificates(prevCerts => [...prevCerts, data]);
      toast({
        title: "Certificado Médico Generado",
        description: `Certificado para ${data.patientFullName} ha sido generado (simulación).`,
      });
    }
    clearForm(); 
  }

  function clearForm() {
    form.reset({
      patientFullName: "",
      patientIdNumber: "",
      patientFileNumber: "",
      patientAge: "",
      attentionId: uuidv4().substring(0,8).toUpperCase(),
      dateOfAttentionNumeric: currentDateNumeric,
      dateOfAttentionWritten: currentDateWritten,
      attendedAtLocation: "CONSULTA EXTERNA de esta casa de salud",
      diagnosis: "",
      procedure: "",
      observations: "",
      patientWorkplace: "",
      patientWorkActivity: "",
      contingencyType: "Enfermedad general",
      symptomsPresent: undefined,
      symptomsDescription: "",
      patientAddress: "",
      patientPhone: "",
      doctorName: mockDoctor.name,
      doctorSpecialty: mockDoctor.specialty,
      doctorMsp: mockDoctor.msp,
      doctorEmail: mockDoctor.email,
    });
    setSelectedPatient(null);
    setPatientSearchTerm("");
    setEditingCertificateData(null);
  }

  const handleEditCertificate = (certificateToEdit: MedicalCertificateFormValues) => {
    form.reset(certificateToEdit);
    setEditingCertificateData(certificateToEdit);
    const patient = mockPatients.find(p => p.id === certificateToEdit.patientId);
    if (patient) {
        setSelectedPatient(patient);
        setPatientSearchTerm(patient.name);
    } else {
        setSelectedPatient(null); 
        setPatientSearchTerm(certificateToEdit.patientFullName); 
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteCertificate = (attentionIdToDelete: string) => {
    setGeneratedCertificates(prevCerts => prevCerts.filter(cert => cert.attentionId !== attentionIdToDelete));
    toast({
      title: "Certificado Eliminado",
      description: "El certificado médico ha sido eliminado.",
    });
    if (editingCertificateData && editingCertificateData.attentionId === attentionIdToDelete) {
      clearForm();
    }
  };

  const handlePrintCertificate = (certificate: MedicalCertificateFormValues) => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write('<html><head><title>Certificado Médico</title>');
      printWindow.document.write('<style>body{font-family:Arial,sans-serif;margin:20px;font-size:12px}h1,h2,h3{text-align:center;margin-bottom:10px}table{width:100%;border-collapse:collapse;margin-bottom:15px}td,th{border:1px solid #ddd;padding:8px;text-align:left}.label{font-weight:bold}.section{margin-bottom:20px;padding-bottom:10px;border-bottom:1px solid #eee} .text-area-content{white-space:pre-wrap;border:1px solid #ccc;padding:5px;min-height:50px;background-color:#f9f9f9;margin-top:5px} .doctor-signature{text-align:center;margin-top:40px;padding-top:20px;border-top:1px solid #000}.signature-line{width:200px;border-bottom:1px solid #000;margin:0 auto 20px auto;height:20px}.no-print{display:none}@media print{.no-print{display:none}}</style>');
      printWindow.document.write('</head><body>');
      printWindow.document.write(`<h1>Certificado Médico</h1>`);
      printWindow.document.write(`<p style="text-align:right;"><span class="label">Atención No:</span> ${certificate.attentionId}</p>`);
      printWindow.document.write(`<p style="text-align:right;"><span class="label">Fecha:</span> ${certificate.dateOfAttentionNumeric} (${certificate.dateOfAttentionWritten})</p>`);
      
      printWindow.document.write('<div class="section"><h3>Datos del Paciente</h3>');
      printWindow.document.write(`<table>
        <tr><td class="label">Paciente:</td><td>${certificate.patientFullName}</td></tr>
        <tr><td class="label">Cédula/Pasaporte:</td><td>${certificate.patientIdNumber}</td></tr>
        <tr><td class="label">Historia Clínica No:</td><td>${certificate.patientFileNumber}</td></tr>
        <tr><td class="label">Edad:</td><td>${certificate.patientAge}</td></tr>
        <tr><td class="label">Dirección:</td><td>${certificate.patientAddress || 'N/A'}</td></tr>
        <tr><td class="label">Teléfono:</td><td>${certificate.patientPhone || 'N/A'}</td></tr>
      </table></div>`);

      printWindow.document.write('<div class="section"><h3>Información Clínica</h3>');
      printWindow.document.write(`<p><span class="label">Atendido/a en:</span> ${certificate.attendedAtLocation}</p>`);
      printWindow.document.write(`<p><span class="label">Diagnóstico(s):</span></p><div class="text-area-content">${certificate.diagnosis}</div>`);
      if(certificate.procedure) printWindow.document.write(`<p><span class="label">Procedimiento(s) - Fecha(s):</span></p><div class="text-area-content">${certificate.procedure}</div>`);
      if(certificate.observations) printWindow.document.write(`<p><span class="label">Observaciones:</span></p><div class="text-area-content">${certificate.observations}</div>`);
      printWindow.document.write('</div>');
      
      printWindow.document.write('<div class="section"><h3>Información Adicional Referida</h3>');
      printWindow.document.write(`<table>
        <tr><td class="label">Lugar de Trabajo:</td><td>${certificate.patientWorkplace || 'N/A'}</td></tr>
        <tr><td class="label">Actividad Laboral:</td><td>${certificate.patientWorkActivity || 'N/A'}</td></tr>
        <tr><td class="label">Tipo de Contingencia:</td><td>${certificate.contingencyType}</td></tr>
        <tr><td class="label">Presenta Síntomas:</td><td>${certificate.symptomsPresent || 'No especificado'}</td></tr>
      </table>`);
      if(certificate.symptomsPresent === "SI" && certificate.symptomsDescription) printWindow.document.write(`<p><span class="label">Descripción de Síntomas:</span></p><div class="text-area-content">${certificate.symptomsDescription}</div>`);
      printWindow.document.write('</div>');

      printWindow.document.write('<div class="doctor-signature">');
      printWindow.document.write('<div class="signature-line"></div>');
      printWindow.document.write(`<p>${certificate.doctorName}</p>`);
      printWindow.document.write(`<p>${certificate.doctorSpecialty}</p>`);
      printWindow.document.write(`<p>MSP: ${certificate.doctorMsp}</p>`);
      printWindow.document.write(`<p>Email: ${certificate.doctorEmail}</p>`);
      printWindow.document.write('</div>');
      
      printWindow.document.write('<button class="no-print" onclick="window.print()">Imprimir</button>');
      printWindow.document.write('</body></html>');
      printWindow.document.close();
      toast({ title: "Certificado Listo para Imprimir", description: "Se ha abierto una nueva ventana con el certificado."});
    } else {
      toast({ title: "Error de Impresión", description: "No se pudo abrir la ventana de impresión. Verifique la configuración de su navegador.", variant: "destructive"});
    }
  };

  return (
    <div className="space-y-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          
          <div className="space-y-4 p-4 border rounded-md shadow-sm bg-card">
            <h3 className="text-lg font-medium text-primary">Buscar Paciente</h3>
            <Popover open={isPatientSearchOpen} onOpenChange={setIsPatientSearchOpen}>
              <PopoverTrigger asChild>
                <Input
                  placeholder="Escriba nombre o apellido del paciente..."
                  value={patientSearchTerm}
                  onChange={(e) => {
                    setPatientSearchTerm(e.target.value);
                    if (!isPatientSearchOpen) setIsPatientSearchOpen(true);
                    if (e.target.value.length <= 1) setSelectedPatient(null); 
                  }}
                  className="w-full"
                />
              </PopoverTrigger>
              <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                <Command>
                  <CommandInput placeholder="Buscar paciente..." />
                  <CommandList>
                    <CommandEmpty>No se encontraron pacientes.</CommandEmpty>
                    <CommandGroup>
                      {filteredPatients.map((patient) => (
                        <CommandItem
                          key={patient.id}
                          value={patient.name}
                          onSelect={() => handlePatientSelect(patient)}
                        >
                          {patient.name} - {patient.idNumber}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-4 p-4 border rounded-md shadow-sm bg-card">
            <h3 className="text-lg font-medium text-primary">Datos del Paciente y Atención</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <FormField control={form.control} name="patientFullName" render={({ field }) => (
                <FormItem>
                  <FormLabel>El/la paciente</FormLabel>
                  <FormControl><Input {...field} readOnly={!!selectedPatient && !editingCertificateData} className={cn((selectedPatient || editingCertificateData) && "bg-muted/50")} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
               <FormField control={form.control} name="patientIdNumber" render={({ field }) => (
                <FormItem>
                  <FormLabel>Cédula / Pasaporte</FormLabel>
                  <FormControl><Input {...field} readOnly={!!selectedPatient && !editingCertificateData} className={cn((selectedPatient || editingCertificateData) && "bg-muted/50")} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="patientFileNumber" render={({ field }) => (
                <FormItem>
                  <FormLabel>Historia Clínica No.</FormLabel>
                  <FormControl><Input {...field} readOnly={!!selectedPatient && !editingCertificateData} className={cn((selectedPatient || editingCertificateData) && "bg-muted/50")} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="patientAge" render={({ field }) => (
                <FormItem>
                  <FormLabel>Edad</FormLabel>
                  <FormControl><Input {...field} readOnly={!!selectedPatient && !editingCertificateData} className={cn((selectedPatient || editingCertificateData) && "bg-muted/50")} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="patientAddress" render={({ field }) => (
                <FormItem>
                  <FormLabel>Dirección</FormLabel>
                  <FormControl><Input {...field} readOnly={!!selectedPatient && !editingCertificateData} className={cn((selectedPatient || editingCertificateData) && "bg-muted/50")} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="patientPhone" render={({ field }) => (
                <FormItem>
                  <FormLabel>Teléfono</FormLabel>
                  <FormControl><Input {...field} readOnly={!!selectedPatient && !editingCertificateData} className={cn((selectedPatient || editingCertificateData) && "bg-muted/50")} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="attentionId" render={({ field }) => (
                <FormItem>
                  <FormLabel>Atención No.</FormLabel>
                  <FormControl><Input {...field} readOnly className="bg-muted/50" /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="dateOfAttentionNumeric" render={({ field }) => (
                <FormItem>
                  <FormLabel>Fecha de Atención (Numérico)</FormLabel>
                  <FormControl><Input {...field} readOnly className="bg-muted/50" /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="dateOfAttentionWritten" render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Fecha de Atención (Escrito)</FormLabel>
                  <FormControl><Input {...field} readOnly className="bg-muted/50" /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="attendedAtLocation" render={({ field }) => (
                <FormItem className="md:col-span-3">
                  <FormLabel>Fue atendido/a en</FormLabel>
                  <FormControl><Input {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>
          </div>

          <div className="space-y-4 p-4 border rounded-md shadow-sm bg-card">
            <h3 className="text-lg font-medium text-primary">Información Clínica</h3>
            <FormField control={form.control} name="diagnosis" render={({ field }) => (
              <FormItem>
                <FormLabel>Diagnóstico(s)</FormLabel>
                <FormControl><Textarea {...field} rows={3} placeholder="Ingrese el diagnóstico..." /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="procedure" render={({ field }) => (
              <FormItem>
                <FormLabel>Procedimiento(s) - Fecha(s)</FormLabel>
                <FormControl><Textarea {...field} rows={3} placeholder="Describa procedimientos y fechas..." /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="observations" render={({ field }) => (
              <FormItem>
                <FormLabel>Observaciones</FormLabel>
                <FormControl><Textarea {...field} rows={4} placeholder="Ingrese observaciones adicionales..." /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </div>
          
          <div className="space-y-4 p-4 border rounded-md shadow-sm bg-card">
            <h3 className="text-lg font-medium text-primary">Información Adicional Referida por Paciente</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField control={form.control} name="patientWorkplace" render={({ field }) => (
                <FormItem>
                  <FormLabel>Lugar de Trabajo (paciente)</FormLabel>
                  <FormControl><Input {...field} placeholder="Ej: Unidad Educativa X" /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="patientWorkActivity" render={({ field }) => (
                <FormItem>
                  <FormLabel>Actividad Laboral (paciente)</FormLabel>
                  <FormControl><Input {...field} placeholder="Ej: Estudiante" /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="contingencyType" render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de Contingencia</FormLabel>
                  <FormControl><Input {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="symptomsPresent" render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Presenta Síntomas</FormLabel>
                  <FormControl>
                    <div className="flex items-center space-x-4 pt-2">
                      <div className="flex items-center space-x-2">
                        <input type="radio" id="symptomsYes" {...form.register("symptomsPresent")} value="SI" className="form-radio h-4 w-4 text-primary"/>
                        <label htmlFor="symptomsYes">Sí</label>
                      </div>
                      <div className="flex items-center space-x-2">
                         <input type="radio" id="symptomsNo" {...form.register("symptomsPresent")} value="NO" className="form-radio h-4 w-4 text-primary"/>
                         <label htmlFor="symptomsNo">No</label>
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              {form.watch("symptomsPresent") === "SI" && (
                <FormField control={form.control} name="symptomsDescription" render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Descripción de Síntomas</FormLabel>
                    <FormControl><Textarea {...field} rows={2} placeholder="Describa los síntomas..." /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              )}
            </div>
          </div>

          <div className="space-y-4 p-6 border rounded-md shadow-sm bg-card mt-8 text-center">
            <p className="text-sm text-muted-foreground">Firma / Sello del Médico</p>
            <div className="border-t-2 border-dashed border-foreground w-1/2 mx-auto my-8 h-12 flex items-center justify-center">
            </div>
            <p className="font-semibold">{form.getValues("doctorName")}</p>
            <p className="text-sm">{form.getValues("doctorSpecialty")}</p>
            <p className="text-sm">MSP: {form.getValues("doctorMsp")}</p>
            <p className="text-sm">Email: {form.getValues("doctorEmail")}</p>
          </div>

          <div className="flex justify-end space-x-4 pt-8">
            <Button type="button" variant="outline" onClick={clearForm}>
              <Icon name="Trash2" className="mr-2"/> Limpiar Formulario
            </Button>
            <Button type="submit" disabled={form.formState.isSubmitting}>
              <Icon name={editingCertificateData ? "Save" : "FileText"} className="mr-2"/>
              {form.formState.isSubmitting
                ? (editingCertificateData ? "Actualizando..." : "Generando...")
                : (editingCertificateData ? "Actualizar Certificado" : "Generar Certificado")}
            </Button>
          </div>
        </form>
      </Form>

      {generatedCertificates.length > 0 && (
        <Card className="mt-12 shadow-lg">
          <CardHeader>
            <CardTitle>Certificados Generados</CardTitle>
            <CardDescription>Lista de certificados médicos generados recientemente.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Atención No.</TableHead>
                  <TableHead>Paciente</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Diagnóstico Principal</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {generatedCertificates.map((cert) => (
                  <TableRow key={cert.attentionId}>
                    <TableCell className="font-medium">{cert.attentionId}</TableCell>
                    <TableCell>{cert.patientFullName}</TableCell>
                    <TableCell>{cert.dateOfAttentionNumeric}</TableCell>
                    <TableCell>{cert.diagnosis.substring(0,50)}{cert.diagnosis.length > 50 ? "..." : ""}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Abrir menú</span>
                            <Icon name="MoreHorizontal" className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handlePrintCertificate(cert)}>
                            <Icon name="Printer" className="mr-2 h-4 w-4" />
                            Imprimir
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEditCertificate(cert)}>
                            <Icon name="FileEdit" className="mr-2 h-4 w-4" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDeleteCertificate(cert.attentionId)}
                            className="text-destructive focus:text-destructive focus:bg-destructive/10"
                          >
                            <Icon name="Trash2" className="mr-2 h-4 w-4" />
                            Eliminar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

