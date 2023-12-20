import * as S from "./MyPageWithdrawal.styles";
import { useState } from "react";

export const MyPageWithdrawal = () => {
  const [isCheck, setIsCheck] = useState(false);

  return (
    <S.WithdrawalContainer>
      <S.WithdrawalTitle>회원 탈퇴</S.WithdrawalTitle>
      <S.WithdrawalSubTitle>탈퇴하시기 전에</S.WithdrawalSubTitle>
      <S.WithdrawalText>- 탈퇴 시 본 서비스에 등록한 모든 정보가 영구적으로 삭제되며, 재가입 또는 복구가 불가합니다.</S.WithdrawalText>

      <S.WithdrawalSubTitle>미리 백업하기</S.WithdrawalSubTitle>
      <S.WithdrawalText>- 등록한 서비스에서 정보 백업을 원하실 경우, 탈퇴 이전에 서비스에서 백업을 진행해주세요. 탈퇴 후에는 데이터를 복구할 수 없습니다.</S.WithdrawalText>

      <S.WithdrawalSubTitle>미리 관리하기</S.WithdrawalSubTitle>
      <S.WithdrawalText>- 서비스 이용 중 본인의 계정에 귀속되지 않은 정보는 자동으로 삭제되지 않으며, 탈퇴 시 수정이나 삭제가 불가능합니다. 본인 계정에 귀속되지 않은 정보를 수정하거나 삭제하려는 경우, 회원탈퇴 이전에 해당 서비스에서 수정 또는 삭제를 진행해주세요.</S.WithdrawalText>

      <S.WithdrawalSubTitle>탈퇴하려는 계정</S.WithdrawalSubTitle>
      <S.UserTag size="lg" variant='solid' colorScheme='gray'>
        강윤지(user@example.com)
      </S.UserTag>

      <S.WithdrawalSubTitle>삭제되는 정보</S.WithdrawalSubTitle>
      <S.WithdrawalText>- 활동 데이터</S.WithdrawalText>
      <S.WithdrawalText>- 기록 데이터</S.WithdrawalText>
      <S.WithdrawalText>- 개인정보 데이터</S.WithdrawalText>
      <S.RadioIcon
        className="material-icons"
        onClick={() => setIsCheck(prev => !prev)}
      >
        {isCheck ? "radio_button_checked" : "radio_button_unchecked"}
        <div>회원 탈퇴를 진행하며 해당 계정에 귀속된 모든 정보를 삭제하는데 동의합니다.</div>
      </S.RadioIcon>
      <S.WithdrawalBtn isDisabled={!isCheck} colorScheme="red">회원 탈퇴하기</S.WithdrawalBtn>
    </S.WithdrawalContainer>
  )
}
