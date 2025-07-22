import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';

const Verification = () => {
  const navigate = useNavigate();
  const { t, isRTL } = useLanguage();
  const [code, setCode] = useState(['', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resendLoading, setResendLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];

  // Get phone number from previous step
  const phoneNumber = localStorage.getItem('najahi-phone') || '+212612345678';

  useEffect(() => {
    // Start 60 second timer for resend
    setResendTimer(60);
    const timer = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Focus first input on mount
    if (inputRefs[0].current) {
      inputRefs[0].current.focus();
    }

    return () => clearInterval(timer);
  }, []);

  const handleInputChange = (index, value) => {
    if (value.length > 1) return; // Prevent multiple characters
    
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    
    if (error) setError('');
    
    // Auto-focus next input
    if (value && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
    
    // Handle paste
    if (e.key === 'Paste') {
      e.preventDefault();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    const digits = pastedData.replace(/\D/g, '').slice(0, 4);
    
    if (digits.length === 4) {
      const newCode = digits.split('');
      setCode(newCode);
      
      // Focus last input
      inputRefs[3].current?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const verificationCode = code.join('');
    if (verificationCode.length !== 4) {
      setError(t('verification.error.incomplete', 'Veuillez saisir le code complet'));
      return;
    }

    setLoading(true);
    try {
      // Simulate API call to verify code
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // For demo purposes, accept any 4-digit code
      console.log('Verification code submitted:', verificationCode);
      console.log('Phone number:', phoneNumber);
      
      // Store verification success
      localStorage.setItem('najahi-verified', 'true');
      navigate('/profile');
    } catch (error) {
      setError(t('verification.error.invalid', 'Code de vérification invalide'));
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (resendTimer > 0) return;
    
    setResendLoading(true);
    try {
      // Simulate API call to resend code
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Resending verification code to:', phoneNumber);
      
      // Restart timer
      setResendTimer(60);
      const timer = setInterval(() => {
        setResendTimer((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      // Clear current code
      setCode(['', '', '', '']);
      setError('');
      
      // Focus first input
      inputRefs[0].current?.focus();
    } catch (error) {
      setError(t('verification.error.resend', 'Erreur lors du renvoi du code'));
    } finally {
      setResendLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/phone');
  };

  const isCodeComplete = code.every(digit => digit !== '');

  return (
    <div className="flex flex-col">
      {/* Debug info */}
      <div className="mb-4 p-2 bg-purple-100 rounded text-sm">
        ✅ Verification Page | Phone: {phoneNumber} | Code: [{code.join(', ')}] | Complete: {isCodeComplete ? 'Yes' : 'No'}
      </div>

      <h1 className="text-2xl font-bold mb-2">
        {t('verification.title', 'Vérification du numéro')}
      </h1>
      <p className="text-gray-600 mb-6">
        {t('verification.description', 'Entrez le code à 4 chiffres envoyé au')} {phoneNumber}
      </p>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div dir="ltr">
            <div className="flex justify-between mb-6" onPaste={handlePaste}>
            {code.map((digit, index) => (
                <input
                key={index}
                ref={inputRefs[index]}
                type="text"
                inputMode="numeric"
                maxLength="1"
                value={digit}
                onChange={(e) => handleInputChange(index, e.target.value.replace(/\D/g, ''))}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className={`w-14 h-14 text-center text-xl font-bold border rounded-lg ${
                    error ? 'border-red-300' : 'border-gray-300'
                } focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 `}
                />
            ))}
            </div>
        </div>


        <p className="text-center text-sm text-gray-500 mb-6">
          {t('verification.noCode', 'Vous n\'avez pas reçu le code?')}{' '}
          <button
            type="button"
            onClick={handleResend}
            disabled={resendTimer > 0 || resendLoading}
            className="text-indigo-600 font-medium disabled:opacity-50 hover:underline"
          >
            {resendLoading
              ? t('verification.resending', 'Renvoi...')
              : resendTimer > 0
              ? `${t('verification.resendIn', 'Renvoyer dans')} ${resendTimer}s`
              : t('verification.resend', 'Renvoyer')
            }
          </button>
        </p>

        {/* Progress dots */}
        <div className="flex justify-center gap-4 mb-6">
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
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
            disabled={loading || !isCodeComplete}
            className="flex-1 py-3 bg-indigo-600 text-white rounded-lg font-medium disabled:opacity-50"
          >
            {loading 
              ? t('verification.verifying', 'Vérification...') 
              : t('verification.verify', 'Vérifier')
            }
          </button>
        </div>
      </form>

      {/* Demo info */}
      <div className="mt-6 p-3 bg-gray-50 rounded-lg text-xs text-gray-600">
        💡 {t('verification.demo', 'Mode démo: Entrez n\'importe quel code à 4 chiffres')}
      </div>
    </div>
  );
};

export default Verification;