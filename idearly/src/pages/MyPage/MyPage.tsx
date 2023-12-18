import { useParams } from "react-router-dom";
import { MyPageModifyInfo, MyPageNav, MyPagePrevCompe, MyPageSearchTeam, MyPageWithdraw } from "."
import * as S from "./MyPage.styles";

export const MyPage = () => {
  const { path } = useParams();
  console.log(path);

  const render = () => {
    switch(path) {
      case 'prev': return <MyPagePrevCompe /> 
      case 'current': return <MyPageSearchTeam /> 
      case 'modify': return <MyPageModifyInfo /> 
      case 'withdrawal': return <MyPageWithdraw /> 
      default: return <MyPageSearchTeam /> 
    }
  }
  return (
    <S.MyPageContainer>
      <MyPageNav />
      {render()}
      {/* <MyPageSearchTeam /> */}
    </S.MyPageContainer>
  )
}
