import { useAtomValue } from "jotai";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { userInfoAtom } from "../store";
import { axiosInstance } from "../services/apis/axios";
import { useToast } from "@chakra-ui/react";

const ProtectedRoute = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const userInfo = useAtomValue(userInfoAtom);
  const location = useLocation();

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
        if (error.response && error.response.status === 403) {
          toast({
            title: "권한이 없습니다.",
            description: "다시 시도해 주세요.",
            status: "warning",
            duration: 1000,
            isClosable: true,
          });
          // 이전 페이지로 리다이렉트
          const previousPath = location.state?.from?.pathname || "/";
          navigate(previousPath, { replace: true }); // replace: true를 사용하여 히스토리 스택을 조작

          // 뒤로 가기 방지를 위해 히스토리 스택에 새 항목 추가
          navigate(0);
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
