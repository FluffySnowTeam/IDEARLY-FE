import { SignupPageConfig } from "../../constants";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as S from "./LoginPage.styles";
import { LoginForm } from "./components";
import { LOGIN_SCHEMA, RegisterSchemaType } from "../../schemas/login.schema";

export const LoginPage = () => {
  const {
    register,
    formState: { errors, isDirty },
    watch,
    // handleSubmit,
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(LOGIN_SCHEMA),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
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

  return (
    <div>
      <S.LoginWrapper>
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
          <S.CardFooterSection>
            <S.SubmitButton
              disabled={!isNoneOfTheConditionsTrue}
              colorScheme="blue"
            >
              로그인하기
            </S.SubmitButton>
          </S.CardFooterSection>
        </S.CardContainer>
      </S.LoginWrapper>
    </div>
  );
};
