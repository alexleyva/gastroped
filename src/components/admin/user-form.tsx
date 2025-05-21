
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
import { Icon } from "@/components/icons";
import type { UserManagementFormValues } from "@/lib/schemas";
import { userManagementSchema } from "@/lib/schemas";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea"; 

interface UserFormProps {
  onSubmit: (values: UserManagementFormValues) => Promise<void> | void; 
  defaultValues?: Partial<UserManagementFormValues>;
  mode?: "add" | "edit";
}

export function UserForm({ onSubmit, defaultValues, mode = "add" }: UserFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const currentSchema = mode === "add"
    ? userManagementSchema.extend({
        password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres." }),
        confirmPassword: z.string().min(6, { message: "La confirmación de contraseña es requerida." }),
      })
    : userManagementSchema.extend({ 
        password: z.string().optional().refine(val => !val || val.length === 0 || val.length >= 6, {
          message: "La contraseña debe tener al menos 6 caracteres si se proporciona.",
        }),
        confirmPassword: z.string().optional(),
      });


  const form = useForm<UserManagementFormValues>({
    resolver: zodResolver(currentSchema),
    defaultValues: {
      fullName: defaultValues?.fullName || "",
      email: defaultValues?.email || "",
      password: "", 
      confirmPassword: "",
      role: defaultValues?.role || "doctor",
      specialty: defaultValues?.specialty || "",
      medicalRegistrationNumber: defaultValues?.medicalRegistrationNumber || "",
      phoneNumber: defaultValues?.phoneNumber || "",
      consultationAddress: defaultValues?.consultationAddress || "",
    },
  });

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  const handleFormSubmit = async (values: UserManagementFormValues) => {
    await onSubmit(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre Completo</FormLabel>
              <FormControl>
                <Input placeholder="ej., Dr. Juan Pérez" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correo Electrónico</FormLabel>
              <FormControl>
                <Input type="email" placeholder="correo@ejemplo.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="specialty"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Especialidad</FormLabel>
              <FormControl>
                <Input placeholder="ej., Gastroenterología Pediátrica" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="medicalRegistrationNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Número de Registro Médico (MSP)</FormLabel>
              <FormControl>
                <Input placeholder="ej., MSP-12345" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Número de Teléfono</FormLabel>
              <FormControl>
                <Input type="tel" placeholder="ej., +1234567890" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="consultationAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dirección de Consulta</FormLabel>
              <FormControl>
                <Textarea placeholder="Ingrese la dirección completa de la consulta" {...field} rows={3} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{mode === 'edit' ? 'Nueva Contraseña (opcional)' : 'Contraseña'}</FormLabel>
              <FormControl>
                <div className="relative">
                   <Icon name="KeyRound" className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                   <Input 
                    type={showPassword ? "text" : "password"} 
                    placeholder={mode === 'edit' ? "Dejar en blanco para mantener actual" : "Ingrese contraseña"}
                    {...field} 
                    className="pl-10 pr-10" 
                  />
                   <Button 
                    type="button" 
                    variant="ghost" 
                    size="icon" 
                    onClick={togglePasswordVisibility} 
                    className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 text-muted-foreground hover:bg-transparent hover:text-primary"
                    aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                  >
                    <Icon name={showPassword ? "EyeOff" : "Eye"} className="h-4 w-4" />
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{mode === 'edit' ? 'Confirmar Nueva Contraseña' : 'Confirmar Contraseña'}</FormLabel>
              <FormControl>
                 <div className="relative">
                   <Icon name="KeyRound" className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                   <Input 
                    type={showConfirmPassword ? "text" : "password"} 
                    placeholder={mode === 'edit' ? "Confirmar si se establece nueva contraseña" : "Confirmar contraseña"}
                    {...field} 
                    className="pl-10 pr-10" 
                  />
                   <Button 
                    type="button" 
                    variant="ghost" 
                    size="icon" 
                    onClick={toggleConfirmPasswordVisibility} 
                    className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 text-muted-foreground hover:bg-transparent hover:text-primary"
                    aria-label={showConfirmPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                  >
                    <Icon name={showConfirmPassword ? "EyeOff" : "Eye"} className="h-4 w-4" />
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting
            ? (mode === "add" ? "Creando Usuario..." : "Guardando Cambios...")
            : (mode === "add" ? "Crear Usuario" : "Guardar Cambios")}
        </Button>
      </form>
    </Form>
  );
}

