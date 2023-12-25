import { Outlet, useNavigate } from "react-router-dom";
import { userInfoAtom } from "../store";
import { useAtomValue } from "jotai";
import { useEffect } from "react";

export const IsLoginProtectedRoute = () => {
  const navigate = useNavigate();
  const userInfo = useAtomValue(userInfoAtom);

  useEffect(() => {
    // 현재 로그인 상태라면 홈 페이지로 리다이렉트
    if (userInfo.isLogin) {
      navigate("/", { replace: true });
    }
  }, [userInfo.isLogin, navigate]);

  return <Outlet />;
};
