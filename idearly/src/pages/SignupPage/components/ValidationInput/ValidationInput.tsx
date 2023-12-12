import { PropsWithChildren } from "react";
import * as S from "./ValidationInput.styles";
import type { IValidationInput } from "./ValidationInput.types";

export const ValidationInput = ({
  label,
  type,
  placeholder,
  errors,
  register,
}: PropsWithChildren<IValidationInput>) => {
  // 중복검사 api 로직 작성 예정
  const isEmailInput = type === "email";
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
        {isEmailInput && <S.ValidationButton>중복검사</S.ValidationButton>}
      </S.ValidationInputContainer>
      {errors && errors.message && (
        <S.InputErrorMessage>{errors.message}</S.InputErrorMessage>
      )}
    </>
  );
};
