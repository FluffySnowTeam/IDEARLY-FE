import * as S from "./MyPageModifyInfo.styles";
import { useModifyUerMutation } from "../../../../hooks/useMyPageMutation";
import { useState } from "react";
import { useAtomValue } from "jotai";
import { userInfoAtom } from "../../../../store";

export const MyPageModifyInfo = () => {
  const [value, setValue] = useState("");
  const { mutate } = useModifyUerMutation();
  const userInfo = useAtomValue(userInfoAtom);

  const handleSubmit = () => {
    mutate(value);
    setValue("");
  };

  return (
    <S.ModifyWrapper>
      <S.Title>내 정보 수정</S.Title>
      <S.InfosWrapper>
        <S.InfoContainer>
          <S.Info>이름</S.Info>
          <S.Info>{userInfo.name}</S.Info>
        </S.InfoContainer>
        <S.ModifyInput
          placeholder="변경할 이름을 입력해주세요."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <S.ModifyBtn
          backgroundColor="#01228A"
          color="white"
          colorScheme="facebook"
          onClick={handleSubmit}
        >
          수정
        </S.ModifyBtn>
        <S.InfoContainer>
          <S.Info>이메일</S.Info>
          <S.Info>{userInfo.email}</S.Info>
        </S.InfoContainer>
      </S.InfosWrapper>
    </S.ModifyWrapper>
  );
};
