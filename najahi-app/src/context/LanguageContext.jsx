import { createContext, useState, useCallback, useEffect } from 'react';

const translations = {
  fr: {
    'welcome.title': 'Bienvenue sur Najahi!',
    'welcome.description': 'La plateforme d\'apprentissage intelligente pour réussir au Bac',
    'welcome.start_button': 'Commencer',
    'welcome.login_button': 'Se connecter',
    
    'login.title': 'Se connecter',
    'login.email': 'Email',
    'login.password': 'Mot de passe',
    'login.submit': 'Se connecter',
    'login.forgotPassword': 'Mot de passe oublié?',
    'login.noAccount': 'Vous n\'avez pas de compte?',
    'login.signup': 'S\'inscrire',
    
    'signup.title': 'Créer un compte',
    'signup.fullName': 'Nom complet',
    'signup.fullNamePlaceholder': 'Mohammed Alaoui',
    'signup.email': 'Email',
    'signup.password': 'Mot de passe',
    'signup.acceptTerms': 'J\'accepte les conditions d\'utilisation',
    'signup.error.fullName': 'Le nom complet est requis',
    'signup.error.email': 'L\'email est requis',
    'signup.error.emailInvalid': 'Format d\'email invalide',
    'signup.error.password': 'Le mot de passe est requis',
    'signup.error.passwordLength': 'Le mot de passe doit contenir au moins 6 caractères',
    'signup.error.terms': 'Vous devez accepter les conditions',
    
    // PHONE PAGE TRANSLATIONS - ADD THESE
    'phone.title': 'Ajouter un numéro',
    'phone.description': 'Nous vous enverrons un code de vérification',
    'phone.label': 'Numéro de téléphone',
    'phone.format': 'Format: 6 ou 7 suivi de 8 chiffres',
    'phone.acceptSMS': 'Recevoir des mises à jour d\'étude par SMS',
    'phone.sendCode': 'Envoyer le code',
    'phone.sending': 'Envoi...',
    'phone.demo': 'Mode démo: Utilisez un numéro comme "6 12 34 56 78"',
    'phone.error.required': 'Le numéro de téléphone est requis',
    'phone.error.invalid': 'Format de numéro invalide (ex: 6 12 34 56 78)',
    'phone.error.general': 'Erreur lors de l\'envoi du code',
    
    'common.back': 'Retour',
    'common.continue': 'Continuer'
  },
  
  ar: {
    'welcome.title': 'مرحبًا بك في نجاحي!',
    'welcome.description': 'منصة التعلم الذكية للنجاح في امتحانات الباكالوريا',
    'welcome.start_button': 'البدء',
    'welcome.login_button': 'تسجيل الدخول',
    
    'login.title': 'تسجيل الدخول',
    'login.email': 'البريد الإلكتروني',
    'login.password': 'كلمة المرور',
    'login.submit': 'تسجيل الدخول',
    'login.forgotPassword': 'نسيت كلمة المرور؟',
    'login.noAccount': 'ليس لديك حساب؟',
    'login.signup': 'إنشاء حساب',
    
    'signup.title': 'إنشاء حساب',
    'signup.fullName': 'الاسم الكامل',
    'signup.fullNamePlaceholder': 'محمد العلوي',
    'signup.email': 'البريد الإلكتروني',
    'signup.password': 'كلمة المرور',
    'signup.acceptTerms': 'أوافق على الشروط والأحكام',
    'signup.error.fullName': 'الاسم الكامل مطلوب',
    'signup.error.email': 'البريد الإلكتروني مطلوب',
    'signup.error.emailInvalid': 'تنسيق البريد الإلكتروني غير صحيح',
    'signup.error.password': 'كلمة المرور مطلوبة',
    'signup.error.passwordLength': 'كلمة المرور يجب أن تحتوي على 6 أحرف على الأقل',
    'signup.error.terms': 'يجب قبول الشروط والأحكام',
    
    // PHONE PAGE TRANSLATIONS IN ARABIC - ADD THESE
    'phone.title': 'إضافة رقم الهاتف',
    'phone.description': 'سنرسل لك رمز تحقق',
    'phone.label': 'رقم الهاتف',
    'phone.format': 'الصيغة: 6 أو 7 متبوعة بـ 8 أرقام',
    'phone.acceptSMS': 'تلقي تحديثات الدراسة عبر الرسائل النصية',
    'phone.sendCode': 'إرسال الرمز',
    'phone.sending': 'جاري الإرسال...',
    'phone.demo': 'وضع التجريب: استخدم رقماً مثل "6 12 34 56 78"',
    'phone.error.required': 'رقم الهاتف مطلوب',
    'phone.error.invalid': 'تنسيق الرقم غير صحيح (مثال: 6 12 34 56 78)',
    'phone.error.general': 'خطأ في إرسال الرمز',
    
    'common.back': 'رجوع',
    'common.continue': 'متابعة'
  }
};

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(
    localStorage.getItem('najahi-language') || 'fr'
  );

  const changeLanguage = useCallback((lang) => {
    setLanguage(lang);
    localStorage.setItem('najahi-language', lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, []);

  const t = useCallback((key, fallback = '') => {
    return translations[language][key] || fallback;
  }, [language]);

  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider value={{
      language,
      changeLanguage,
      t,
      isRTL: language === 'ar'
    }}>
      {children}
    </LanguageContext.Provider>
  );
};