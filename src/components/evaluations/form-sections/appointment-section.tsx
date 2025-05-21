
"use client";

import type { Control } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { es } from "date-fns/locale"; // Import Spanish locale
import { CalendarDays, Clock } from "lucide-react";
import type { EvaluationFormValues } from "@/lib/schemas";
import { FormInputWrapper } from "./form-field-wrapper";
import { SectionCard } from "./section-card";

interface AppointmentSectionProps {
  control: Control<EvaluationFormValues>;
}

export function AppointmentSection({ control }: AppointmentSectionProps) {
  return (
    <SectionCard title="Información de Cita y Expediente" iconName="CalendarDays" description="Ingrese los detalles sobre la cita y el expediente del paciente.">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <FormInputWrapper
          control={control}
          name="appointmentDetails.appointmentDate"
          label="Fecha de la Cita"
          required
          renderInput={(field) => (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    field && !field.value && "text-muted-foreground" 
                  )}
                >
                  <CalendarDays className="mr-2 h-4 w-4" />
                  {field && field.value ? format(field.value, "PPP", { locale: es }) : <span>Seleccione una fecha</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={field ? field.value : undefined}
                  onSelect={field ? field.onChange : undefined}
                  initialFocus
                  disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                  locale={es} // Add locale to calendar
                />
              </PopoverContent>
            </Popover>
          )}
        />
        <FormInputWrapper
          control={control}
          name="appointmentDetails.appointmentTime"
          label="Hora de la Cita"
          required
          renderInput={(field) => (
            <div className="relative">
               <Input type="time" {...field} className="pr-10" />
               <Clock className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            </div>
          )}
        />
        <FormInputWrapper
          control={control}
          name="appointmentDetails.fileNumber"
          label="Número de Expediente"
          required
          renderInput={(field) => <Input {...field} placeholder="ej., PN-00123" />}
        />
        <FormInputWrapper
          control={control}
          name="appointmentDetails.insuranceName"
          label="Nombre del Seguro"
          renderInput={(field) => <Input {...field} placeholder="ej., SaludGuard Plus" />}
        />
        <FormInputWrapper
          control={control}
          name="appointmentDetails.pediatricianName"
          label="Nombre del Pediatra"
          renderInput={(field) => <Input {...field} placeholder="ej., Dra. Emily Carter" />}
        />
        <FormInputWrapper
          control={control}
          name="appointmentDetails.referringPerson"
          label="Persona que Refiere"
          renderInput={(field) => <Input {...field} placeholder="ej., Dr. John Smith o Auto-referido" />}
        />
      </div>
    </SectionCard>
  );
}

