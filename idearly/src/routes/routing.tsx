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
      // {
      //   path: "/", // 홈 페이지와 같은 경로입니다. 중복을 피해야 합니다.
      //   element: <CreateRoom />,
      // },
      // {
      //   path: "/room/:roomID",
      //   element: <Room />,
      // },
      {
        path: "/algorithm-solving/:id",
        element: <AlgorithmSolvingPage />,
      },
      {
        path: "/admin",
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
        path: "/mypage",
        element: <MyPage />,
      },
      {
        path: "/matching",
        element: <TeamMatchingPage />,
      },
      {
        path: "/waiting",
        element: <WaitingPage />,
      },
    ],
  },
]);

export default router;
