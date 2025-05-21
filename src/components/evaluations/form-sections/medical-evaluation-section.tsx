
"use client";

import type { Control } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { EvaluationFormValues } from "@/lib/schemas";
import { FormInputWrapper } from "./form-field-wrapper";
import { SectionCard } from "./section-card";

interface MedicalEvaluationSectionProps {
  control: Control<EvaluationFormValues>;
}

// Helper to format labels from camelCase to Title Case Spanish
function formatLabelToSpanish(camelCase: string): string {
  const result = camelCase.replace(/([A-Z])/g, ' $1');
  const capitalized = result.charAt(0).toUpperCase() + result.slice(1);
  
  // Specific translations for history fields
  const translations: Record<string, string> = {
    "Perinatal History": "Historia Perinatal",
    "Nutrition History": "Historia Nutricional",
    "Development History": "Historia del Desarrollo",
    "Immunizations": "Inmunizaciones",
    "Personal Medical History": "Antecedentes Médicos Personales",
    "Family Medical History": "Antecedentes Médicos Familiares",
  };
  
  return translations[capitalized] || capitalized;
}


export function MedicalEvaluationSection({ control }: MedicalEvaluationSectionProps) {
  return (
    <SectionCard title="Evaluación Médica" iconName="Stethoscope" description="Información clínica detallada e historial del paciente.">
      <div className="space-y-6">
        <div>
          <h4 className="text-lg font-medium mb-2 text-primary">Información Clínica</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 border rounded-md bg-background/50">
            <FormInputWrapper
              control={control}
              name="medicalEvaluation.reasonForConsultation"
              label="Motivo de Consulta"
              required
              renderInput={(field) => <Textarea {...field} placeholder="Describa el motivo principal de la visita..." rows={3} />}
              className="md:col-span-2"
            />
            <FormInputWrapper
              control={control}
              name="medicalEvaluation.currentIllnessDescription"
              label="Descripción de la Enfermedad Actual"
              required
              renderInput={(field) => <Textarea {...field} placeholder="Descripción detallada de la enfermedad actual..." rows={4} />}
              className="md:col-span-2"
            />
            <FormInputWrapper
              control={control}
              name="medicalEvaluation.upperDigestiveSymptoms"
              label="Síntomas Digestivos Superiores"
              renderInput={(field) => <Textarea {...field} placeholder="ej., Náuseas, vómitos, reflujo..." rows={2} />}
            />
            <FormInputWrapper
              control={control}
              name="medicalEvaluation.lowerDigestiveSymptoms"
              label="Síntomas Digestivos Inferiores"
              renderInput={(field) => <Textarea {...field} placeholder="ej., Hinchazón, dolor abdominal, flatulencia..." rows={2} />}
            />
          </div>
        </div>

        <div>
          <h4 className="text-lg font-medium mb-2 text-primary">Datos Adicionales y Mediciones</h4>
           <div className="p-4 border rounded-md bg-background/50 space-y-6">
            <FormInputWrapper
              control={control}
              name="medicalEvaluation.bowelHabits"
              label="Hábitos Intestinales"
              renderInput={(field) => <Textarea {...field} placeholder="ej., Regularidad de las deposiciones, consistencia..." rows={2} />}
            />
            <div>
              <h5 className="text-md font-medium mb-2 text-foreground">Medidas Antropométricas</h5>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <FormInputWrapper
                  control={control}
                  name="medicalEvaluation.anthropometrics.weight"
                  label="Peso (kg)"
                  renderInput={(field) => <Input type="number" step="0.1" {...field} placeholder="ej., 25.5" onChange={e => field.onChange(e.target.value === '' ? undefined : Number(e.target.value))} value={field.value ?? ""} />}
                />
                <FormInputWrapper
                  control={control}
                  name="medicalEvaluation.anthropometrics.height"
                  label="Talla (cm)"
                  required
                  renderInput={(field) => <Input type="number" step="0.1" {...field} placeholder="ej., 120.0" onChange={e => field.onChange(e.target.value === '' ? undefined : Number(e.target.value))} value={field.value ?? ""} />}
                />
                <FormInputWrapper
                  control={control}
                  name="medicalEvaluation.anthropometrics.temperature"
                  label="Temperatura (°C)"
                  renderInput={(field) => <Input type="number" step="0.1" {...field} placeholder="ej., 36.5" onChange={e => field.onChange(e.target.value === '' ? undefined : Number(e.target.value))} value={field.value ?? ""} />}
                />
                 <FormInputWrapper
                  control={control}
                  name="medicalEvaluation.anthropometrics.cardiacFrequency"
                  label="Frecuencia Cardíaca (Fc)"
                  renderInput={(field) => <Input type="number" step="1" {...field} placeholder="ej., 80 lpm" onChange={e => field.onChange(e.target.value === '' ? undefined : Number(e.target.value))} value={field.value ?? ""} />}
                />
                <FormInputWrapper
                  control={control}
                  name="medicalEvaluation.anthropometrics.oxygenSaturation"
                  label="Saturación de Oxígeno (SpO2 %)"
                  renderInput={(field) => <Input type="number" step="1" min="0" max="100" {...field} placeholder="ej., 98" onChange={e => field.onChange(e.target.value === '' ? undefined : Number(e.target.value))} value={field.value ?? ""} />}
                />
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="text-lg font-medium mb-2 text-primary">Historial del Paciente</h4>
           <div className="p-4 border rounded-md bg-background/50 space-y-6">
            {(['perinatalHistory', 'nutritionHistory', 'developmentHistory', 'immunizations', 'personalMedicalHistory', 'familyMedicalHistory'] as const).map((historyField) => (
                <FormInputWrapper
                  key={historyField}
                  control={control}
                  name={`medicalEvaluation.${historyField}`}
                  label={formatLabelToSpanish(historyField)}
                  renderInput={(field) => <Textarea {...field} placeholder={`Detalles sobre ${formatLabelToSpanish(historyField).toLowerCase()}...`} rows={3} />}
                />
              ))}
          </div>
        </div>

        <div>
          <h4 className="text-lg font-medium mb-2 text-primary">Examen y Plan</h4>
           <div className="p-4 border rounded-md bg-background/50 space-y-6">
            <FormInputWrapper
              control={control}
              name="medicalEvaluation.generalObservations"
              label="Observaciones Generales"
              renderInput={(field) => <Textarea {...field} placeholder="Observaciones generales sobre el paciente..." rows={3} />}
            />
            <FormInputWrapper
              control={control}
              name="medicalEvaluation.systemsReview"
              label="Revisión Actual por Sistemas"
              renderInput={(field) => <Textarea {...field} placeholder="Revisión de los sistemas actuales..." rows={3} />}
            />
            <FormInputWrapper
              control={control}
              name="medicalEvaluation.objectiveExamination"
              label="Objetivo (Examen Físico)"
              renderInput={(field) => <Textarea {...field} placeholder="Describa los hallazgos del examen físico..." rows={4} />}
            />
            <FormInputWrapper
              control={control}
              name="medicalEvaluation.paraclinicalTests"
              label="Exámenes Paraclínicos"
              renderInput={(field) => <Textarea {...field} placeholder="Detalles de cualquier examen paraclínico realizado u ordenado..." rows={3} />}
            />
            <FormInputWrapper
              control={control}
              name="medicalEvaluation.diagnosticImpressions"
              label="Impresiones Diagnósticas"
              required
              renderInput={(field) => <Textarea {...field} placeholder="Resuma las impresiones diagnósticas..." rows={3} />}
            />
            <FormInputWrapper
              control={control}
              name="medicalEvaluation.actionPlan"
              label="Plan de Acción"
              required
              renderInput={(field) => <Textarea {...field} placeholder="Describa el plan de acción..." rows={4} />}
            />
          </div>
        </div>
      </div>
    </SectionCard>
  );
}

