import { Outlet, useLocation } from 'react-router-dom';
import LanguageToggle from '../components/ui/LanguageToggle';
import ProgressBar from '../components/ui/ProgressBar';
import { useLanguage } from '../hooks/useLanguage';

const AuthLayout = () => {
  const location = useLocation();
  const { isRTL } = useLanguage();

  const progressPaths = ['/signup', '/phone', '/verification', '/profile', '/subjects', '/diagnostic', '/results'];
  const showProgress = progressPaths.includes(location.pathname);

  const calculateProgress = () => {
    const index = progressPaths.indexOf(location.pathname);
    if (index === -1) return 0;
    return (index + 1) / progressPaths.length * 100;
  };

  return (
    <div className={`min-h-screen bg-gray-50 ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Language toggle in top right */}
      <div className="absolute top-4 right-4 z-10">
        <LanguageToggle />
      </div>

      {/* Progress bar */}
      {showProgress && (
        <ProgressBar percentage={calculateProgress()} />
      )}

      {/* Main content */}
      <div className="container mx-auto max-w-md px-4 py-8">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;