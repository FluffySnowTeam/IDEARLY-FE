import { useNavigate } from "react-router-dom";
import * as S from "./MyPagNav.styles";

export const MyPageNav = () => {
  const navigate = useNavigate();
  const handleMoveToPath = (path: string) => {
    navigate(`/mypage/${path}`);
  }

  return (
    <S.MyPageNavContainer>
      <S.MyPageNavItem onClick={() => handleMoveToPath('previousCompetition')}>이전 대회 조회</S.MyPageNavItem>
      <S.MyPageNavItem onClick={() => handleMoveToPath('currentTeam')}>현재 팀 조회</S.MyPageNavItem>
      <S.MyPageNavItem onClick={() => handleMoveToPath('modifyMyInfo')}>내 정보 수정</S.MyPageNavItem>
      <S.MyPageNavItem onClick={() => handleMoveToPath('withdrawal')}>회원 탈퇴</S.MyPageNavItem>
    </S.MyPageNavContainer>
  )
}