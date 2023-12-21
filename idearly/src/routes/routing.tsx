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

// import ProtectedRoute from "./ProtectedRoute";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/signup",
        element: <SignupPage />,
      },
      {
        path: "/",
        element: <HomePage />,
      },
      // {
      //   element: <ProtectedRoute />,
      //   children: [
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
        path: "/mypage/:path",
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
      {
        path: "/error",
        element: <ErrorPage />,
      },
    ],
    //   },
    // ],
  },
]);

export default router;
