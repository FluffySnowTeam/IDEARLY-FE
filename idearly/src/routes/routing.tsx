import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import {
  AdminPage,
  AlgorithmSolvingPage,
  CompletePage,
  DetailPage,
  ErrorPage,
  HomePage,
  LoginPage,
  MyPage,
  SignupPage,
  TeamMatchingPage,
  WaitingPage,
} from "../pages";
import { IsLoginProtectedRoute } from "./IsLoginProtectedRoute";
import { AdminProtectedRoute } from "./AdminProtectedRoute";
import ProtectedRoute from "./ProtectedRoute";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        element: <IsLoginProtectedRoute />,
        children: [
          {
            path: "/login",
            element: <LoginPage />,
          },
          {
            path: "/signup",
            element: <SignupPage />,
          },
        ],
      },
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/detail/:id",
        element: <DetailPage />,
      },
      {
        element: <AdminProtectedRoute />,
        children: [
          {
            path: "/admin/:path",
            element: <AdminPage />,
          },
        ],
      },
      // {
      //   element: <ProtectedRoute />,
      //   children: [
      {
        path: "/algorithm-solving/:id",
        element: <AlgorithmSolvingPage />,
      },
      {
        path: "/complete",
        element: <CompletePage />,
      },
      {
        path: "/mypage/:path",
        element: <MyPage />,
      },
      {
        path: "/matching/:competitionId",
        element: <TeamMatchingPage />,
      },
      {
        path: "/waiting/:id",
        element: <WaitingPage />,
      },
      {
        path: "/error",
        element: <ErrorPage />,
      },
      //   ],
      // },
    ],
  },
]);

export default router;
