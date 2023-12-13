import { PropsWithChildren } from "react";
import { IValidationInput } from "./SignupValidationInput.types";
import * as S from "./SignupValidationInput.styles";

export const SignupValidationInput = ({
  label,
  type,
  placeholder,
  errors,
  register,
  watch,
}: PropsWithChildren<IValidationInput>) => {
  // 중복검사 api 로직 작성 예정
  const isEmailInput = type === "email";
  const isError = errors && errors.message;
  const emailValue = watch?.("email");

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
        {isEmailInput && (
          <S.ValidationButton disabled={!emailValue || !!isError}>
            중복검사
          </S.ValidationButton>
        )}
      </S.ValidationInputContainer>
      {isError && <S.InputErrorMessage>{errors.message}</S.InputErrorMessage>}
    </>
  );
};
