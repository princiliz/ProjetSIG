import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const PollingStationModal = ({ 
  isOpen, 
  onClose, 
  station, 
  onSubmit,
  themeClasses,
  language, 
  translations 
}) => {
  const [regionsData, setRegionsData] = useState(null);
  const [formData, setFormData] = useState({
    nom: station?.nom || '',
    centreDeVote: station?.centreDeVote || '',
    localisation: station?.localisation || '',
    capacite: station?.capacite || '',
    statut: station?.statut?.toLowerCase() || 'actif',
    region: station?.region || '',
    departement: station?.departement || '',
    arrondissement: station?.arrondissement || '',
    latitude: station?.latitude || '',
    longitude: station?.longitude || ''
  });
  const t = translations.modal;
  const tr = translations.status;

  useEffect(() => {
    const loadRegions = async () => {
      try {
        const response = await fetch('/regions.json');
        const data = await response.json();
        setRegionsData(Array.isArray(data) ? data : [data]);
      } catch (error) {
        console.error('Error loading regions:', error);
      }
    };
    loadRegions();
  }, []);

  const getDepartements = () => {
    if (!regionsData || !formData.region) return [];
    const selectedRegion = regionsData.find(r => r.region === formData.region);
    return selectedRegion?.departments || [];
  };

  const getArrondissements = () => {
    const departments = getDepartements();
    const selectedDept = departments.find(dept => dept.name === formData.departement);
    return selectedDept?.arrondissements || [];
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className={`${themeClasses.cardBg} w-full max-w-md rounded-lg shadow-lg p-6 m-4`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className={`text-xl font-bold ${themeClasses.text}`}>
            {station ? 'Modifier le bureau de vote' : 'Ajouter un nouveau bureau de vote'}
          </h2>
          <button 
            onClick={onClose}
            className={`p-2 hover:bg-opacity-10 hover:bg-gray-500 rounded-full`}
          >
            <X className={`h-5 w-5 ${themeClasses.text}`} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Centre de Vote */}
          <div>
            <label className={`block text-left mb-1 ${themeClasses.text}`}>
              {t.votingCenterName}
            </label>
            <input
              type="text"
              value={formData.centreDeVote}
              onChange={(e) => setFormData({ ...formData, centreDeVote: e.target.value })}
              className={`w-full px-3 py-2 rounded-lg border ${themeClasses.border} ${themeClasses.cardBg} ${themeClasses.text}`}
              placeholder="Ex: École Primaire de Ngoa-Ekele"
              required
            />
          </div>

          {/* Nom */}
          <div>
            <label className={`block text-left mb-1 ${themeClasses.text}`}>
              {t.pollingStationName}
            </label>
            <input
              type="text"
              value={formData.nom}
              onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
              className={`w-full px-3 py-2 rounded-lg border ${themeClasses.border} ${themeClasses.cardBg} ${themeClasses.text}`}
              placeholder="Ex: CETIC de Ngoa-Ekele Salle 2"
              required
            />
          </div>

          {/* Coordonnées géographiques */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={`block text-left mb-1 ${themeClasses.text}`}>
                {t.latitude}
              </label>
              <input
                type="number"
                step="any"
                value={formData.latitude}
                onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
                className={`w-full px-3 py-2 rounded-lg border ${themeClasses.border} ${themeClasses.cardBg} ${themeClasses.text}`}
                placeholder="Ex: 3.8667"
                required
              />
            </div>
            <div>
              <label className={`block text-left mb-1 ${themeClasses.text}`}>
                {t.longitude}
              </label>
              <input
                type="number"
                step="any"
                value={formData.longitude}
                onChange={(e) => setFormData({ ...formData, longitude: e.target.value })}
                className={`w-full px-3 py-2 rounded-lg border ${themeClasses.border} ${themeClasses.cardBg} ${themeClasses.text}`}
                placeholder="Ex: 11.5167"
                required
              />
            </div>
          </div>

          {/* Previous form fields remain unchanged */}
          {/* Région */}
          <div>
            <label className={`block text-left mb-1 ${themeClasses.text}`}>
              {t.region}
            </label>
            <select
                value={formData.region}
                onChange={(e) => setFormData({
                    ...formData,
                    region: e.target.value,
                    departement: '',
                    arrondissement: ''
                })}
                className={`w-full px-3 py-2 rounded-lg border ${themeClasses.border} ${themeClasses.cardBg} ${themeClasses.text}`}
                >
                <option value="">{t.selectRegion}</option>
                {Array.isArray(regionsData) && regionsData.map((region) => (
                    <option key={region.region} value={region.region}>
                    {region.region}
                    </option>
                ))}
                </select>
          </div>

          {/* Rest of form fields... */}
          {/* Département, Arrondissement, Capacité, Statut remain unchanged */}
          <div>
            <label className={`block text-left mb-1 ${themeClasses.text}`}>
              {t.department}
            </label>
            <select
              value={formData.departement}
              onChange={(e) => setFormData({
                ...formData,
                departement: e.target.value,
                arrondissement: ''
              })}
              className={`w-full px-3 py-2 rounded-lg border ${themeClasses.border} ${themeClasses.cardBg} ${themeClasses.text}`}
              disabled={!formData.region}
            >
              <option value="">{t.selectDepartment}</option>
                {Array.isArray(getDepartements()) && getDepartements().map((dept) => (
                    <option key={dept.name} value={dept.name}>
                    {dept.name}
              </option>
              ))}
            </select>
          </div>

          <div>
            <label className={`block text-left mb-1 ${themeClasses.text}`}>
              {t.district}
            </label>
            <select
              value={formData.arrondissement}
              onChange={(e) => setFormData({ ...formData, arrondissement: e.target.value })}
              className={`w-full px-3 py-2 rounded-lg border ${themeClasses.border} ${themeClasses.cardBg} ${themeClasses.text}`}
              disabled={!formData.departement}
            >
              <option value="">{t.selectDistrict}</option>
                {Array.isArray(getArrondissements()) && getArrondissements().map((arr) => (
                    <option key={arr} value={arr}>
                    {arr}
               </option>
            ))}
            </select>
          </div>

          <div>
            <label className={`block text-left mb-1 ${themeClasses.text}`}>
              {t.capacity}
            </label>
            <input
              type="number"
              value={formData.capacite}
              onChange={(e) => setFormData({ ...formData, capacite: e.target.value })}
              className={`w-full px-3 py-2 rounded-lg border ${themeClasses.border} ${themeClasses.cardBg} ${themeClasses.text}`}
              placeholder="Ex: 500"
              required
            />
          </div>

          <div>
            <label className={`block text-left mb-1 ${themeClasses.text}`}>
              {t.status}
            </label>
            <select
              value={formData.statut}
              onChange={(e) => setFormData({ ...formData, statut: e.target.value })}
              className={`w-full px-3 py-2 rounded-lg border ${themeClasses.border} ${themeClasses.cardBg} ${themeClasses.text}`}
            >
              <option value="actif">{tr.active}</option>
              <option value="en-preparation">{tr.preparation}</option>
              <option value="inactif">{tr.inactive}</option>
            </select>
          </div>

          {/* Boutons */}
          <div className="flex justify-end space-x-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className={`px-4 py-2 rounded-lg border ${themeClasses.text} ${themeClasses.border} ${themeClasses.hover}`}
            >
              {t.cancel}
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-teal-500 text-white hover:bg-teal-600"
            >
              {station ? 'Modifier' : 'Créer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PollingStationModal;