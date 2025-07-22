
import React, { useState } from 'react';
import './App.css'


const OnboardingWireframes = () => {
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [language, setLanguage] = useState('fr');
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);

  const isRTL = language === 'ar';

  const handleNext = () => {
    switch(currentScreen) {
      case 'welcome':
        setCurrentScreen('signup');
        break;
      case 'signup':
        setCurrentScreen('phone');
        break;
      case 'phone':
        setCurrentScreen('verification');
        break;
      case 'verification':
        setCurrentScreen('profile');
        break;
      case 'profile':
        setCurrentScreen('subjects');
        break;
      case 'subjects':
        setCurrentScreen('diagnostic');
        break;
      case 'diagnostic':
        setCurrentScreen('results');
        break;
      case 'results':
        setCurrentScreen('dashboard');
        break;
      default:
        setCurrentScreen('welcome');
    }
  };

  const handleBack = () => {
    switch(currentScreen) {
      case 'signup':
        setCurrentScreen('welcome');
        break;
      case 'phone':
        setCurrentScreen('signup');
        break;
      case 'verification':
        setCurrentScreen('phone');
        break;
      case 'profile':
        setCurrentScreen('verification');
        break;
      case 'subjects':
        setCurrentScreen('profile');
        break;
      case 'diagnostic':
        setCurrentScreen('subjects');
        break;
      case 'results':
        setCurrentScreen('diagnostic');
        break;
      case 'dashboard':
        setCurrentScreen('results');
        break;
      default:
        setCurrentScreen('welcome');
    }
  };

  const toggleLanguage = () => {
    setLanguage(lang => lang === 'fr' ? 'ar' : 'fr');
    setShowLanguageSelector(false);
  };

  // Dynamic styles for RTL
  const containerStyle = {
    direction: isRTL ? 'rtl' : 'ltr',
    textAlign: isRTL ? 'right' : 'left',
  };

  // Wireframe screens
  const renderScreen = () => {
    switch(currentScreen) {
      case 'welcome':
        return (
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-full bg-indigo-600 flex items-center justify-center text-white text-3xl font-bold mb-6">N</div>
            <h1 className="text-2xl font-bold text-center mb-3">
              {isRTL ? 'مرحبًا بك في نجاحي!' : 'Bienvenue sur Najahi!'}
            </h1>
            <p className="text-gray-600 text-center mb-8">
              {isRTL ? 'منصة التعلم الذكية للنجاح في امتحانات الباكالوريا' : 'La plateforme d\'apprentissage intelligente pour réussir au Bac'}
            </p>
            <div className="flex gap-4 mb-6">
              <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            </div>
            <button 
              onClick={handleNext}
              className="w-full py-3 bg-indigo-600 text-white rounded-lg font-medium mb-3"
            >
              {isRTL ? 'البدء' : 'Commencer'}
            </button>
            <button 
              className="w-full py-3 border border-gray-300 text-gray-700 rounded-lg font-medium"
            >
              {isRTL ? 'تسجيل الدخول' : 'Se connecter'}
            </button>
          </div>
        );
      case 'signup':
        return (
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold mb-6">
              {isRTL ? 'إنشاء حساب' : 'Créer un compte'}
            </h1>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                {isRTL ? 'الاسم الكامل' : 'Nom complet'}
              </label>
              <input 
                type="text" 
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder={isRTL ? 'محمد العلوي' : 'Mohammed Alaoui'} 
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                {isRTL ? 'البريد الإلكتروني' : 'Email'}
              </label>
              <input 
                type="email" 
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder={isRTL ? 'mohammed@example.com' : 'mohammed@example.com'} 
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                {isRTL ? 'كلمة المرور' : 'Mot de passe'}
              </label>
              <input 
                type="password" 
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder={isRTL ? '••••••••' : '••••••••'} 
              />
            </div>
            <div className="flex items-center mb-6">
              <input type="checkbox" className="w-4 h-4 text-indigo-600 border-gray-300 rounded" />
              <label className="ml-2 block text-sm text-gray-700">
                {isRTL ? 'أوافق على الشروط والأحكام' : 'J\'accepte les conditions d\'utilisation'}
              </label>
            </div>
            <div className="flex gap-4 mb-6">
              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
              <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={handleBack}
                className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium"
              >
                {isRTL ? 'رجوع' : 'Retour'}
              </button>
              <button 
                onClick={handleNext}
                className="flex-1 py-3 bg-indigo-600 text-white rounded-lg font-medium"
              >
                {isRTL ? 'متابعة' : 'Continuer'}
              </button>
            </div>
            
          </div>
          
        );
      case 'phone':
        return (
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold mb-2">
              {isRTL ? 'إضافة رقم الهاتف' : 'Ajouter un numéro'}
            </h1>
            <p className="text-gray-600 mb-6">
              {isRTL ? 'سنرسل لك رمز تحقق للمتابعة' : 'Nous vous enverrons un code de vérification'}
            </p>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">
                {isRTL ? 'رقم الهاتف' : 'Numéro de téléphone'}
              </label>
              <div className="flex">
                <div className="bg-gray-100 p-3 rounded-l-lg border border-gray-300 border-r-0">
                  +212
                </div>
                <input 
                  type="tel" 
                  className="flex-1 p-3 border border-gray-300 rounded-r-lg"
                  placeholder="6 12 34 56 78" 
                />
              </div>
            </div>
            <div className="flex items-center mb-6">
              <input type="checkbox" className="w-4 h-4 text-indigo-600 border-gray-300 rounded" />
              <label className="ml-2 block text-sm text-gray-700">
                {isRTL ? 'تلقي تحديثات دراسية عبر الرسائل' : 'Recevoir des mises à jour d\'étude par SMS'}
              </label>
            </div>
            <div className="flex gap-4 mb-6">
              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
              <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={handleBack}
                className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium"
              >
                {isRTL ? 'رجوع' : 'Retour'}
              </button>
              <button 
                onClick={handleNext}
                className="flex-1 py-3 bg-indigo-600 text-white rounded-lg font-medium"
              >
                {isRTL ? 'إرسال الرمز' : 'Envoyer le code'}
              </button>
            </div>
          </div>
        );
      case 'verification':
        return (
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold mb-2">
              {isRTL ? 'التحقق من رقم الهاتف' : 'Vérification du numéro'}
            </h1>
            <p className="text-gray-600 mb-6">
              {isRTL ? 'أدخل الرمز المكون من 4 أرقام المرسل إلى +212612345678' : 'Entrez le code à 4 chiffres envoyé au +212612345678'}
            </p>
            <div className="flex justify-between mb-6">
              <input type="text" maxLength="1" className="w-14 h-14 text-center text-xl font-bold border border-gray-300 rounded-lg" />
              <input type="text" maxLength="1" className="w-14 h-14 text-center text-xl font-bold border border-gray-300 rounded-lg" />
              <input type="text" maxLength="1" className="w-14 h-14 text-center text-xl font-bold border border-gray-300 rounded-lg" />
              <input type="text" maxLength="1" className="w-14 h-14 text-center text-xl font-bold border border-gray-300 rounded-lg" />
            </div>
            <p className="text-center text-sm text-gray-500 mb-6">
              {isRTL ? 'لم تتلق الرمز؟' : 'Vous n\'avez pas reçu le code?'} <button className="text-indigo-600 font-medium">{isRTL ? 'إعادة الإرسال' : 'Renvoyer'}</button>
            </p>
            <div className="flex gap-4 mb-6">
              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
              <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={handleBack}
                className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium"
              >
                {isRTL ? 'رجوع' : 'Retour'}
              </button>
              <button 
                onClick={handleNext}
                className="flex-1 py-3 bg-indigo-600 text-white rounded-lg font-medium"
              >
                {isRTL ? 'تأكيد' : 'Vérifier'}
              </button>
            </div>
          </div>
        );
      case 'profile':
        return (
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold mb-6">
              {isRTL ? 'إعداد ملفك الشخصي' : 'Configurer votre profil'}
            </h1>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                {isRTL ? 'المستوى الدراسي' : 'Niveau d\'études'}
              </label>
              <select className="w-full p-3 border border-gray-300 rounded-lg bg-white">
                <option>{isRTL ? '2ème Année Baccalauréat' : '2ème Année Baccalauréat'}</option>
                <option>{isRTL ? '1ère Année Baccalauréat' : '1ère Année Baccalauréat'}</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                {isRTL ? 'الشعبة' : 'Filière'}
              </label>
              <select className="w-full p-3 border border-gray-300 rounded-lg bg-white">
                <option>{isRTL ? 'Sciences Mathématiques A' : 'Sciences Mathématiques A'}</option>
                <option>{isRTL ? 'Sciences Physiques' : 'Sciences Physiques'}</option>
                <option>{isRTL ? 'Sciences de la Vie et de la Terre' : 'Sciences de la Vie et de la Terre'}</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                {isRTL ? 'المدرسة/الثانوية' : 'Établissement'}
              </label>
              <input 
                type="text" 
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder={isRTL ? 'ثانوية محمد الخامس' : 'Lycée Mohammed V'} 
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                {isRTL ? 'المدينة' : 'Ville'}
              </label>
              <input 
                type="text" 
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder={isRTL ? 'الدار البيضاء' : 'Casablanca'} 
              />
            </div>
            <div className="flex gap-3 mb-6">
              <button 
                onClick={handleBack}
                className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium"
              >
                {isRTL ? 'رجوع' : 'Retour'}
              </button>
              <button 
                onClick={handleNext}
                className="flex-1 py-3 bg-indigo-600 text-white rounded-lg font-medium"
              >
                {isRTL ? 'متابعة' : 'Continuer'}
              </button>
            </div>
          </div>
        );
      case 'subjects':
        return (
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold mb-2">
              {isRTL ? 'اختر المواد' : 'Choisissez vos matières'}
            </h1>
            <p className="text-gray-600 mb-6">
              {isRTL ? 'حدد المواد التي ترغب في التركيز عليها' : 'Sélectionnez les matières sur lesquelles vous souhaitez vous concentrer'}
            </p>
            
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="border border-indigo-200 bg-indigo-50 p-3 rounded-lg flex items-center">
                <input type="checkbox" className="w-4 h-4 text-indigo-600 border-gray-300 rounded mr-3" defaultChecked />
                <span className="text-gray-800">Mathématiques</span>
              </div>
              <div className="border border-indigo-200 bg-indigo-50 p-3 rounded-lg flex items-center">
                <input type="checkbox" className="w-4 h-4 text-indigo-600 border-gray-300 rounded mr-3" defaultChecked />
                <span className="text-gray-800">Physique-Chimie</span>
              </div>
              <div className="border border-gray-200 p-3 rounded-lg flex items-center">
                <input type="checkbox" className="w-4 h-4 text-indigo-600 border-gray-300 rounded mr-3" />
                <span className="text-gray-800">SVT</span>
              </div>
              <div className="border border-gray-200 p-3 rounded-lg flex items-center">
                <input type="checkbox" className="w-4 h-4 text-indigo-600 border-gray-300 rounded mr-3" />
                <span className="text-gray-800">Français</span>
              </div>
              <div className="border border-gray-200 p-3 rounded-lg flex items-center">
                <input type="checkbox" className="w-4 h-4 text-indigo-600 border-gray-300 rounded mr-3" />
                <span className="text-gray-800">Anglais</span>
              </div>
              <div className="border border-gray-200 p-3 rounded-lg flex items-center">
                <input type="checkbox" className="w-4 h-4 text-indigo-600 border-gray-300 rounded mr-3" />
                <span className="text-gray-800">Philosophie</span>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button 
                onClick={handleBack}
                className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium"
              >
                {isRTL ? 'رجوع' : 'Retour'}
              </button>
              <button 
                onClick={handleNext}
                className="flex-1 py-3 bg-indigo-600 text-white rounded-lg font-medium"
              >
                {isRTL ? 'متابعة' : 'Continuer'}
              </button>
            </div>
          </div>
        );
      case 'diagnostic':
        return (
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold mb-2">
              {isRTL ? 'اختبار تشخيصي' : 'Test de diagnostic'}
            </h1>
            <p className="text-gray-600 mb-6">
              {isRTL ? 'أجب على هذه الأسئلة لنقيم مستواك ونخصص لك مسارًا تعليميًا مناسبًا' : 'Répondez à ces questions pour que nous puissions évaluer votre niveau et personnaliser votre parcours'}
            </p>
            
            <div className="bg-white p-4 border border-gray-200 rounded-lg mb-6">
              <div className="flex justify-between items-center mb-3">
                <h2 className="font-medium">Mathématiques</h2>
                <span className="text-sm text-gray-500">Question 1/5</span>
              </div>
              <p className="mb-4">Calculez la dérivée de la fonction f(x) = x² + 3x - 2</p>
              <div className="space-y-3">
                <div className="border border-gray-200 p-3 rounded-lg flex items-center">
                  <input type="radio" name="q1" className="w-4 h-4 text-indigo-600 border-gray-300 rounded mr-3" />
                  <span className="text-gray-800">f'(x) = 2x + 3</span>
                </div>
                <div className="border border-gray-200 p-3 rounded-lg flex items-center">
                  <input type="radio" name="q1" className="w-4 h-4 text-indigo-600 border-gray-300 rounded mr-3" />
                  <span className="text-gray-800">f'(x) = x + 3</span>
                </div>
                <div className="border border-gray-200 p-3 rounded-lg flex items-center">
                  <input type="radio" name="q1" className="w-4 h-4 text-indigo-600 border-gray-300 rounded mr-3" />
                  <span className="text-gray-800">f'(x) = 2x</span>
                </div>
                <div className="border border-gray-200 p-3 rounded-lg flex items-center">
                  <input type="radio" name="q1" className="w-4 h-4 text-indigo-600 border-gray-300 rounded mr-3" />
                  <span className="text-gray-800">f'(x) = 2x² + 3</span>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between items-center mb-6">
              <button className="py-2 px-4 border border-gray-300 text-gray-700 rounded-lg">
                {isRTL ? 'السابق' : 'Précédent'}
              </button>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-600 rounded-full"></span>
                <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
                <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
                <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
                <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
              </div>
              <button className="py-2 px-4 bg-indigo-600 text-white rounded-lg">
                {isRTL ? 'التالي' : 'Suivant'}
              </button>
            </div>
            
            <button 
              onClick={handleNext}
              className="w-full py-3 border border-gray-300 text-indigo-600 rounded-lg font-medium"
            >
              {isRTL ? 'تخطي الاختبار التشخيصي' : 'Passer le test diagnostic'}
            </button>
          </div>
        );
      case 'results':
        return (
          <div className="flex flex-col">
            <div className="bg-indigo-600 -mx-4 px-4 pt-6 pb-10 mb-4">
              <h1 className="text-2xl font-bold text-white mb-2">
                {isRTL ? 'تحليل مستواك' : 'Analyse de votre niveau'}
              </h1>
              <p className="text-indigo-100 mb-6">
                {isRTL ? 'بناءً على إجاباتك، قمنا بتحليل نقاط قوتك ومجالات التحسين' : 'Basé sur vos réponses, nous avons analysé vos forces et axes d\'amélioration'}
              </p>
              <div className="bg-white rounded-lg p-4 shadow-lg">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-bold text-lg">
                    {isRTL ? 'مؤشر الاستعداد للباكالوريا' : 'Indice de préparation Bac'}
                  </h2>
                  <div className="text-2xl font-bold text-indigo-600">63%</div>
                </div>
                <div className="mb-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Mathématiques</span>
                    <span className="font-medium">70%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-indigo-600 h-2 rounded-full" style={{width: '70%'}}></div>
                  </div>
                </div>
                <div className="mb-5">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Physique-Chimie</span>
                    <span className="font-medium">55%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-indigo-600 h-2 rounded-full" style={{width: '55%'}}></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 border border-green-100 rounded-lg p-4 mb-6">
              <h2 className="font-medium text-gray-900 mb-2">
                {isRTL ? 'نقاط القوة' : 'Points forts'}
              </h2>
              <ul className="text-gray-700 space-y-1">
                <li>• Algèbre linéaire</li>
                <li>• Géométrie analytique</li>
                <li>• Mécanique</li>
              </ul>
            </div>
            
            <div className="bg-amber-50 border border-amber-100 rounded-lg p-4 mb-8">
              <h2 className="font-medium text-gray-900 mb-2">
                {isRTL ? 'مجالات التحسين' : 'Axes d\'amélioration'}
              </h2>
              <ul className="text-gray-700 space-y-1">
                <li>• Probabilités</li>
                <li>• Chimie organique</li>
                <li>• Électricité</li>
              </ul>
            </div>
            
            <button 
              onClick={handleNext}
              className="w-full py-3 bg-indigo-600 text-white rounded-lg font-medium mb-3"
            >
              {isRTL ? 'الانتقال إلى لوحة التحكم' : 'Accéder au tableau de bord'}
            </button>
          </div>
        );
      case 'dashboard':
        return (
          <div className="flex flex-col">
            <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 -mx-4 px-4 pt-6 pb-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h1 className="text-xl font-bold text-white">
                    {isRTL ? 'مرحبًا، محمد!' : 'Bonjour, Mohammed!'}
                  </h1>
                  <p className="text-indigo-100">
                    {isRTL ? 'جاهز للتعلم اليوم؟' : 'Prêt à apprendre aujourd\'hui?'}
                  </p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2">
                  <div className="text-lg font-bold text-white">0</div>
                  <p className="text-xs text-indigo-100">XP</p>
                </div>
              </div>
              
              <div className="flex gap-3 -mx-1 pb-2 overflow-x-auto">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 flex-shrink-0 w-32 text-center">
                  <p className="text-xs text-indigo-100 mb-1">Objectif du jour</p>
                  <p className="text-lg font-bold text-white">60 min</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 flex-shrink-0 w-32 text-center">
                  <p className="text-xs text-indigo-100 mb-1">Série</p>
                  <p className="text-lg font-bold text-white">0 jours</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 flex-shrink-0 w-32 text-center">
                  <p className="text-xs text-indigo-100 mb-1">Niveau</p>
                  <p className="text-lg font-bold text-white">1</p>
                </div>
              </div>
            </div>
            
            <h2 className="font-bold text-lg mb-4">
              {isRTL ? 'مقترح لك' : 'Recommandé pour vous'}
            </h2>
            
            <div className="grid gap-4 mb-6">
              <div className="bg-white p-4 border border-gray-200 rounded-lg">
                <div className="flex">
                  <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center text-xl flex-shrink-0">
                    📐
                  </div>
                  <div className="ml-3">
                    <h3 className="font-medium">Limites et continuité</h3>
                    <p className="text-sm text-gray-500">Mathématiques • 25 min</p>
                    <button className="mt-2 px-3 py-1.5 bg-indigo-600 text-white text-sm rounded-lg">
                      Commencer
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-4 border border-gray-200 rounded-lg">
                <div className="flex">
                  <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-xl flex-shrink-0">
                    ⚗️
                  </div>
                  <div className="ml-3">
                    <h3 className="font-medium">Équilibre chimique</h3>
                    <p className="text-sm text-gray-500">Physique-Chimie • 20 min</p>
                    <button className="mt-2 px-3 py-1.5 bg-indigo-600 text-white text-sm rounded-lg">
                      Commencer
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-4 border border-indigo-100 rounded-lg mb-6">
              <h2 className="font-bold mb-3">
                {isRTL ? 'بدء رحلتك' : 'Commencez votre parcours'}
              </h2>
              <p className="text-gray-600 text-sm mb-3">
                {isRTL ? 'أكمل هذه الخطوات لبدء رحلة التعلم الخاصة بك' : 'Complétez ces étapes pour démarrer votre parcours d\'apprentissage'}
              </p>
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-sm mr-3">
                    ✓
                  </div>
                  <span className="text-gray-700">Compléter votre profil</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-sm mr-3">
                    1
                  </div>
                  <span className="text-gray-700">Terminer votre première leçon</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center text-sm mr-3">
                    2
                  </div>
                  <span className="text-gray-500">Compléter un quiz</span>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };
  
  return (
    <div className="bg-gray-50 min-h-screen relative" style={containerStyle}>
      {/* Language toggle */}
      <div className="absolute top-4 right-4 z-10">
        <button 
          onClick={() => setShowLanguageSelector(!showLanguageSelector)}
          className="bg-white/80 backdrop-blur-sm rounded-full w-8 h-8 flex items-center justify-center shadow-sm"
        >
          {language === 'fr' ? 'FR' : 'عر'}
        </button>
        
        {showLanguageSelector && (
          <div className="absolute top-10 right-0 bg-white rounded-lg shadow-md py-1 w-32">
            <button 
              onClick={() => setLanguage('fr')}
              className={`block w-full px-4 py-2 text-left ${language === 'fr' ? 'text-indigo-600 bg-indigo-50' : 'text-gray-700'}`}
            >
              Français
            </button>
            <button 
              onClick={() => setLanguage('ar')}
              className={`block w-full px-4 py-2 text-left ${language === 'ar' ? 'text-indigo-600 bg-indigo-50' : 'text-gray-700'}`}
            >
              العربية
            </button>
          </div>
        )}
      </div>
      
      {/* Progress indicator */}
      {currentScreen !== 'welcome' && currentScreen !== 'dashboard' && (
        <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200">
          <div 
            className="h-1 bg-indigo-600 transition-all duration-300" 
            style={{ 
              width: currentScreen === 'signup' ? '20%' : 
                     currentScreen === 'phone' ? '40%' : 
                     currentScreen === 'verification' ? '60%' :
                     currentScreen === 'profile' ? '70%' :
                     currentScreen === 'subjects' ? '80%' :
                     currentScreen === 'diagnostic' ? '90%' :
                     currentScreen === 'results' ? '100%' : '0%'
            }}
          ></div>
        </div>
      )}
      
      <div className="container mx-auto max-w-md px-4 py-8">
        {/* Screen content */}
        {renderScreen()}
      </div>
      
      {/* Navigation instructions */}
      <div className="fixed bottom-4 left-0 right-0 flex justify-center">
        <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm text-xs text-gray-500">
          👆 Prototype interactive - Cliquez sur les boutons pour naviguer
        </div>
      </div>
    </div>
  );
};

export default OnboardingWireframes;

