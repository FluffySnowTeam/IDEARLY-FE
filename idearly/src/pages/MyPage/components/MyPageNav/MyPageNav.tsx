import { useNavigate } from "react-router-dom";
import * as S from "./MyPagNav.styles";
import { MyPageNavConfig } from "../../../../constants/MyPage.constants";

export const MyPageNav = () => {
  const navigate = useNavigate();
  const handleMoveToPath = (path: string) => {
    navigate(`/mypage/${path}`);
  };
  const { currentTeam, modifyMyInfo, withdrawal } = MyPageNavConfig;

  return (
    <>
      <S.MyPageNavItem onClick={() => handleMoveToPath("currentTeam")}>
        {currentTeam}
      </S.MyPageNavItem>
      <S.MyPageNavItem onClick={() => handleMoveToPath("modifyMyInfo")}>
        {modifyMyInfo}
      </S.MyPageNavItem>
      <S.MyPageNavItem onClick={() => handleMoveToPath("withdrawal")}>
        {withdrawal}
      </S.MyPageNavItem>
    </>
  );
};
