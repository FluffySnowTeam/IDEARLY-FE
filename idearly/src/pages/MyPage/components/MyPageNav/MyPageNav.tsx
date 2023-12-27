import { useNavigate } from "react-router-dom";
import * as S from "./MyPagNav.styles";
import { MyPageNavConfig } from "../../../../constants/MyPage.constants";
import { SettingsIcon, SearchIcon, WarningTwoIcon } from "@chakra-ui/icons";

export const MyPageNav = () => {
  const navigate = useNavigate();
  const handleMoveToPath = (path: string) => {
    navigate(`/mypage/${path}`);
  };
  const { currentTeam, modifyMyInfo, withdrawal } = MyPageNavConfig;

  return (
    <S.MyPageContainer>
      <S.MyPageNavItem onClick={() => handleMoveToPath("currentTeam")}>
        <SearchIcon mr="2" />
        {currentTeam}
      </S.MyPageNavItem>
      <S.MyPageNavItem onClick={() => handleMoveToPath("modifyMyInfo")}>
        <SettingsIcon mr="2" />
        {modifyMyInfo}
      </S.MyPageNavItem>
      <S.MyPageNavItem onClick={() => handleMoveToPath("withdrawal")}>
        <WarningTwoIcon mr="2" />
        {withdrawal}
      </S.MyPageNavItem>
    </S.MyPageContainer>
  );
};
