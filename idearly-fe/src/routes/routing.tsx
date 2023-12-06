import { createBrowserRouter } from 'react-router-dom'
import Layout from '../layout/Layout'
import { AdminPage, AlgorithmSolvingPage, HomePage } from '../pages'

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/algorithm-solving',
        element: <AlgorithmSolvingPage />,
      },
      {
        path: '/admin',
        element: <AdminPage />,
      },
    ],
  },
])

export default router
