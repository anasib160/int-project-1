import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';

const Welcome = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="flex flex-col items-center">
      <div className="w-24 h-24 rounded-full bg-indigo-600 flex items-center justify-center text-white text-3xl font-bold mb-6">N</div>
      
      <h1 className="text-2xl font-bold text-center mb-3">
        {t('welcome.title', 'Bienvenue sur Najahi!')}
      </h1>
      <p className="text-gray-600 text-center mb-8">
        {t('welcome.description', 'La plateforme d\'apprentissage intelligente pour réussir au Bac')}
      </p>

      <div className="flex gap-4 mb-6">
        <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
        <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
        <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
        <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
      </div>

      <button
        onClick={() => navigate('/signup')}
        className="w-full py-3 bg-indigo-600 text-white rounded-lg font-medium mb-3"
      >
        {t('welcome.start_button', 'Commencer')}
      </button>
      
      <button
        onClick={() => navigate('/login')}
        className="w-full py-3 border border-gray-300 text-gray-700 rounded-lg font-medium"
      >
        {t('welcome.login_button', 'Se connecter')}
      </button>
    </div>
  );
};

export default Welcome;