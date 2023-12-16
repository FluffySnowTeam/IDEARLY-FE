import { AdminCompetition, AdminNav, AdminUserPage } from "./components";
import * as S from "./AdminPage.styles";
import { useLocation } from "react-router-dom";

export const AdminPage = () => {
  const location = useLocation();
  const isAdminUserPage = location.pathname === "/admin/user";

  return (
    <div>
      <S.AdminPageContainer>
        <AdminNav />
        {isAdminUserPage ? <AdminUserPage /> : <AdminCompetition />}
      </S.AdminPageContainer>
    </div>
  );
};
