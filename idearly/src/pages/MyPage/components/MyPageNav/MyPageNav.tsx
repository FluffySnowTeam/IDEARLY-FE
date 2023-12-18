import * as S from "./MyPagNav.styles";

export const MyPageNav = () => {
  return (
    <S.MyPageNavContainer>
      <S.MyPageNavItem>이전 대회 조회</S.MyPageNavItem>
      <S.MyPageNavItem>현재 팀 조회</S.MyPageNavItem>
      <S.MyPageNavItem>내 정보 수정</S.MyPageNavItem>
      <S.MyPageNavItem>회원 탈퇴</S.MyPageNavItem>
    </S.MyPageNavContainer>
  )
}