import axios from "axios";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const ProtectedRoute = () => {
  const navigate = useNavigate();

  useEffect(() => {
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
  }, [navigate]);

  return <Outlet />;
};

export default ProtectedRoute;
