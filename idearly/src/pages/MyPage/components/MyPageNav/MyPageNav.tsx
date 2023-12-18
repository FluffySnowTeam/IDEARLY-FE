import { useNavigate } from "react-router-dom";
import * as S from "./MyPagNav.styles";

export const MyPageNav = () => {
  const navigate = useNavigate();

  return (
    <S.MyPageNavContainer>
      <S.MyPageNavItem onClick={() => navigate('/mypage/prev')}>이전 대회 조회</S.MyPageNavItem>
      <S.MyPageNavItem onClick={() => navigate('/mypage/current')}>현재 팀 조회</S.MyPageNavItem>
      <S.MyPageNavItem onClick={() => navigate('/mypage/modify')}>내 정보 수정</S.MyPageNavItem>
      <S.MyPageNavItem onClick={() => navigate('/mypage/withdrawal')}>회원 탈퇴</S.MyPageNavItem>
    </S.MyPageNavContainer>
  )
}