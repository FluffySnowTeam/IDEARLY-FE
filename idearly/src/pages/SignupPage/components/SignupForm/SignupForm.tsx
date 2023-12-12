import { PropsWithChildren } from "react";

import { ValidationInput } from "..";
import * as S from "./SignupForm.styles";
import { SignupFormProps } from "./SignupForm.types";

export const SignupForm = ({
  register,
  errors,
}: PropsWithChildren<SignupFormProps>) => {
  return (
    <S.SignupFormContainer>
      <ValidationInput
        label="이메일"
        type="email"
        placeholder="이메일을 입력해주세요."
        errors={errors?.email}
        register={register("email")}
      />
      <ValidationInput
        label="비밀번호"
        type="password"
        placeholder="이메일을 입력해주세요."
        errors={errors?.password}
        register={register("password")}
      />
      <ValidationInput
        label="비밀번호 확인"
        type="password"
        placeholder="이메일을 입력해주세요."
        errors={errors?.confirmPassword}
        register={register("confirmPassword")}
      />
    </S.SignupFormContainer>
  );
};
