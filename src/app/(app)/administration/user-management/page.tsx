
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Icon } from "@/components/icons";
import { UserFormDialog } from "@/components/admin/user-form-dialog";
import type { UserManagementFormValues } from "@/lib/schemas";
import { useToast } from "@/hooks/use-toast";
import { UserForm } from "@/components/admin/user-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"; 

interface ManagedUser extends UserManagementFormValues {
  id: string;
}

// Mock data for demonstration
const initialMockUsers: ManagedUser[] = [
  { 
    id: "USR001", 
    fullName: "Dr. Elena Rodriguez", 
    email: "elena.rodriguez@example.com", 
    role: "doctor", 
    password: "", 
    confirmPassword: "",
    specialty: "Gastroenterología Pediátrica",
    medicalRegistrationNumber: "MSP-ER-001",
    phoneNumber: "555-1234",
    consultationAddress: "Calle Salud 123, Ciudad Médica"
  },
  { 
    id: "USR002", 
    fullName: "Dr. Ben Carter", 
    email: "ben.carter@example.com", 
    role: "doctor", 
    password: "", 
    confirmPassword: "",
    specialty: "Pediatría General",
    medicalRegistrationNumber: "MSP-BC-002",
    phoneNumber: "555-5678",
    consultationAddress: "Avenida Bienestar 456, Saludburgo"
  },
  { 
    id: "USR003", 
    fullName: "Usuario Admin", 
    email: "admin@example.com", 
    role: "admin", 
    password: "", 
    confirmPassword: "",
  },
];


export default function UserManagementPage() {
  const [users, setUsers] = useState<ManagedUser[]>(initialMockUsers);
  const [editingUser, setEditingUser] = useState<ManagedUser | undefined>(undefined);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleAddUserSuccess = (newUser: UserManagementFormValues) => {
    const createdUser: ManagedUser = {
        ...newUser,
        id: `USR${String(users.length + 1).padStart(3, '0')}`, 
        role: newUser.role || "doctor", 
    };
    setUsers(prevUsers => [...prevUsers, createdUser]);
    toast({
      title: "Usuario Añadido",
      description: `El usuario ${createdUser.fullName} ha sido añadido correctamente.`,
      variant: "default",
    });
  };

  const handleEditUser = (user: ManagedUser) => {
    setEditingUser(user);
    setIsEditDialogOpen(true);
  };
  
  const handleUpdateUserSuccess = (updatedUserValues: UserManagementFormValues) => {
    if (!editingUser) return;
    
    const updatedUser = {
      ...editingUser, 
      ...updatedUserValues, 
      password: updatedUserValues.password && updatedUserValues.password.length > 0 ? updatedUserValues.password : editingUser.password,
      confirmPassword: updatedUserValues.confirmPassword && updatedUserValues.confirmPassword.length > 0 ? updatedUserValues.confirmPassword : editingUser.confirmPassword,
    };

    setUsers(prevUsers => 
      prevUsers.map(u => u.id === editingUser.id ? updatedUser : u)
    );
    toast({
      title: "Usuario Actualizado",
      description: `Los detalles del usuario ${updatedUser.fullName} han sido actualizados correctamente.`,
      variant: "default",
    });
    setEditingUser(undefined);
    setIsEditDialogOpen(false);
  };

  const handleDeleteUser = (userId: string) => {
    setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
    toast({
      title: "Usuario Eliminado",
      description: `El usuario con ID ${userId} ha sido eliminado.`,
      variant: "default",
    });
  };

  return (
    <div className="space-y-8">
      <section className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gestión de Usuarios</h1>
          <p className="text-muted-foreground text-lg">
            Gestionar cuentas y credenciales del personal médico.
          </p>
        </div>
        <UserFormDialog 
            mode="add" 
            onSuccess={handleAddUserSuccess}
            triggerButton={
                <Button>
                    <Icon name="PlusCircle" className="mr-2 h-4 w-4" /> Añadir Nuevo Usuario
                </Button>
            }
        />
      </section>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Usuarios Registrados</CardTitle>
          <CardDescription>Una lista de todos los usuarios médicos en el sistema.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Nombre Completo</TableHead>
                <TableHead>Correo Electrónico</TableHead>
                <TableHead>Rol</TableHead>
                <TableHead>Especialidad</TableHead>
                <TableHead>Nº MSP</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.id}</TableCell>
                  <TableCell>{user.fullName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${user.role === 'admin' ? 'bg-primary/20 text-primary' : 'bg-secondary/20 text-secondary-foreground'}`}>
                        {user.role === 'admin' ? 'Admin' : 'Médico'}
                    </span>
                  </TableCell>
                  <TableCell>{user.specialty || "N/A"}</TableCell>
                  <TableCell>{user.medicalRegistrationNumber || "N/A"}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Abrir menú</span>
                          <Icon name="MoreHorizontal" className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleEditUser(user)}>
                          <Icon name="FileEdit" className="mr-2 h-4 w-4" /> Editar Usuario
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          onClick={() => handleDeleteUser(user.id)}
                          className="text-destructive focus:text-destructive focus:bg-destructive/10"
                        >
                          <Icon name="Trash2" className="mr-2 h-4 w-4" /> Eliminar Usuario
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
              {users.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    No se encontraron usuarios.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      {editingUser && isEditDialogOpen && (
        <Dialog open={isEditDialogOpen} onOpenChange={(open) => { setIsEditDialogOpen(open); if(!open) setEditingUser(undefined);}}>
          <DialogContent className="sm:max-w-md"> 
            <DialogHeader>
              <DialogTitle>Editar Usuario Médico</DialogTitle>
              <DialogDescription>Actualice los detalles para {editingUser.fullName}.</DialogDescription>
            </DialogHeader>
            <UserForm 
                onSubmit={handleUpdateUserSuccess} 
                defaultValues={editingUser} 
                mode="edit" 
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

