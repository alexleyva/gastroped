
import { z } from "zod";

export const medicalCertificatePatientSearchSchema = z.object({
  searchTerm: z.string().min(1, "El término de búsqueda es requerido"),
});

export type MedicalCertificatePatientSearchValues = z.infer<typeof medicalCertificatePatientSearchSchema>;

export const medicalCertificateSchema = z.object({
  // Patient Details (some pre-filled, some from patient record)
  patientId: z.string().optional(), 
  patientFullName: z.string().min(1, "El nombre del paciente es requerido"),
  patientIdNumber: z.string().min(1, "El número de ID del paciente es requerido"), 
  patientFileNumber: z.string().min(1, "El número de historia clínica es requerido"), 
  patientAge: z.string().min(1, "La edad del paciente es requerida"),
  
  // Attention Details
  attentionId: z.string().min(1, "El ID de atención es requerido"), 
  dateOfAttentionNumeric: z.string(), 
  dateOfAttentionWritten: z.string(), 
  attendedAtLocation: z.string().default("CONSULTA EXTERNA de esta casa de salud"),

  // Clinical Information
  diagnosis: z.string().min(1, "El diagnóstico es requerido"),
  procedure: z.string().optional(),
  observations: z.string().optional(),
  
  // Additional Patient-reported Info (from example)
  patientWorkplace: z.string().optional(),
  patientWorkActivity: z.string().optional(),
  contingencyType: z.string().default("Enfermedad general"),
  symptomsPresent: z.enum(["SI", "NO"]).optional(),
  symptomsDescription: z.string().optional(),
  patientAddress: z.string().optional(),
  patientPhone: z.string().optional(),

  // Doctor Details (auto-filled based on logged-in user)
  doctorName: z.string(),
  doctorSpecialty: z.string(),
  doctorMsp: z.string(),
  doctorEmail: z.string(),
});

export type MedicalCertificateFormValues = z.infer<typeof medicalCertificateSchema>;

// Mock patient structure for search results
export interface CertificateMockPatient {
  id: string;
  name: string; 
  lastName: string; 
  idNumber: string; 
  fileNumber: string; 
  dob: string; 
  address?: string;
  phone?: string;
  lastDiagnosis?: string; 
}

