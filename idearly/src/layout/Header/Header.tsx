import { useLocation, useNavigate } from "react-router-dom";
import * as S from "./Header.styles";
import { AlgorithmHeaderConfig, MainHeaderConfig } from "../../constants";

export const Header = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isAlgorithmPage = pathname === "/algorithm-solving";

  const handleMoveToPath = (path: string) => {
    if (path === "main") navigate("/");
    else navigate(path);
  };
  //추후 로그인상태 session을 확인하여 변경할 예정
  let isLogin = true;

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
        <div>{isLogin ? "로그인" : "로그아웃"}</div>
      </S.HeaderNavContainer>
    </S.HeaderContainer>
  );
};
