import { PropsWithChildren } from "react";
import * as S from "./LoginVaildationInput.styles";
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

export const LoginVaildationInput = ({
  label,
  type,
  placeholder,
  errors,
  register,
}: PropsWithChildren<IValidationInput>) => {
  const isError = errors && errors.message;
  return (
    <>
      <S.ValidationInputContainer errors={errors}>
        <S.ValidationInputWrapper>
          <label>{label}</label>
          <S.ValidationInput
            type={type}
            placeholder={placeholder}
            {...register}
          />
        </S.ValidationInputWrapper>
      </S.ValidationInputContainer>
      {isError && <S.InputErrorMessage>{errors.message}</S.InputErrorMessage>}
    </>
  );
};
