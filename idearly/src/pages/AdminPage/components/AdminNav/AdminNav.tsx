import { useNavigate } from "react-router-dom";
import { AdminNavConfig } from "../../../../constants";
import * as S from "./AdminNav.styles";

export const AdminNav = () => {
  const { user, competition } = AdminNavConfig;
  const navigate = useNavigate();
  const handleMoveToNav = (path: string) => {
    navigate(`/admin/${path}`);
  };
  return (
    <S.AdminNavContainer>
      <S.AdminNavTitle>관리자 페이지</S.AdminNavTitle>
      <S.AdminNavSubTitle
        onClick={() => {
          handleMoveToNav("user");
        }}
      >
        {user}
      </S.AdminNavSubTitle>
      <S.AdminNavSubTitle
        onClick={() => {
          handleMoveToNav("competition");
        }}
      >
        {competition}
      </S.AdminNavSubTitle>
    </S.AdminNavContainer>
  );
};
