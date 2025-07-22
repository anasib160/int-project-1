// src/pages/auth/DiagnosticTest.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';

const DiagnosticTest = () => {
  const navigate = useNavigate();
  const { t, isRTL } = useLanguage();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);

  // Sample questions - in real app, this would come from API
  const questions = [
    {
      id: 1,
      subject: 'Mathématiques',
      question: 'Calculez la dérivée de la fonction f(x) = x² + 3x - 2',
      options: [
        "f'(x) = 2x + 3",
        "f'(x) = x + 3",
        "f'(x) = 2x",
        "f'(x) = 2x² + 3"
      ],
      correctAnswer: 0
    },
    {
      id: 2,
      subject: 'Physique-Chimie',
      question: 'Quelle est la formule de la force électrostatique?',
      options: [
        "F = ma",
        "F = k(q₁q₂)/r²",
        "F = mg",
        "F = qE"
      ],
      correctAnswer: 1
    },
    {
      id: 3,
      subject: 'Mathématiques',
      question: 'Quelle est la limite de (sin x)/x quand x tend vers 0?',
      options: [
        "0",
        "1",
        "∞",
        "La limite n'existe pas"
      ],
      correctAnswer: 1
    },
    {
      id: 4,
      subject: 'Physique-Chimie',
      question: 'Dans un mouvement rectiligne uniformément accéléré, la relation v = v₀ + at représente:',
      options: [
        "La position en fonction du temps",
        "La vitesse en fonction du temps",
        "L'accélération en fonction du temps",
        "La distance parcourue"
      ],
      correctAnswer: 1
    },
    {
      id: 5,
      subject: 'Mathématiques',
      question: 'Quelle est la primitive de 2x + 1?',
      options: [
        "x² + x + C",
        "2x² + x + C",
        "x² + 2x + C",
        "2"
      ],
      correctAnswer: 0
    }
  ];

  const handleAnswerSelect = (optionIndex) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion]: optionIndex
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      handleFinishTest();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleSkipTest = () => {
    navigate('/results');
  };

  const handleFinishTest = async () => {
    setLoading(true);
    try {
      // Calculate results
      let correctAnswers = 0;
      const subjectScores = {};

      questions.forEach((question, index) => {
        const userAnswer = answers[index];
        const isCorrect = userAnswer === question.correctAnswer;

        if (isCorrect) correctAnswers++;

        if (!subjectScores[question.subject]) {
          subjectScores[question.subject] = { correct: 0, total: 0 };
        }

        subjectScores[question.subject].total++;
        if (isCorrect) subjectScores[question.subject].correct++;
      });

      // Calculate percentages
      const results = {
        overall: Math.round((correctAnswers / questions.length) * 100),
        subjects: {}
      };

      Object.keys(subjectScores).forEach(subject => {
        results.subjects[subject] = Math.round(
          (subjectScores[subject].correct / subjectScores[subject].total) * 100
        );
      });

      // Store results
      localStorage.setItem('najahi-diagnostic-results', JSON.stringify(results));
      navigate('/results');
    } catch (error) {
      console.error('Error processing test results:', error);
    } finally {
      setLoading(false);
    }
  };

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="flex flex-col">
      <h1 className="text-2xl font-bold mb-2">
        {t('diagnostic.title', 'Test de diagnostic')}
      </h1>
      <p className="text-gray-600 mb-6">
        {t('diagnostic.description', 'Répondez à ces questions pour que nous puissions évaluer votre niveau et personnaliser votre parcours')}
      </p>

      <div className="bg-white p-4 border border-gray-200 rounded-lg mb-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-medium">{currentQ.subject}</h2>
          <span className="text-sm text-gray-500">
            Question {currentQuestion + 1}/{questions.length}
          </span>
        </div>

        <p className="mb-4">{currentQ.question}</p>

        <div className="space-y-3">
          {currentQ.options.map((option, index) => (
            <div
              key={index}
              onClick={() => handleAnswerSelect(index)}
              className={`border p-3 rounded-lg flex items-center cursor-pointer transition-colors ${
                answers[currentQuestion] === index
                  ? 'border-indigo-200 bg-indigo-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <input
                type="radio"
                name={`question-${currentQuestion}`}
                checked={answers[currentQuestion] === index}
                onChange={() => {}} // Handled by div onClick
                className="w-4 h-4 text-indigo-600 border-gray-300 mr-3 pointer-events-none"
              />
              <span className="text-gray-800 select-none">{option}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
        <div
          className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex justify-between items-center mb-6">
        <button
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          className="py-2 px-4 border border-gray-300 text-gray-700 rounded-lg disabled:opacity-50"
        >
          {t('diagnostic.previous', 'Précédent')}
        </button>

        <div className="flex items-center gap-2">
          {questions.map((_, index) => (
            <span
              key={index}
              className={`w-2 h-2 rounded-full ${
                index === currentQuestion
                  ? 'bg-indigo-600'
                  : index < currentQuestion
                  ? 'bg-indigo-300'
                  : 'bg-gray-300'
              }`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          disabled={answers[currentQuestion] === undefined || loading}
          className="py-2 px-4 bg-indigo-600 text-white rounded-lg disabled:opacity-50"
        >
          {loading
            ? t('common.loading', 'Chargement...')
            : currentQuestion === questions.length - 1
            ? t('diagnostic.finish', 'Terminer')
            : t('diagnostic.next', 'Suivant')
          }
        </button>
      </div>

      <button
        onClick={handleSkipTest}
        className="w-full py-3 border border-gray-300 text-indigo-600 rounded-lg font-medium"
      >
        {t('diagnostic.skip', 'Passer le test diagnostic')}
      </button>
    </div>
  );
};

export default DiagnosticTest;
