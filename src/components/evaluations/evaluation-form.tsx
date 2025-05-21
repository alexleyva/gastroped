
"use client";

import type * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { evaluationSchema } from "@/lib/schemas";
import type { FullEvaluationRecord } from "@/lib/types";

import { AppointmentSection } from "./form-sections/appointment-section";
import { PatientDataSection } from "./form-sections/patient-data-section";
import { ParentalDataSection } from "./form-sections/parental-data-section";
import { MedicalEvaluationSection } from "./form-sections/medical-evaluation-section";
import { LabExamUploadSection } from "./form-sections/lab-exam-upload-section";

const defaultValues: Partial<FullEvaluationRecord> = {
  appointmentDetails: {
    appointmentDate: undefined,
    appointmentTime: "",
    fileNumber: "",
    insuranceName: "",
    pediatricianName: "",
    referringPerson: "",
  },
  patientData: {
    fullName: "",
    identificationNumber: "",
    dateOfBirth: undefined,
  },
  motherData: {
    fullName: "",
    age: "",
    address: "",
    phone: "",
    occupation: "",
  },
  fatherData: {
    fullName: "",
    age: "",
    address: "",
    phone: "",
    occupation: "",
  },
  medicalEvaluation: {
    reasonForConsultation: "",
    currentIllnessDescription: "",
    upperDigestiveSymptoms: "",
    lowerDigestiveSymptoms: "",
    bowelHabits: "",
    anthropometrics: {
      weight: "",
      height: "",
      temperature: "",
      cardiacFrequency: "",
      oxygenSaturation: "",
    },
    generalObservations: "",
    systemsReview: "",
    perinatalHistory: "",
    nutritionHistory: "",
    developmentHistory: "",
    immunizations: "",
    personalMedicalHistory: "",
    familyMedicalHistory: "",
    objectiveExamination: "",
    paraclinicalTests: "",
    diagnosticImpressions: "",
    actionPlan: "",
  },
  labExams: [],
};

export function EvaluationForm() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof evaluationSchema>>({
    resolver: zodResolver(evaluationSchema),
    defaultValues,
    mode: "onChange", // Validate on change for better UX
  });

  async function onSubmit(data: z.infer<typeof evaluationSchema>) {
    // Placeholder for actual submission logic (e.g., API call)
    console.log("Form data submitted:", data);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    toast({
      title: "Evaluación Guardada",
      description: "La evaluación del paciente se ha guardado correctamente.",
      variant: "default",
    });
    // Optionally reset the form or redirect
    // form.reset(); 
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <AppointmentSection control={form.control} />
        <PatientDataSection control={form.control} setValue={form.setValue} />
        <ParentalDataSection control={form.control} />
        <MedicalEvaluationSection control={form.control} />
        <LabExamUploadSection control={form.control} setValue={form.setValue} />
        
        <div className="flex justify-end space-x-4 pt-8">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Limpiar Formulario
          </Button>
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? "Guardando..." : "Guardar Evaluación"}
          </Button>
        </div>
      </form>
    </Form>
  );
}

