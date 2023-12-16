import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import {
  AdminPage,
  AlgorithmSolvingPage,
  CompletePage,
  DetailPage,
  HomePage,
  LoginPage,
  MyPage,
  SignupPage,
  TeamMatchingPage,
  WaitingPage,
} from "../pages";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/algorithm-solving/:id",
        element: <AlgorithmSolvingPage />,
      },
      {
        path: "/admin/:path",
        element: <AdminPage />,
      },
      {
        path: "/complete",
        element: <CompletePage />,
      },
      {
        path: "/detail/:id",
        element: <DetailPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/signup",
        element: <SignupPage />,
      },
      {
        path: "/mypage",
        element: <MyPage />,
      },
      {
        path: "/matching",
        element: <TeamMatchingPage />,
      },
      {
        path: "/waiting/:id",
        element: <WaitingPage />,
      },
    ],
  },
]);

export default router;
