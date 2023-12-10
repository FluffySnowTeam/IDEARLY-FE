import { useLocation, useNavigate } from "react-router-dom";
import * as S from "./Header.styles";
import {
  AlgorithmHeaderConfig,
  MainHeaderConfig,
} from "../../constants/Header.contants";

export const Header = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isAlgorithmPage = pathname === "/algorithm-solving";

  const handleMoveToPath = (path: string) => {
    if (path === "main") navigate("/");
    else navigate(path);
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
      </S.HeaderNavContainer>
    </S.HeaderContainer>
  );
};
