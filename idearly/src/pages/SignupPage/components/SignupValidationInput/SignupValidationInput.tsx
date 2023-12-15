import { PropsWithChildren } from "react";
import { IValidationInput } from "./SignupValidationInput.types";
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

  // 수정될 수 있음
  const { mutate: emailCheckMutate } = useEmailCheckMutation();
  const handleEmailCheck = () => {
    if (emailValue) {
      emailCheckMutate({ email: emailValue });
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
