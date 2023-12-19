import { useParams } from "react-router-dom";
import { MyPageCurrentTeam, MyPageModifyInfo, MyPageNav, MyPagePrevCompe, MyPageWithdraw } from "."
import * as S from "./MyPage.styles";

export const MyPage = () => {
  const { path } = useParams();
  console.log(path);

  const renderMyPage = () => {
    switch(path) {
      case 'previousCompetition': return <MyPagePrevCompe /> 
      case 'currentTeam': return <MyPageCurrentTeam /> 
      case 'modifyMyInfo': return <MyPageModifyInfo /> 
      case 'withdrawal': return <MyPageWithdraw /> 
      default: return <MyPageCurrentTeam /> 
    }
  }
  return (
    <S.MyPageContainer>
      <MyPageNav />
      {renderMyPage()}
    </S.MyPageContainer>
  )
}
