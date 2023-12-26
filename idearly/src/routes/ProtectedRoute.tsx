import axios from "axios";
import { useAtomValue } from "jotai";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { userInfoAtom } from "../store";

const ProtectedRoute = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const userInfo = useAtomValue(userInfoAtom);

  useEffect(() => {
    if (!userInfo.isLogin) {
      navigate("/login", { state: { from: pathname }, replace: false });
    }
    // 인터셉터 설정
    const axiosInterceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          // 인증 오류가 발생하면 로그인 페이지로 리다이렉션
          navigate("/login");
        }
        return Promise.reject(error);
      }
    );

    // 컴포넌트가 언마운트될 때 인터셉터 제거
    return () => {
      axios.interceptors.response.eject(axiosInterceptor);
    };
  }, [navigate, userInfo.isLogin, pathname]);

  return <Outlet />;
};

export default ProtectedRoute;
