
"use client";

import type { Control } from "react-hook-form";
import { Input } from "@/components/ui/input";
import type { EvaluationFormValues } from "@/lib/schemas";
import { FormInputWrapper } from "./form-field-wrapper";
import { SectionCard } from "./section-card";

interface ParentalDataSectionProps {
  control: Control<EvaluationFormValues>;
}

function ParentSubSection({ control, parentType }: { control: Control<EvaluationFormValues>; parentType: "motherData" | "fatherData" }) {
  const title = parentType === "motherData" ? "Detalles de la Madre" : "Detalles del Padre";
  return (
    <div className="space-y-4 p-4 border rounded-md bg-background/50">
       <h4 className="text-lg font-medium text-foreground">{title}</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInputWrapper
          control={control}
          name={`${parentType}.fullName`}
          label="Nombre Completo"
          required
          renderInput={(field) => <Input {...field} placeholder="ej., Jane Doe" />}
        />
        <FormInputWrapper
          control={control}
          name={`${parentType}.age`}
          label="Edad"
          renderInput={(field) => <Input type="number" {...field} placeholder="ej., 35" onChange={e => field.onChange(e.target.value === '' ? undefined : Number(e.target.value))} value={field.value ?? ""} />}
        />
        <FormInputWrapper
          control={control}
          name={`${parentType}.address`}
          label="Dirección"
          renderInput={(field) => <Input {...field} placeholder="ej., Calle Principal 123, CualquierCiudad" />}
          className="md:col-span-2"
        />
        <FormInputWrapper
          control={control}
          name={`${parentType}.phone`}
          label="Número de Teléfono"
          renderInput={(field) => <Input type="tel" {...field} placeholder="ej., (555) 123-4567" />}
        />
        <FormInputWrapper
          control={control}
          name={`${parentType}.occupation`}
          label="Ocupación"
          renderInput={(field) => <Input {...field} placeholder="ej., Profesor(a)" />}
        />
      </div>
    </div>
  );
}


export function ParentalDataSection({ control }: ParentalDataSectionProps) {
  return (
    <SectionCard title="Datos de los Padres" iconName="Users2" description="Recopile información sobre los padres o tutores del paciente.">
      <div className="space-y-8">
        <ParentSubSection control={control} parentType="motherData" />
        <ParentSubSection control={control} parentType="fatherData" />
      </div>
    </SectionCard>
  );
}

