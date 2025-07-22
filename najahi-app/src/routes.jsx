// src/routes.jsx
import { createBrowserRouter } from 'react-router-dom';
import AuthLayout from './layouts/AuthLayout';
import MainLayout from './layouts/MainLayout';

// Auth pages
import Welcome from './pages/auth/Welcome';
import Signup from './pages/auth/Signup';
import Login from './pages/auth/Login';
import PhoneNumber from './pages/auth/PhoneNumber';
import Verification from './pages/auth/Verification';
import ProfileSetup from './pages/auth/ProfileSetup';
import SubjectSelection from './pages/auth/SubjectSelection';
import DiagnosticTest from './pages/auth/DiagnosticTest';
import Results from './pages/auth/Results';

// Dashboard pages
import Dashboard from './pages/dashboard/Dashboard';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      { index: true, element: <Welcome /> },
      { path: 'welcome', element: <Welcome /> },
      { path: 'signup', element: <Signup /> },
      { path: 'login', element: <Login /> },
      { path: 'phone', element: <PhoneNumber /> },
      { path: 'verification', element: <Verification /> },
      { path: 'profile', element: <ProfileSetup /> },
      { path: 'subjects', element: <SubjectSelection /> },
      { path: 'diagnostic', element: <DiagnosticTest /> },
      { path: 'results', element: <Results /> },
    ],
  },
  {
    path: '/dashboard',
    element: <MainLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      // Add other dashboard routes here
    ],
  },
]);
