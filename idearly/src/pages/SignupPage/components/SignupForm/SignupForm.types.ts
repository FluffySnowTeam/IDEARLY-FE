import { UseFormWatch, UseFormRegister, FieldErrors } from "react-hook-form";

export interface FormFields {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface SignupFormProps {
  register: UseFormRegister<FormFields>;
  errors: FieldErrors<FormFields>;
  watch: UseFormWatch<{
    email: string;
    password: string;
    confirmPassword: string;
  }>;
}
