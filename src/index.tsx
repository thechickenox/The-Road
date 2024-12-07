import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import LandingView from './Views/landing/LandingView';
import AdminView from './Views/admin/AdminView';
import AdminDashboard from './Views/admin/AdminDashboard';
import StudentsView from './Views/students/StudentsView';
import StudentsDashboard from './Views/students/StudentsDashboard';
import { AuthProvider } from './Services/Auth/AuthProvider';
import PrivateRoute from './Services/Routes/ProtectedRoute';
import LoginPage from './Views/auth/AuthView';
import AdminRoutes from './Views/admin/AdminRoutes';
import AdminActivities from './Views/admin/AdminActivities';
import AdminUsers from './Views/admin/AdminUsers';
import AdminGenres from './Views/admin/AdminGenres';
import StudentsRoads from './Views/students/StudentsRoads';
import IndividualRoads from './Views/students/IndividualRoads';
import CreateActivity from './Views/admin/AdmintCreateActivities';
import CreateRoads from './Views/admin/AdminAddNewRoad';
import EditActivity from './Views/admin/AdminEditActivities';
import Quiz from './Views/students/Questions';
import Profile from './Views/students/Profile';
import ActivitiesViewByGenre from './Views/students/ActvityByGenre';
import StudentsActivities from './Views/students/StudentsActivities';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingView />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/administrador',
    element: <PrivateRoute />,
    children: [
      {
        path: '/administrador',
        element: <AdminView />,
        children: [
          {
            path: 'dashboard',
            element: <AdminDashboard />,
          },
          {
            path: 'rutas',
            element: <AdminRoutes />,
          },
          {
            path: 'actividades',
            element: <AdminActivities />,
          },
          {
            path: 'crear-actividad',
            element: <CreateActivity />,
          },
          {
            path: 'actividades/editar-actividad/:id',
            element: <EditActivity />,
          },
          {
            path: 'rutas/editar/:routeId',
            element: <CreateRoads />,
          },
          {
            path: 'crear-ruta',
            element: <CreateRoads />,
          },
          {
            path: 'generos',
            element: <AdminGenres />,
          },
          {
            path: 'usuarios',
            element: <AdminUsers />,
          },
          {
            path: 'perfil',
            element: <AdminUsers />,
          },
        ],
      },
    ],
  },
  {
    path: '/estudiantes',
    element: <PrivateRoute />,
    children: [
      {
        path: '/estudiantes',
        element: <StudentsView />,
        children: [
          {
            path: 'dashboard',
            element: <StudentsDashboard />,
          },
          {
            path: 'actividades',
            element: <StudentsActivities />,
          },
          {
            path: 'generos/:activityGenre',
            element: <ActivitiesViewByGenre />,
          },
          {
            path: 'actividad/:questionId',
            element: <Quiz />,
          },
          {
            path: 'rutas',
            element: <StudentsRoads />,
          },
          {
            path: 'rutas/:routeId',
            element: <IndividualRoads />,
          },
          {
            path: 'perfil',
            element: <Profile />,
          },
        ],
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
