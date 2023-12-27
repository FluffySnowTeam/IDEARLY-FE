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
          const previousPath = location.state?.from?.pathname || "/";
          navigate(previousPath, { replace: true });
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosInstance.interceptors.response.eject(axiosInterceptor);
    };
  }, [navigate, userInfo.isLogin]);

  return <Outlet />;
};

export default ProtectedRoute;
