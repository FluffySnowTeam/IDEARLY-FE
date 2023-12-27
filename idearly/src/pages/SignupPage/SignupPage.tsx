import { SignupPageConfig } from "../../constants";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as S from "./SignupPage.styles";
import { SignupForm } from "./components";
import { RegisterSchemaType, SIGNUP_SCHEMA } from "../../schemas";
import type { IUserSignupRequest } from "../../types";
import { useSignupMutation } from "../../hooks/useSignupMutation";
import { useNavigate } from "react-router-dom";
import { useAtomValue } from "jotai";
import { EmailCheckAtom } from "../../store/LoginPage.atoms";
import { useToast } from "@chakra-ui/react";

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
  const hasErrors = Object.keys(errors).length > 0;
  const isCurrentlyEmpty = Object.values(watchedValues).every(
    (value) => value === ""
  );
  const isAllFieldsFilled = Object.values(watchedValues).every(
    (value) => value !== ""
  );
  const isNoneOfTheConditionsTrue =
    isDirty && !hasErrors && !isCurrentlyEmpty && isAllFieldsFilled;
  const isEmailCheck = useAtomValue(EmailCheckAtom);
  const toast = useToast();
  const navigate = useNavigate();
  const { mutate } = useSignupMutation();

  const handleSignup = (data: IUserSignupRequest) => {
    if (!isEmailCheck) {
      mutate({
        email: data.email,
        name: data.name,
        password: data.password,
      });
    } else {
      toast({
        title: "이메일 중복체크를 해주세요",
        description: "이메일 중복체크를 해주세요",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
    }
  };

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
