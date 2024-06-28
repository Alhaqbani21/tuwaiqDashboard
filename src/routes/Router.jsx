import * as React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import SignUp from '../pages/SignUp';
import Login from '../pages/Login';
import AdminPage from '../pages/AdminPage';
import StudentPage from '../pages/StudentPage';
import ViewStudents from '../pages/ViewStudents';
import ManageStudents from '../pages/ManageStudents';
import ErrorPage from '../pages/ErrorPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <SignUp />,
  },
  {
    path: '/Login',
    element: <Login />,
  },
  {
    path: '/admin',
    element: <AdminPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/admin/viewstudents',
    element: <ViewStudents />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/admin/managment',
    element: <ManageStudents />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/student',
    element: <StudentPage />,
  },
]);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
