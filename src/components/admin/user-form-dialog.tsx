
"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { UserForm } from "@/components/admin/user-form";
import type { UserManagementFormValues } from "@/lib/schemas";
import { useToast } from "@/hooks/use-toast";
import type React from "react";
import { useState } from "react";
import { Icon } from "../icons";

interface UserFormDialogProps {
  mode: "add" | "edit";
  defaultValues?: Partial<UserManagementFormValues>;
  triggerButton?: React.ReactNode; 
  onSuccess?: (data: UserManagementFormValues) => void; 
}

export function UserFormDialog({ mode, defaultValues, triggerButton, onSuccess }: UserFormDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (values: UserManagementFormValues) => {
    console.log("User form submitted:", values);
    await new Promise(resolve => setTimeout(resolve, 1000));

    toast({
      title: mode === "add" ? "Usuario Creado" : "Usuario Actualizado",
      description: `El usuario ${values.fullName} ha sido ${mode === "add" ? "creado" : "actualizado"} correctamente.`,
    });
    onSuccess?.(values);
    setIsOpen(false); 
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {triggerButton || (
          <Button>
            {mode === "add" ? (
              <>
                <Icon name="PlusCircle" className="mr-2 h-4 w-4" /> Añadir Nuevo Usuario
              </>
            ) : (
              "Editar Usuario"
            )}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{mode === "add" ? "Añadir Nuevo Usuario Médico" : "Editar Usuario Médico"}</DialogTitle>
          <DialogDescription>
            {mode === "add"
              ? "Complete los detalles a continuación para crear una nueva cuenta de usuario médico."
              : "Actualice los detalles de la cuenta de usuario médico."}
          </DialogDescription>
        </DialogHeader>
        <UserForm onSubmit={handleSubmit} defaultValues={defaultValues} mode={mode} />
      </DialogContent>
    </Dialog>
  );
}

