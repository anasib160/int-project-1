import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';

const Login = () => {
  const navigate = useNavigate();
  const { t, language, isRTL } = useLanguage(); // Add isRTL
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt:', formData);
    alert('Login successful! (Demo mode)');
    navigate('/dashboard');
  };

  return (
    <div className={`flex flex-col ${isRTL ? 'text-right' : 'text-left'}`}>      
      <div className="w-24 h-24 rounded-full bg-indigo-600 flex items-center justify-center text-white text-3xl font-bold mb-6 mx-auto">
        N
      </div>
      
      <h1 className="text-2xl font-bold text-center mb-6">
        {t('login.title', 'Se connecter')}
      </h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
            {t('login.email', 'Email')}
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`w-full p-3 border border-gray-300 rounded-lg ${isRTL ? 'text-right' : 'text-left'}`}
            placeholder="mohammed@example.com"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2">
            {t('login.password', 'Mot de passe')}
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className={`w-full p-3 border border-gray-300 rounded-lg ${isRTL ? 'text-right' : 'text-left'}`}
            placeholder="••••••••"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-indigo-600 text-white rounded-lg font-medium mb-4"
        >
          {t('login.submit', 'Se connecter')}
        </button>

        <div className="text-center">
          <Link to="/forgot-password" className="text-indigo-600 text-sm hover:underline">
            {t('login.forgotPassword', 'Mot de passe oublié?')}
          </Link>
        </div>
      </form>

      <div className="mt-6 text-center">
        <p className="text-gray-600 text-sm">
          {t('login.noAccount', 'Vous n\'avez pas de compte?')}{' '}
          <Link to="/" className="text-indigo-600 font-medium hover:underline">
            {t('login.signup', 'S\'inscrire')}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;