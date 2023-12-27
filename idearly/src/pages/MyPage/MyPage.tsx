import { useParams } from "react-router-dom";
import {
  MyPageCurrentTeam,
  MyPageModifyInfo,
  MyPageNav,
  MyPageWithdrawal,
} from ".";
import * as S from "./MyPage.styles";

export const MyPage = () => {
  const { path } = useParams();

  const renderMyPageContent = () => {
    switch (path) {
      case "currentTeam":
        return <MyPageCurrentTeam />;
      case "modifyMyInfo":
        return <MyPageModifyInfo />;
      case "withdrawal":
        return <MyPageWithdrawal />;
      default:
        return <MyPageCurrentTeam />;
    }
  };
  return (
    <S.MyPageContainer>
      <S.NavContainer>
        <MyPageNav />
      </S.NavContainer>
      <S.ContentContainer>{renderMyPageContent()}</S.ContentContainer>
    </S.MyPageContainer>
  );
};
