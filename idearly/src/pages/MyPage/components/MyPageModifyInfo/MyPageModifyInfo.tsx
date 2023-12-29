import * as S from "./MyPageModifyInfo.styles";
import { useModifyUerMutation } from "../../../../hooks/useMyPageMutation";
import { useAtomValue } from "jotai";
import { userInfoAtom } from "../../../../store";
import { MYPAGE_SCHEMA } from "../../../../schemas/mypage.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { RegisterSchemaType } from "../../../../schemas";

export const MyPageModifyInfo = () => {
  const { mutate } = useModifyUerMutation();
  const userInfo = useAtomValue(userInfoAtom);

  const {
    register,
    watch,
    formState: { errors, isDirty },
    handleSubmit,
    reset,
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(MYPAGE_SCHEMA),
    mode: "onChange",
    defaultValues: {
      name: "",
    },
  });

  const watchedValues = watch();
  const nameValue = watch?.("name");
  const isError = errors && errors.name?.message;
  const hasErrors = Object.keys(errors).length > 0;

  const isAllFieldsFilled = Object.values(watchedValues).every(
    (value) => value !== ""
  );
  const isNoneOfTheConditionsTrue = isDirty && !hasErrors && isAllFieldsFilled;

  const handleMdoify = () => {
    if (nameValue) {
      mutate(nameValue);
      reset();
    }
  };

  return (
    <S.ModifyWrapper onSubmit={handleSubmit(handleMdoify)}>
      <S.Title>내 정보 수정</S.Title>
      <S.InfosWrapper>
        <S.InfoContainer>
          <S.Info>이름</S.Info>
          <S.Info>{userInfo.name}</S.Info>
        </S.InfoContainer>
        <S.ModifyInput
          placeholder="변경할 이름을 입력해주세요."
          errors={errors?.name}
          maxLength={10}
          {...register("name")}
        />
        <S.ModifyBtn
          type="submit"
          backgroundColor="#01228A"
          color="white"
          colorScheme="facebook"
          isDisabled={!isNoneOfTheConditionsTrue}
        >
          수정
        </S.ModifyBtn>
        {isError && (
          <S.InputErrorMessage>{errors.name?.message}</S.InputErrorMessage>
        )}

        <S.InfoContainer>
          <S.Info>이메일</S.Info>
          <S.Info>{userInfo.email}</S.Info>
        </S.InfoContainer>
      </S.InfosWrapper>
    </S.ModifyWrapper>
  );
};
