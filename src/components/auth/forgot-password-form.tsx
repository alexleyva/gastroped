
"use client";

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
import { useToast } from "@/hooks/use-toast";
import { Icon } from "@/components/icons";
import { forgotPasswordSchema, type ForgotPasswordFormValues } from "@/lib/schemas";

export function ForgotPasswordForm() {
  const { toast } = useToast();

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(data: ForgotPasswordFormValues) {
    // Placeholder for actual password reset logic
    console.log("Forgot password data:", data);
    await new Promise(resolve => setTimeout(resolve, 1000)); 

    // In a real application, you would call an API endpoint here.
    // For security reasons, always show a generic message regardless of whether the email exists.
    toast({
      title: "Revise Su Correo Electrónico",
      description: "Si existe una cuenta para este correo electrónico, recibirá instrucciones para restablecer la contraseña en breve.",
    });
    form.reset(); 
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dirección de Correo Electrónico</FormLabel>
              <FormControl>
                <div className="relative">
                  <Icon name="Mail" className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input placeholder="correo@ejemplo.com" {...field} className="pl-10"/>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Enviando..." : "Enviar Enlace de Restablecimiento"}
        </Button>
      </form>
    </Form>
  );
}

