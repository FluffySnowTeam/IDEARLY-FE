import { useParams } from "react-router-dom";
import { MyPageNav, MyPageSearchTeam } from "."
import * as S from "./MyPage.styles";

export const MyPage = () => {
  return (
    <S.MyPageContainer>
      <MyPageNav />
      <MyPageSearchTeam />
    </S.MyPageContainer>
  )
}
