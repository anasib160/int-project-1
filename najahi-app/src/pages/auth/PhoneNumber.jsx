import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';

const PhoneNumber = () => {
  const navigate = useNavigate();
  const { t, isRTL } = useLanguage();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [acceptSMS, setAcceptSMS] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^[67]\d{8}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!phoneNumber.trim()) {
      setError(t('phone.error.required', 'Le numéro de téléphone est requis'));
      return;
    }

    if (!validatePhoneNumber(phoneNumber)) {
      setError(t('phone.error.invalid', 'Format de numéro invalide (ex: 6 12 34 56 78)'));
      return;
    }

    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const fullPhoneNumber = '+212' + phoneNumber.replace(/\s/g, '');
      localStorage.setItem('najahi-phone', fullPhoneNumber);
      localStorage.setItem('najahi-accept-sms', acceptSMS.toString());
      
      console.log('Phone verification code sent to:', fullPhoneNumber);
      navigate('/verification');
    } catch (error) {
      setError(t('phone.error.general', 'Erreur lors de l\'envoi du code'));
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/signup');
  };

  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    
if (value.length > 0) {
  // Keep the first digit alone, then group the rest in pairs
  const first = value[0];
  const rest = value.slice(1).match(/.{1,2}/g) || [];
  value = [first, ...rest].join(' ');

  if (value.length > 14) value = value.substring(0, 14); // 1 digit + 5 pairs + 5 spaces = max 14 chars
}

    
    setPhoneNumber(value);
    if (error) setError('');
  };

  return (
    <div className="flex flex-col">

      <h1 className="text-2xl font-bold mb-2">
        {t('phone.title', 'Ajouter un numéro')}
      </h1>
      <p className="text-gray-600 mb-6">
        {t('phone.description', 'Nous vous enverrons un code de vérification')}
      </p>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">
            {t('phone.label', 'Numéro de téléphone')}
          </label>
          
          {/* Phone input container - FORCE LTR */}
          <div className="flex" dir="ltr">
            <div className="bg-gray-100 p-3 rounded-l-lg border border-gray-300 border-r-0 flex items-center">
              <span className="text-gray-700 font-medium">+212</span>
            </div>
            <input
              type="tel"
              value={phoneNumber}
              onChange={handlePhoneChange}
              className={`flex-1 p-3 border rounded-r-lg text-left ${
                error ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="6 12 34 56 78"
              maxLength="13"
              dir="ltr"
            />
          </div>
          
          <p className="text-xs text-gray-500 mt-1">
            {t('phone.format', 'Format: 6 ou 7 suivi de 8 chiffres')}
          </p>
        </div>

        <div className="flex items-center mb-6">
          <input
            type="checkbox"
            checked={acceptSMS}
            onChange={(e) => setAcceptSMS(e.target.checked)}
            className="w-4 h-4 text-indigo-600 border-gray-300 rounded"
          />
          <label className={`block text-sm text-gray-700 ${isRTL ? 'mr-2' : 'ml-2'}`}>
            {t('phone.acceptSMS', 'Recevoir des mises à jour d\'étude par SMS')}
          </label>
        </div>

        {/* Progress dots */}
        <div className="flex justify-center gap-4 mb-6">
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleBack}
            className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium"
            disabled={loading}
          >
            {t('common.back', 'Retour')}
          </button>
          <button
            type="submit"
            disabled={loading || !phoneNumber}
            className="flex-1 py-3 bg-indigo-600 text-white rounded-lg font-medium disabled:opacity-50"
          >
            {loading 
              ? t('phone.sending', 'Envoi...') 
              : t('phone.sendCode', 'Envoyer le code')
            }
          </button>
        </div>
      </form>

      {/* Demo info */}
      <div className="mt-6 p-3 bg-gray-50 rounded-lg text-xs text-gray-600">
        💡 {t('phone.demo', 'Mode démo: Utilisez un numéro comme "6 12 34 56 78"')}
      </div>
    </div>
  );
};

export default PhoneNumber;