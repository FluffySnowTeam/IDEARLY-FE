import { useParams } from "react-router-dom";
import { MyPageCurrentTeam, MyPageModifyInfo, MyPageNav, MyPagePrevCompe, MyPageWithdrawal } from "."
import * as S from "./MyPage.styles";

export const MyPage = () => {
  const { path } = useParams();
  console.log(path);

  const renderMyPageContent = () => {
    switch(path) {
      case 'previousCompetition': return <MyPagePrevCompe /> 
      case 'currentTeam': return <MyPageCurrentTeam /> 
      case 'modifyMyInfo': return <MyPageModifyInfo /> 
      case 'withdrawal': return <MyPageWithdrawal /> 
      default: return <MyPageCurrentTeam /> 
    }
  }
  return (
    <S.MyPageContainer>
      <MyPageNav />
      {renderMyPageContent()}
    </S.MyPageContainer>
  )
}
