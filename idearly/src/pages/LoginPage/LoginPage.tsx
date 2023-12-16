import { SignupPageConfig } from "../../constants";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as S from "./LoginPage.styles";
import { LoginForm } from "./components";
import { LOGIN_SCHEMA, RegisterSchemaType } from "../../schemas/login.schema";
import { useLoginMutation } from "../../hooks";
import { IUserRequest } from "../../types";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const {
    register,
    formState: { errors, isDirty },
    watch,
    handleSubmit,
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(LOGIN_SCHEMA),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
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

  const { mutate } = useLoginMutation();
  const handleLogin = (data: IUserRequest) => {
    mutate(data);
  };

  const navigate = useNavigate();

  const handleMoveToSignup = () => {
    navigate("/signup");
  };

  return (
    <div>
      <S.LoginWrapper onSubmit={handleSubmit(handleLogin)}>
        <S.LoginTitle>
          <S.Title>{SignupPageConfig.title}</S.Title>
          <S.SiteName>{SignupPageConfig.SiteName}</S.SiteName>
        </S.LoginTitle>
        <S.CardContainer align="center">
          <S.CardHeaderSection>
            <S.CardHeading size="md">로그인</S.CardHeading>
          </S.CardHeaderSection>
          <S.CardBodySection>
            <LoginForm register={register} errors={errors} />
          </S.CardBodySection>
          <S.SignupPrompt>
            회원이 아니신가신가요?
            <div onClick={handleMoveToSignup}>회원가입하기</div>
          </S.SignupPrompt>
          <S.CardFooterSection>
            <S.SubmitButton
              disabled={!isNoneOfTheConditionsTrue}
              colorScheme="blue"
              type="submit"
            >
              로그인하기
            </S.SubmitButton>
          </S.CardFooterSection>
        </S.CardContainer>
      </S.LoginWrapper>
    </div>
  );
};
