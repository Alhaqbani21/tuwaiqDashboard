import * as React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import SignUp from '../pages/SignUp';
import Login from '../pages/Login';
import AdminPage from '../pages/AdminPage';
import StudentPage from '../pages/StudentPage';
import ViewStudents from '../pages/ViewStudents';
import ManageStudents from '../pages/ManageStudents';
import ErrorPage from '../pages/ErrorPage';
import UserProjects from '../pages/UserProjects';
import ProjectsApproved from '../pages/ProjectsApproved';
import ManageProjects from '../pages/ManageProjects';

const router = createBrowserRouter([
  {
    path: '/',
    element: <SignUp />,
    errorElement: <ErrorPage />,
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
    path: '/admin/projects',
    element: <ManageProjects />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/student',
    element: <StudentPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/student/ProjectsApproved',
    element: <ProjectsApproved />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/student/projects',
    element: <UserProjects />,
    errorElement: <ErrorPage />,
  },
]);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
