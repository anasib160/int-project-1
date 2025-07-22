import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import AuthLayout from './layouts/AuthLayout';
import MainLayout from './layouts/MainLayout';
import Welcome from './pages/auth/Welcome';
import Signup from './pages/auth/Signup';
import Login from './pages/auth/Login';
import PhoneNumber from './pages/auth/PhoneNumber';
import Verification from './pages/auth/Verification';
import Dashboard from './pages/dashboard/Dashboard';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      { index: true, element: <Welcome /> },
      { path: 'login', element: <Login /> },
      { path: 'signup', element: <Signup /> },
      { path: 'phone', element: <PhoneNumber /> },
      { path: 'verification', element: <Verification /> },
    ],
  },
  {
    path: '/dashboard',
    element: <MainLayout />,
    children: [
      { index: true, element: <Dashboard /> },
    ],
  },
]);

function App() {
  return (
      <LanguageProvider>
        <RouterProvider router={router} />
      </LanguageProvider>
  );
}

export default App;