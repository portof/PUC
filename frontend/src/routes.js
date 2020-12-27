import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import MainLayout from 'src/layouts/MainLayout';
import DashboardView from 'src/views/reports/DashboardView';
import LoginView from 'src/views/auth/LoginView';
import NotFoundView from 'src/views/errors/NotFoundView';
import LocaisView from 'src/views/locais/LocalListView';
import LocaisRegister from 'src/views/locais/LocalRegister'
import TipoLocalView from 'src/views/locais/TipoLocalListView';
import TipoLocalRegister from 'src/views/locais/TipoLocalRegister';



const routes = [
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      { path: '/', element: <Navigate to="/login" /> },
      { path: 'dashboard', element: <DashboardView /> },
      { path: 'locais', element: <LocaisView /> },
      { path: 'locais-register', element: <LocaisRegister /> },
      { path: 'locais-edit/:id', element: <LocaisRegister /> },
      { path: 'tipolocal', element: <TipoLocalView /> },
      { path: 'tipolocal-register', element: <TipoLocalRegister /> },
      { path: "tipolocal-edit/:id", element: <TipoLocalRegister /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <LoginView /> },
      { path: '404', element: <NotFoundView /> },
      { path: '/', element: <Navigate to="/login" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
