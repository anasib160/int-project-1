import { useState } from 'react';
import { useLanguage } from '../../hooks/useLanguage';

const LanguageToggle = () => {
  const [showSelector, setShowSelector] = useState(false);
  const { language, changeLanguage } = useLanguage();

  return (
    <div className="relative">
      <button
        onClick={() => setShowSelector(!showSelector)}
        className="bg-white/80 backdrop-blur-sm rounded-full w-8 h-8 flex items-center justify-center shadow-sm"
      >
        {language === 'fr' ? 'FR' : 'عر'}
      </button>

      {showSelector && (
        <div className="absolute top-10 right-0 bg-white rounded-lg shadow-md py-1 w-32 z-20">
          <button
            onClick={() => {
              console.log('Switching to French');
              changeLanguage('fr');
              setShowSelector(false);
            }}
            className={`block w-full px-4 py-2 text-left ${language === 'fr' ? 'text-indigo-600 bg-indigo-50' : 'text-gray-700'}`}
          >
            Français
          </button>
          <button
            onClick={() => {
              console.log('Switching to Arabic');
              changeLanguage('ar');
              setShowSelector(false);
            }}
            className={`block w-full px-4 py-2 text-left ${language === 'ar' ? 'text-indigo-600 bg-indigo-50' : 'text-gray-700'}`}
          >
            العربية
          </button>
        </div>
      )}
    </div>
  );
};

export default LanguageToggle;