
"use client";

import type { Control, UseFormSetValue } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format, differenceInYears } from "date-fns";
import { es } from "date-fns/locale"; // Import Spanish locale
import { CalendarDays } from "lucide-react";
import type { EvaluationFormValues } from "@/lib/schemas";
import { FormInputWrapper } from "./form-field-wrapper";
import { SectionCard } from "./section-card";
import React from "react";


interface PatientDataSectionProps {
  control: Control<EvaluationFormValues>;
  setValue: UseFormSetValue<EvaluationFormValues>;
}

export function PatientDataSection({ control, setValue }: PatientDataSectionProps) {

  const handleDateOfBirthChange = (date: Date | undefined) => {
    setValue("patientData.dateOfBirth", date, { shouldValidate: true });
    if (date) {
      const age = differenceInYears(new Date(), date);
      setValue("patientData.age", age, { shouldValidate: true });
    } else {
      setValue("patientData.age", undefined);
    }
  };


  return (
    <SectionCard title="Datos del Paciente" iconName="User" description="Registre la información personal del paciente.">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInputWrapper
          control={control}
          name="patientData.fullName"
          label="Nombre Completo"
          required
          renderInput={(field) => <Input {...field} placeholder="ej., Alex Johnson" />}
        />
        <FormInputWrapper
          control={control}
          name="patientData.identificationNumber"
          label="Número de Identificación"
          required
          renderInput={(field) => <Input {...field} placeholder="ej., ID123456789" />}
        />
        <FormInputWrapper
          control={control}
          name="patientData.dateOfBirth"
          label="Fecha de Nacimiento"
          required
          renderInput={(field) => (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  <CalendarDays className="mr-2 h-4 w-4" />
                  {field.value ? format(field.value, "PPP", { locale: es }) : <span>Seleccione una fecha</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={(date) => {
                    field.onChange(date); // Ensure RHF's onChange is called
                    handleDateOfBirthChange(date);
                  }}
                  defaultMonth={field.value || new Date(new Date().setFullYear(new Date().getFullYear() - 5))} // Default to 5 years ago for pediatric context
                  captionLayout="dropdown-buttons"
                  fromYear={new Date().getFullYear() - 100} // Allow up to 100 years back
                  toYear={new Date().getFullYear()}
                  disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                  locale={es} // Add locale to calendar
                />
              </PopoverContent>
            </Popover>
          )}
        />
        <FormInputWrapper
          control={control}
          name="patientData.age"
          label="Edad (Años)"
          renderInput={(field) => (
            <Input 
              {...field} 
              type="number" 
              placeholder="Calculada automáticamente" 
              readOnly 
              value={field.value === undefined ? "" : field.value}
              className="bg-muted/50"
            />
          )}
        />
      </div>
    </SectionCard>
  );
}

