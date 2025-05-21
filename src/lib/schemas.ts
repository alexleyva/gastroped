
import { z } from "zod";

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

export const patientSchema = z.object({
  fullName: z.string().min(2, { message: "El nombre completo debe tener al menos 2 caracteres." }),
  identificationNumber: z.string().min(5, { message: "El número de identificación debe tener al menos 5 caracteres." }),
  dateOfBirth: z.date({ required_error: "La fecha de nacimiento es requerida."}),
  age: z.number().optional(), // Optional as it can be calculated
});

export const parentSchema = z.object({
  fullName: z.string().min(2, { message: "El nombre completo debe tener al menos 2 caracteres." }),
  age: z.union([z.number().int().positive().optional(), z.string().optional()]).optional(),
  address: z.string().optional(),
  phone: z.string().regex(phoneRegex, 'Número de teléfono inválido').or(z.literal('')).optional(),
  occupation: z.string().optional(),
});

export const appointmentSchema = z.object({
  appointmentDate: z.date({ required_error: "La fecha de la cita es requerida." }),
  appointmentTime: z.string().min(1, {message: "La hora de la cita es requerida."}), 
  fileNumber: z.string().min(1, { message: "El número de expediente es requerido." }),
  insuranceName: z.string().optional(),
  pediatricianName: z.string().optional(),
  referringPerson: z.string().optional(),
});

export const anthropometricSchema = z.object({
  weight: z.union([z.number().positive("El peso debe ser positivo.").optional(), z.string().optional()]).optional(),
  height: z.union([
    z.number().positive("La talla debe ser positiva.").min(1, "La talla es requerida para validación crítica."),
    z.string().min(1, "La talla es requerida para validación crítica.").refine(val => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {message: "La talla debe ser un número positivo."})
  ]).optional(), 
  temperature: z.union([z.number().optional(), z.string().optional()]).optional(), 
  cardiacFrequency: z.union([z.number().int().positive("La frecuencia cardíaca debe ser un entero positivo.").optional(), z.string().optional()]).optional(),
  oxygenSaturation: z.union([z.number().int().min(0).max(100, "La saturación de oxígeno debe estar entre 0 y 100.").optional(), z.string().optional()]).optional(),
});

export const medicalEvaluationSchema = z.object({
  reasonForConsultation: z.string().min(1, { message: "El motivo de consulta es requerido." }),
  currentIllnessDescription: z.string().min(1, { message: "La descripción de la enfermedad actual es requerida." }),
  upperDigestiveSymptoms: z.string().optional(),
  lowerDigestiveSymptoms: z.string().optional(),
  bowelHabits: z.string().optional(),
  anthropometrics: anthropometricSchema,
  generalObservations: z.string().optional(),
  systemsReview: z.string().optional(),
  perinatalHistory: z.string().optional(),
  nutritionHistory: z.string().optional(),
  developmentHistory: z.string().optional(),
  immunizations: z.string().optional(),
  personalMedicalHistory: z.string().optional(),
  familyMedicalHistory: z.string().optional(),
  objectiveExamination: z.string().optional(), 
  paraclinicalTests: z.string().optional(),
  diagnosticImpressions: z.string().min(1, { message: "Las impresiones diagnósticas son requeridas." }),
  actionPlan: z.string().min(1, { message: "El plan de acción es requerido." }),
});


export const labExamFileSchema = z.object({
  id: z.string(),
  fileName: z.string(),
  fileType: z.string(),
  fileUrl: z.string().url(),
  uploadedAt: z.date(),
  category: z.enum(['lab', 'imaging']),
});

export const evaluationSchema = z.object({
  appointmentDetails: appointmentSchema,
  patientData: patientSchema,
  motherData: parentSchema,
  fatherData: parentSchema,
  medicalEvaluation: medicalEvaluationSchema,
  labExams: z.array(labExamFileSchema).optional(),
});

export type EvaluationFormValues = z.infer<typeof evaluationSchema>;


export const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Por favor, ingrese una dirección de correo electrónico válida." }),
});

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

// User Management Schema
export const userManagementSchema = z.object({
  id: z.string().optional(), 
  fullName: z.string().min(2, { message: "El nombre completo debe tener al menos 2 caracteres." }),
  email: z.string().email({ message: "Por favor, ingrese una dirección de correo electrónico válida." }),
  password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres." }).optional(),
  confirmPassword: z.string().min(6, { message: "La confirmación de contraseña es requerida." }).optional(),
  role: z.enum(["doctor", "admin"]).default("doctor"),
  specialty: z.string().optional(),
  medicalRegistrationNumber: z.string().optional(),
  phoneNumber: z.string().regex(phoneRegex, 'Número de teléfono inválido').or(z.literal('')).optional(),
  consultationAddress: z.string().optional(),
}).refine((data) => {
  if (data.password && data.password.length > 0) { 
    return data.password === data.confirmPassword;
  }
  return true; 
}, {
  message: "Las contraseñas no coinciden.",
  path: ["confirmPassword"], 
}).refine((data) => {
  if (data.password && data.password.length > 0 && !data.confirmPassword) {
    return false;
  }
  return true;
}, {
  message: "Se requiere la confirmación de la contraseña al establecer una nueva contraseña.",
  path: ["confirmPassword"],
});

export type UserManagementFormValues = z.infer<typeof userManagementSchema>;

