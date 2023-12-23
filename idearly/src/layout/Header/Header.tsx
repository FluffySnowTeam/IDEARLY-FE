import { useLocation, useNavigate } from "react-router-dom";
import * as S from "./Header.styles";
import { AlgorithmHeaderConfig, MainHeaderConfig } from "../../constants";
import { useEffect } from "react";
import { useLogoutMutation } from "../../hooks";
import axios from "axios";
import { useAtom, useSetAtom } from "jotai";
import { LoginStateAtom } from "../../store/LoginPage.atoms";
import { userInfoAtom } from "../../store";

export const Header = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [isLoginState, setIsLoginState] = useAtom(LoginStateAtom);
  const setUserInfoState = useSetAtom(userInfoAtom);

  const isAlgorithmPage = pathname.startsWith("/algorithm-solving");

  const handleMoveToPath = (path: string) => {
    if (path === "main") navigate("/");
    else navigate(path);
  };

  const { mutate } = useLogoutMutation();
  const handleLogout = () => {
    mutate();
  };

  useEffect(() => {
    const axiosInterceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          setIsLoginState(false);
          setUserInfoState({
            memberId: '',
            email: '',
            name: '',
          });
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(axiosInterceptor);
    };
  }, []);

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
        {isLoginState ? (
          <div onClick={handleLogout}>로그아웃</div>
        ) : (
          <div onClick={() => handleMoveToPath("/login")}>로그인</div>
        )}
      </S.HeaderNavContainer>
    </S.HeaderContainer>
  );
};
