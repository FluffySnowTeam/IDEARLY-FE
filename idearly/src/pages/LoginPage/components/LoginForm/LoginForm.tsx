import { LoginVaildationInput } from "..";
import * as S from "./LoginForm.styles";
import { PropsWithChildren } from "react";
import type { ILoginFormProps } from "./LoginForm.types";

export const LoginForm = ({
  register,
  errors,
}: PropsWithChildren<ILoginFormProps>) => {
  return (
    <S.LoginFormContainer>
      <LoginVaildationInput
        label="이메일"
        type="email"
        placeholder="이메일을 입력해주세요."
        errors={errors?.email}
        register={register("email")}
      />
      <LoginVaildationInput
        label="비밀번호"
        type="password"
        placeholder="비밀번호를 입력해주세요."
        errors={errors?.password}
        register={register("password")}
      />
    </S.LoginFormContainer>
  );
};
