import { PropsWithChildren } from "react";
import type { IValidationInput } from "./SignupValidationInput.types";
import * as S from "./SignupValidationInput.styles";
import { useEmailCheckMutation } from "../../../../hooks/useSignupMutation";

export const SignupValidationInput = ({
  label,
  type,
  placeholder,
  errors,
  register,
  watch,
}: PropsWithChildren<IValidationInput>) => {
  const isEmailInput = type === "email";
  const isError = errors && errors.message;
  const emailValue = watch?.("email");

  const { mutate: checkEmailMutate } = useEmailCheckMutation();
  const handleEmailCheck = () => {
    if (emailValue) {
      checkEmailMutate(emailValue);
    }
  };

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
          <S.ValidationButton
            onClick={handleEmailCheck}
            disabled={!emailValue || !!isError}
          >
            중복검사
          </S.ValidationButton>
        )}
      </S.ValidationInputContainer>
      {isError && <S.InputErrorMessage>{errors.message}</S.InputErrorMessage>}
    </>
  );
};
