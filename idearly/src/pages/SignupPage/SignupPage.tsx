import { SignupPageConfig } from "../../constants";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as S from "./SignupPage.styles";
import { SignupForm } from "./components";
import { RegisterSchemaType, SIGNUP_SCHEMA } from "../../schemas";
import { IUserSignupRequest } from "../../types";
import {
  useEmailCheckMutation,
  useSignupMutation,
} from "../../hooks/useSignupMutation";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { checkEmailDuplication } from "../../services/apis/user.apis";

export const SignupPage = () => {
  const {
    register,
    watch,
    formState: { errors, isDirty },
    handleSubmit,
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(SIGNUP_SCHEMA),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const watchedValues = watch();

  // 폼이 오류 상태인지 확인
  const hasErrors = Object.keys(errors).length > 0;

  // 폼이 현재 비어있는 상태인지 확인
  const isCurrentlyEmpty = Object.values(watchedValues).every(
    (value) => value === ""
  );

  const isAllFieldsFilled = Object.values(watchedValues).every(
    (value) => value !== ""
  );

  const isNoneOfTheConditionsTrue =
    isDirty && !hasErrors && !isCurrentlyEmpty && isAllFieldsFilled;

  const { mutate } = useSignupMutation();
  const handleSignup = (data: IUserSignupRequest) => {
    mutate({
      email: data.email,
      name: data.name,
      password: data.password,
    });
  };

  const navigate = useNavigate();

  const handleMoveToLogin = () => {
    navigate("/login");
  };

  return (
    <S.SignupWrapper onSubmit={handleSubmit(handleSignup)}>
      <S.SignupTitle>
        <S.Title>{SignupPageConfig.title}</S.Title>
        <S.SiteName>{SignupPageConfig.SiteName}</S.SiteName>
      </S.SignupTitle>
      <S.CardContainer align="center">
        <S.CardHeaderSection>
          <S.CardHeading size="md">회원가입</S.CardHeading>
        </S.CardHeaderSection>
        <S.CardBodySection>
          <SignupForm register={register} watch={watch} errors={errors} />
        </S.CardBodySection>
        <S.LoginPrompt>
          회원이신가요?
          <div onClick={handleMoveToLogin}>로그인하기</div>
        </S.LoginPrompt>
        <S.CardFooterSection>
          <S.SubmitButton
            type="submit"
            disabled={!isNoneOfTheConditionsTrue}
            colorScheme="blue"
          >
            회원가입하기
          </S.SubmitButton>
        </S.CardFooterSection>
      </S.CardContainer>
    </S.SignupWrapper>
  );
};
