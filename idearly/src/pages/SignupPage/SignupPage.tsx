import { SignupPageConfig } from "../../constants";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as S from "./SignupPage.styles";
import { SignupForm } from "./components";
import { RegisterSchemaType, SIGNUP_SCHEMA } from "../../schemas";
import { useEffect, useState } from "react";

export const SignupPage = () => {
  const {
    register,
    watch,
    formState: { errors },
    // handleSubmit,
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(SIGNUP_SCHEMA),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const [isFormEmpty, setIsFormEmpty] = useState(true);
  const watchedValues = watch();

  // 컴포넌트 마운트 시 폼의 초기 비어있는 상태 확인
  useEffect(() => {
    const isEmpty = Object.values(watchedValues).every((value) => value === "");
    setIsFormEmpty(isEmpty);
  }, []);

  // 폼이 오류 상태인지 확인
  const hasErrors = Object.keys(errors).length > 0;

  // 폼이 현재 비어있는 상태인지 확인
  const isCurrentlyEmpty = Object.values(watchedValues).every(
    (value) => value === ""
  );

  const isNoneOfTheConditionsTrue =
    !isFormEmpty && !hasErrors && !isCurrentlyEmpty;

  return (
    <S.SignupWrapper>
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
        <S.CardFooterSection>
          <S.SubmitButton
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
