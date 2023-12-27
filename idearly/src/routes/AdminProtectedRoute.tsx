import { useAtomValue } from "jotai";
import { Outlet, useNavigate } from "react-router-dom";
import { userInfoAtom } from "../store";
import { useEffect } from "react";

export const AdminProtectedRoute = () => {
  const navigate = useNavigate();
  const userInfo = useAtomValue(userInfoAtom);

  useEffect(() => {
    if (userInfo.authority === "USER" && !userInfo.isLogin) {
      navigate("/");
    }
  }, [userInfo, userInfo.authority, navigate]);

  return <Outlet />;
};
