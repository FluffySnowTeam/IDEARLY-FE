import { useLocation, useNavigate } from "react-router-dom";
import * as S from "./Header.styles";
import Cookies from "js-cookie";
import { AlgorithmHeaderConfig, MainHeaderConfig } from "../../constants";

export const Header = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const accessToken = Cookies.get("accessToken");
  const isAlgorithmPage = pathname.startsWith("/algorithm-solving");

  const handleMoveToPath = (path: string) => {
    if (path === "main") navigate("/");
    else navigate(path);
  };

  const handleLogout = () => {
    console.log("코드 작성 예정");
  };

  return (
    <S.HeaderContainer>
      <S.LogoContainer
        onClick={() => {
          handleMoveToPath("main");
        }}
      >
        <img src="/images/test_logo.jpeg" width={40} />
        <div>IDEARLY</div>
      </S.LogoContainer>
      <S.HeaderNavContainer>
        {isAlgorithmPage
          ? AlgorithmHeaderConfig.map(({ text }) => (
              <div key={text}>{text}</div>
            ))
          : MainHeaderConfig.map(({ path, text }) => (
              <div onClick={() => handleMoveToPath(path)} key={text}>
                {text}
              </div>
            ))}
        {!!accessToken ? (
          <div onClick={handleLogout}>로그아웃</div>
        ) : (
          <div onClick={() => handleMoveToPath("/login")}>로그인</div>
        )}
      </S.HeaderNavContainer>
    </S.HeaderContainer>
  );
};
