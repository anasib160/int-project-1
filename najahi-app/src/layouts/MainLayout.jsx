import { Outlet } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';

const MainLayout = () => {
  const { isRTL } = useLanguage();

  return (
    <div className={`min-h-screen bg-gray-50 ${isRTL ? 'rtl' : 'ltr'}`}>
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;