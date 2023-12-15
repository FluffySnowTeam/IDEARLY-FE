import { UseFormWatch, UseFormRegister, FieldErrors } from "react-hook-form";

export interface FormFields {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
}

export interface SignupFormProps {
  register: UseFormRegister<FormFields>;
  errors: FieldErrors<FormFields>;
  watch: UseFormWatch<FormFields>;
}
