import { Outlet, useNavigate } from "react-router-dom";
import { userInfoAtom } from "../store";
import { useAtomValue } from "jotai";
import { useEffect } from "react";

export const IsLoginProtectedRoute = () => {
  const navigate = useNavigate();
  const userInfo = useAtomValue(userInfoAtom);

  useEffect(() => {
    if (userInfo.isLogin) {
      navigate("/");
    }
  }, [userInfo.isLogin, navigate]);

  return <Outlet />;
};
