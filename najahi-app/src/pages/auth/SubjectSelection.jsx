// src/pages/auth/SubjectSelection.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';

const SubjectSelection = () => {
  const navigate = useNavigate();
  const { t, isRTL } = useLanguage();
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [loading, setLoading] = useState(false);

  const subjects = [
    { id: 'math', name: 'Mathématiques', priority: true },
    { id: 'physics', name: 'Physique-Chimie', priority: true },
    { id: 'svt', name: 'SVT', priority: false },
    { id: 'french', name: 'Français', priority: false },
    { id: 'english', name: 'Anglais', priority: false },
    { id: 'philosophy', name: 'Philosophie', priority: false },
    { id: 'arabic', name: 'Arabe', priority: false },
    { id: 'islamic', name: 'Éducation Islamique', priority: false }
  ];

  // Initialize with priority subjects selected
  useState(() => {
    const prioritySubjects = subjects.filter(subject => subject.priority).map(subject => subject.id);
    setSelectedSubjects(prioritySubjects);
  }, []);

  const handleSubjectToggle = (subjectId) => {
    setSelectedSubjects(prev => {
      if (prev.includes(subjectId)) {
        return prev.filter(id => id !== subjectId);
      } else {
        return [...prev, subjectId];
      }
    });
  };

  const handleSubmit = async () => {
    if (selectedSubjects.length === 0) {
      alert(t('subjects.error.minOne', 'Veuillez sélectionner au moins une matière'));
      return;
    }

    setLoading(true);
    try {
      // Save selected subjects
      localStorage.setItem('najahi-subjects', JSON.stringify(selectedSubjects));
      navigate('/diagnostic');
    } catch (error) {
      console.error('Error saving subjects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/profile');
  };

  return (
    <div className="flex flex-col">
      <h1 className="text-2xl font-bold mb-2">
        {t('subjects.title', 'Choisissez vos matières')}
      </h1>
      <p className="text-gray-600 mb-6">
        {t('subjects.description', 'Sélectionnez les matières sur lesquelles vous souhaitez vous concentrer')}
      </p>

      <div className="grid grid-cols-2 gap-3 mb-6">
        {subjects.map(subject => {
          const isSelected = selectedSubjects.includes(subject.id);
          return (
            <div
              key={subject.id}
              onClick={() => handleSubjectToggle(subject.id)}
              className={`border p-3 rounded-lg flex items-center cursor-pointer transition-colors ${
                isSelected
                  ? 'border-indigo-200 bg-indigo-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => {}} // Handled by div onClick
                className="w-4 h-4 text-indigo-600 border-gray-300 rounded mr-3 pointer-events-none"
              />
              <span className="text-gray-800 select-none">{subject.name}</span>
            </div>
          );
        })}
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-500 text-center">
          {selectedSubjects.length} {t('subjects.selected', 'matière(s) sélectionnée(s)')}
        </p>
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleBack}
          className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium"
        >
          {t('common.back', 'Retour')}
        </button>
        <button
          onClick={handleSubmit}
          disabled={loading || selectedSubjects.length === 0}
          className="flex-1 py-3 bg-indigo-600 text-white rounded-lg font-medium disabled:opacity-50"
        >
          {loading ? t('common.loading', 'Chargement...') : t('common.continue', 'Continuer')}
        </button>
      </div>
    </div>
  );
};

export default SubjectSelection;
