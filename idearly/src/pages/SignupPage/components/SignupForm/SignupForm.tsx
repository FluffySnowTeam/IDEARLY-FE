import { PropsWithChildren } from "react";
import * as S from "./SignupForm.styles";
import type { SignupFormProps } from "./SignupForm.types";
import { SignupValidationInput } from "..";

export const SignupForm = ({
  register,
  errors,
  watch,
}: PropsWithChildren<SignupFormProps>) => {
  return (
    <S.SignupFormContainer>
      <SignupValidationInput
        label="이메일"
        type="email"
        watch={watch}
        placeholder="이메일을 입력해주세요."
        errors={errors?.email}
        register={register("email")}
      />
      <SignupValidationInput
        label="이름"
        type="name"
        placeholder="이름을 입력해주세요."
        errors={errors?.name}
        register={register("name")}
      />
      <SignupValidationInput
        label="비밀번호"
        type="password"
        placeholder="비밀번호를 입력해주세요."
        errors={errors?.password}
        register={register("password")}
      />
      <SignupValidationInput
        label="비밀번호 확인"
        type="password"
        placeholder="비밀번호를 다시 입력해주세요."
        errors={errors?.confirmPassword}
        register={register("confirmPassword")}
      />
    </S.SignupFormContainer>
  );
};
