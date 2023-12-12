import { UseFormWatch, UseFormRegisterReturn } from "react-hook-form";
export interface IValidationInput {
  label: string;
  type: string;
  placeholder: string;
  watch?: UseFormWatch<{
    email: string;
    password: string;
    confirmPassword: string;
  }>;
  errors:
    | {
        message?: string;
      }
    | undefined;
  register: UseFormRegisterReturn;
}
