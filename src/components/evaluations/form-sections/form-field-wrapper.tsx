import type React from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import type { Control, FieldPath, FieldValues } from "react-hook-form";

interface FormFieldWrapperProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  required?: boolean;
}

export function FormFieldWrapper<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  description,
  children,
  className,
  required = false,
}: FormFieldWrapperProps<TFieldValues>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </FormLabel>
          <FormControl>{children}</FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

// Specialized wrapper for input fields
interface FormInputProps<TFieldValues extends FieldValues>
  extends Omit<FormFieldWrapperProps<TFieldValues>, "children"> {
  renderInput: (field: any) => React.ReactNode; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export function FormInputWrapper<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  description,
  renderInput,
  className,
  required = false,
}: FormInputProps<TFieldValues>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
           <FormLabel>
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </FormLabel>
          <FormControl>{renderInput(field)}</FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
