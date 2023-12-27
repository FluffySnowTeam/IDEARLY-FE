import { useAtomValue } from "jotai";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { userInfoAtom } from "../store";
import { axiosInstance } from "../services/apis/axios";
import { useToast } from "@chakra-ui/react";

const ProtectedRoute = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const userInfo = useAtomValue(userInfoAtom);

  useEffect(() => {
    if (!userInfo.isLogin) {
      navigate("/login");
    }
    // 인터셉터 설정
    const axiosInterceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          toast({
            title: "로그아웃 되었습니다",
            description: "다시 로그인 해주세요.",
            status: "warning",
            duration: 1000,
            isClosable: true,
          });
          // 인증 오류가 발생하면 로그인 페이지로 리다이렉션
          navigate("/login");
        }
        return Promise.reject(error);
      }
    );

    // 컴포넌트가 언마운트될 때 인터셉터 제거
    return () => {
      axiosInstance.interceptors.response.eject(axiosInterceptor);
    };
  }, [navigate, userInfo.isLogin]);

  return <Outlet />;
};

export default ProtectedRoute;
