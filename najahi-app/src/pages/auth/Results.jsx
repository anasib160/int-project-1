// src/pages/auth/Results.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';

const Results = () => {
  const navigate = useNavigate();
  const { t, isRTL } = useLanguage();
  const [results, setResults] = useState(null);

  useEffect(() => {
    // Load results from localStorage or generate default results
    const storedResults = localStorage.getItem('najahi-diagnostic-results');
    if (storedResults) {
      setResults(JSON.parse(storedResults));
    } else {
      // Default results for skipped test
      setResults({
        overall: 63,
        subjects: {
          'Mathématiques': 70,
          'Physique-Chimie': 55
        }
      });
    }
  }, []);

  const handleContinue = () => {
    navigate('/dashboard');
  };

  if (!results) {
    return (
      <div className="flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        <p className="mt-4 text-gray-600">{t('common.loading', 'Chargement...')}</p>
      </div>
    );
  }

  // Analyze strengths and weaknesses
  const subjects = Object.entries(results.subjects);
  const strengths = subjects.filter(([_, score]) => score >= 70).map(([subject]) => subject);
  const improvements = subjects.filter(([_, score]) => score < 70).map(([subject]) => subject);

  // Sample specific topics (in real app, this would be determined by detailed analysis)
  const strengthTopics = [
    'Algèbre linéaire',
    'Géométrie analytique',
    'Mécanique'
  ];

  const improvementTopics = [
    'Probabilités',
    'Chimie organique',
    'Électricité'
  ];

  return (
    <div className="flex flex-col">
      <div className="bg-indigo-600 -mx-4 px-4 pt-6 pb-10 mb-4">
        <h1 className="text-2xl font-bold text-white mb-2">
          {t('results.title', 'Analyse de votre niveau')}
        </h1>
        <p className="text-indigo-100 mb-6">
          {t('results.description', 'Basé sur vos réponses, nous avons analysé vos forces et axes d\'amélioration')}
        </p>

        <div className="bg-white rounded-lg p-4 shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-lg">
              {t('results.bacIndex', 'Indice de préparation Bac')}
            </h2>
            <div className="text-2xl font-bold text-indigo-600">
              {results.overall}%
            </div>
          </div>

          {subjects.map(([subject, score]) => (
            <div key={subject} className="mb-3">
              <div className="flex justify-between text-sm mb-1">
                <span>{subject}</span>
                <span className="font-medium">{score}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${score}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {strengths.length > 0 && (
        <div className="bg-green-50 border border-green-100 rounded-lg p-4 mb-4">
          <h2 className="font-medium text-gray-900 mb-2">
            {t('results.strengths', 'Points forts')}
          </h2>
          <ul className="text-gray-700 space-y-1">
            {strengthTopics.map((topic, index) => (
              <li key={index}>• {topic}</li>
            ))}
          </ul>
        </div>
      )}

      {improvements.length > 0 && (
        <div className="bg-amber-50 border border-amber-100 rounded-lg p-4 mb-6">
          <h2 className="font-medium text-gray-900 mb-2">
            {t('results.improvements', 'Axes d\'amélioration')}
          </h2>
          <ul className="text-gray-700 space-y-1">
            {improvementTopics.map((topic, index) => (
              <li key={index}>• {topic}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-8">
        <h2 className="font-medium text-gray-900 mb-2">
          {t('results.recommendation', 'Recommandation')}
        </h2>
        <p className="text-gray-700 text-sm">
          {results.overall >= 70
            ? t('results.goodLevel', 'Vous avez un bon niveau général. Continuez à vous exercer régulièrement pour maintenir vos acquis.')
            : results.overall >= 50
            ? t('results.averageLevel', 'Votre niveau est correct mais nécessite du renforcement dans certaines matières. Concentrez-vous sur vos axes d\'amélioration.')
            : t('results.needsWork', 'Il est recommandé de revoir les bases dans les matières principales. Un plan de révision intensif vous aidera à progresser.')
          }
        </p>
      </div>

      <button
        onClick={handleContinue}
        className="w-full py-3 bg-indigo-600 text-white rounded-lg font-medium"
      >
        {t('results.continue', 'Accéder au tableau de bord')}
      </button>
    </div>
  );
};

export default Results;
