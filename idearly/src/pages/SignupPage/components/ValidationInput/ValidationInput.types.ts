import { UseFormRegisterReturn } from "react-hook-form";
export interface IValidationInput {
  label: string;
  type: string;
  placeholder: string;
  errors:
    | {
        message?: string;
      }
    | undefined;
  register: UseFormRegisterReturn;
}
