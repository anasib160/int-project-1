import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';

const Signup = () => {
  const navigate = useNavigate();
  const { t, isRTL } = useLanguage();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    acceptTerms: false
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = t('signup.error.fullName', 'Le nom complet est requis');
    }
    
    if (!formData.email.trim()) {
      newErrors.email = t('signup.error.email', 'L\'email est requis');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('signup.error.emailInvalid', 'Format d\'email invalide');
    }
    
    if (!formData.password) {
      newErrors.password = t('signup.error.password', 'Le mot de passe est requis');
    } else if (formData.password.length < 6) {
      newErrors.password = t('signup.error.passwordLength', 'Le mot de passe doit contenir au moins 6 caractères');
    }
    
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = t('signup.error.terms', 'Vous devez accepter les conditions');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    // Store signup data temporarily (in real app, call API)
    localStorage.setItem('najahi-signup-data', JSON.stringify(formData));
    console.log('Signup data:', formData);
    
    // Navigate to phone number page
    navigate('/phone');
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="flex flex-col">
      {/* Debug info */}
      <div className="mb-4 p-2 bg-green-100 rounded text-sm">
        ✅ Signup Page Working | Language: {t ? 'Connected' : 'Error'}
      </div>

      <h1 className="text-2xl font-bold mb-6">
        {t('signup.title', 'Créer un compte')}
      </h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
            {t('signup.fullName', 'Nom complet')}
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            className={`w-full p-3 border rounded-lg ${
              errors.fullName ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder={t('signup.fullNamePlaceholder', 'Mohammed Alaoui')}
          />
          {errors.fullName && (
            <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
            {t('signup.email', 'Email')}
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`w-full p-3 border rounded-lg ${
              errors.email ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="mohammed@example.com"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
            {t('signup.password', 'Mot de passe')}
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className={`w-full p-3 border rounded-lg ${
              errors.password ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="••••••••"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        <div className="flex items-center mb-6">
          <input
            type="checkbox"
            name="acceptTerms"
            checked={formData.acceptTerms}
            onChange={handleInputChange}
            className="w-4 h-4 text-indigo-600 border-gray-300 rounded"
          />
          <label className={`block text-sm text-gray-700 ${isRTL ? 'mr-2' : 'ml-2'}`}>
            {t('signup.acceptTerms', 'J\'accepte les conditions d\'utilisation')}
          </label>
        </div>
        {errors.acceptTerms && (
          <p className="text-red-500 text-sm mb-4">{errors.acceptTerms}</p>
        )}

        <div className="flex gap-4 mb-6">
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleBack}
            className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium"
          >
            {t('common.back', 'Retour')}
          </button>
          <button
            type="submit"
            className="flex-1 py-3 bg-indigo-600 text-white rounded-lg font-medium"
          >
            {t('common.continue', 'Continuer')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;