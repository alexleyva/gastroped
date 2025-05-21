export interface Patient {
  id?: string; // Optional for new patients
  fullName: string;
  identificationNumber: string;
  dateOfBirth: Date | undefined;
  age?: number; // Can be auto-calculated
}

export interface Parent {
  fullName: string;
  age?: number | string; // number for calculation, string for input flexibility
  address?: string;
  phone?: string;
  occupation?: string;
}

export interface AppointmentDetails {
  appointmentDate: Date | undefined;
  appointmentTime: string;
  fileNumber: string;
  insuranceName?: string;
  pediatricianName?: string;
  referringPerson?: string;
}

export interface AnthropometricData {
  weight?: number | string; // kg
  height?: number | string; // cm
  temperature?: number | string; // Celsius
  cardiacFrequency?: number | string; // Beats per minute
  oxygenSaturation?: number | string; // Percentage (SpO2)
}

export interface MedicalEvaluation {
  reasonForConsultation: string;
  currentIllnessDescription: string;
  upperDigestiveSymptoms?: string;
  lowerDigestiveSymptoms?: string;
  bowelHabits?: string;
  anthropometrics: AnthropometricData;
  generalObservations?: string;
  systemsReview?: string;
  perinatalHistory?: string;
  nutritionHistory?: string;
  developmentHistory?: string;
  immunizations?: string;
  personalMedicalHistory?: string;
  familyMedicalHistory?: string;
  objectiveExamination?: string; // Physical examination
  paraclinicalTests?: string;
  diagnosticImpressions: string;
  actionPlan: string;
}

export interface FullEvaluationRecord {
  appointmentDetails: AppointmentDetails;
  patientData: Patient;
  motherData: Parent;
  fatherData: Parent;
  medicalEvaluation: MedicalEvaluation;
  labExams?: LabExamFile[]; // Array of uploaded lab exams
}

export interface LabExamFile {
  id: string;
  fileName: string;
  fileType: string; // 'pdf', 'jpeg', 'png', etc.
  fileUrl: string; // URL to access the file
  uploadedAt: Date;
  category: 'lab' | 'imaging'; // 'lab' for PDF reports, 'imaging' for images
}
