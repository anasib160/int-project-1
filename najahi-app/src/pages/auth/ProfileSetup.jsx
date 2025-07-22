// src/pages/auth/ProfileSetup.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';
import { updateProfile } from '../../services/auth';

const ProfileSetup = () => {
  const navigate = useNavigate();
  const { t, isRTL } = useLanguage();
  const [formData, setFormData] = useState({
    level: '',
    filiere: '',
    school: '',
    city: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const levels = [
    { value: '2bac', label: '2ème Année Baccalauréat' },
    { value: '1bac', label: '1ère Année Baccalauréat' }
  ];

  const filieres = [
    { value: 'sm-a', label: 'Sciences Mathématiques A' },
    { value: 'sm-b', label: 'Sciences Mathématiques B' },
    { value: 'pc', label: 'Sciences Physiques' },
    { value: 'svt', label: 'Sciences de la Vie et de la Terre' },
    { value: 'eco', label: 'Sciences Économiques et Gestion' },
    { value: 'lettres', label: 'Lettres et Sciences Humaines' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error when user starts typing/selecting
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.level) {
      newErrors.level = t('profile.error.level', 'Veuillez sélectionner votre niveau');
    }

    if (!formData.filiere) {
      newErrors.filiere = t('profile.error.filiere', 'Veuillez sélectionner votre filière');
    }

    if (!formData.school.trim()) {
      newErrors.school = t('profile.error.school', 'Le nom de l\'établissement est requis');
    }

    if (!formData.city.trim()) {
      newErrors.city = t('profile.error.city', 'La ville est requise');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      await updateProfile(formData);
      navigate('/subjects');
    } catch (error) {
      setErrors({
        submit: error.response?.data?.message || t('profile.error.general', 'Erreur lors de la mise à jour du profil')
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/verification');
  };

  return (
    <div className="flex flex-col">
      <h1 className="text-2xl font-bold mb-6">
        {t('profile.title', 'Configurer votre profil')}
      </h1>

      {errors.submit && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4">
          {errors.submit}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
            {t('profile.level', 'Niveau d\'études')}
          </label>
          <select
            name="level"
            value={formData.level}
            onChange={handleInputChange}
            className={`w-full p-3 border rounded-lg bg-white ${
              errors.level ? 'border-red-300' : 'border-gray-300'
            }`}
          >
            <option value="">{t('profile.selectLevel', 'Sélectionnez votre niveau')}</option>
            {levels.map(level => (
              <option key={level.value} value={level.value}>
                {level.label}
              </option>
            ))}
          </select>
          {errors.level && (
            <p className="text-red-500 text-sm mt-1">{errors.level}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
            {t('profile.filiere', 'Filière')}
          </label>
          <select
            name="filiere"
            value={formData.filiere}
            onChange={handleInputChange}
            className={`w-full p-3 border rounded-lg bg-white ${
              errors.filiere ? 'border-red-300' : 'border-gray-300'
            }`}
          >
            <option value="">{t('profile.selectFiliere', 'Sélectionnez votre filière')}</option>
            {filieres.map(filiere => (
              <option key={filiere.value} value={filiere.value}>
                {filiere.label}
              </option>
            ))}
          </select>
          {errors.filiere && (
            <p className="text-red-500 text-sm mt-1">{errors.filiere}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
            {t('profile.school', 'Établissement')}
          </label>
          <input
            type="text"
            name="school"
            value={formData.school}
            onChange={handleInputChange}
            className={`w-full p-3 border rounded-lg ${
              errors.school ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder={t('profile.schoolPlaceholder', 'Lycée Mohammed V')}
          />
          {errors.school && (
            <p className="text-red-500 text-sm mt-1">{errors.school}</p>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2">
            {t('profile.city', 'Ville')}
          </label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            className={`w-full p-3 border rounded-lg ${
              errors.city ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder={t('profile.cityPlaceholder', 'Casablanca')}
          />
          {errors.city && (
            <p className="text-red-500 text-sm mt-1">{errors.city}</p>
          )}
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
            disabled={loading}
            className="flex-1 py-3 bg-indigo-600 text-white rounded-lg font-medium disabled:opacity-50"
          >
            {loading ? t('common.loading', 'Chargement...') : t('common.continue', 'Continuer')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileSetup;
