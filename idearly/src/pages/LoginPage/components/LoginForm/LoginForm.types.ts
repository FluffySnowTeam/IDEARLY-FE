import { UseFormRegister, FieldErrors } from "react-hook-form";

export interface FormFields {
  email: string;
  password: string;
}

export interface ILoginFormProps {
  register: UseFormRegister<FormFields>;
  errors: FieldErrors<FormFields>;
}
