import { useAtomValue } from "jotai";
import { MyPageWithdrawalConfig } from "../../../../constants/MyPage.constants";
import { useWithdrawalMutation } from "../../../../hooks/useMyPageMutation";
import * as S from "./MyPageWithdrawal.styles";
import { useState } from "react";
import { userInfoAtom } from "../../../../store";

export const MyPageWithdrawal = () => {
  const { mutate } = useWithdrawalMutation();
  const [isCheck, setIsCheck] = useState(false);
  const {
    title1,
    content1,
    title2,
    content2,
    title3,
    content3,
    title4,
    title5,
    content5,
  } = MyPageWithdrawalConfig;
  const userInfo = useAtomValue(userInfoAtom);
  const handleClick = () => {
    mutate();
  };

  return (
    <S.WithdrawalContainer>
      <S.WithdrawalTitle>회원 탈퇴</S.WithdrawalTitle>
      <S.WithdrawalSubTitle>{title1}</S.WithdrawalSubTitle>
      <S.WithdrawalText>{content1}</S.WithdrawalText>

      <S.WithdrawalSubTitle>{title2}</S.WithdrawalSubTitle>
      <S.WithdrawalText>{content2}</S.WithdrawalText>

      <S.WithdrawalSubTitle>{title3}</S.WithdrawalSubTitle>
      <S.WithdrawalText>{content3}</S.WithdrawalText>

      <S.WithdrawalSubTitle>{title4}</S.WithdrawalSubTitle>
      <S.UserTag size="lg" variant="solid" colorScheme="gray">
        {userInfo.name}({userInfo.email})
      </S.UserTag>

      <S.WithdrawalSubTitle>{title5}</S.WithdrawalSubTitle>
      <S.WithdrawalText>{content5}</S.WithdrawalText>
      <S.RadioIcon
        className="material-icons"
        onClick={() => setIsCheck((prev) => !prev)}
      >
        {isCheck ? "radio_button_checked" : "radio_button_unchecked"}
        <div>
          회원 탈퇴를 진행하며 해당 계정에 귀속된 모든 정보를 삭제하는데
          동의합니다.
        </div>
      </S.RadioIcon>
      <S.WithdrawalBtn
        isDisabled={!isCheck}
        colorScheme="red"
        onClick={handleClick}
      >
        회원 탈퇴하기
      </S.WithdrawalBtn>
    </S.WithdrawalContainer>
  );
};
