import React, { useState, useCallback } from 'react';
import { Download, Upload } from 'lucide-react';
import { ResultsSummary } from './ResultsSummary';
import { ResultsDetails } from './ResultsDetails';
import { ResultsAnomalies } from './ResultsAnomalies';

const Results = ({ language, translations, themeClasses }) => {
  const [activeView, setActiveView] = useState('summary');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [showExportModal, setShowExportModal] = useState(false);
  
  // Accéder aux traductions spécifiques aux résultats
  const t = translations[language].results;
  const [exportFormat, setExportFormat] = useState('excel');

  // Données simulées - À remplacer par des appels API réels
  const mockData = {
    candidates: [
      { name: 'Candidat A', votes: 1250000, color: '#34D399' },
      { name: 'Candidat B', votes: 980000, color: '#60A5FA' },
      { name: 'Candidat C', votes: 750000, color: '#F472B6' },
      { name: 'Candidat D', votes: 520000, color: '#FBBF24' }
    ],
    summary: {
      totalVotes: 3500000,
      validVotes: 3300000,
      invalidVotes: 150000,
      blankVotes: 50000,
      participation: 67.5
    },
    regions: ['Nord', 'Sud', 'Est', 'Ouest', 'Centre'],
    regionalResults: [
      { name: 'Nord', value: 850000 },
      { name: 'Sud', value: 750000 },
      { name: 'Est', value: 650000 },
      { name: 'Ouest', value: 700000 },
      { name: 'Centre', value: 550000 }
    ],
    voteDistribution: [
      { name: 'Votes Valides', value: 3300000 },
      { name: 'Votes Invalides', value: 150000 },
      { name: 'Votes Blancs', value: 50000 }
    ],
    anomalies: [
      {
        id: 1,
        type: 'Incohérence des totaux',
        location: 'Bureau 042 - Nord',
        description: 'Le total des votes dépasse le nombre d\'inscrits',
        status: 'pending'
      },
      {
        id: 2,
        type: 'PV manquant',
        location: 'Bureau 156 - Sud',
        description: 'Procès verbal non téléversé',
        status: 'validated'
      },
      {
        id: 3,
        type: 'Doublons',
        location: 'Bureau 089 - Est',
        description: 'Résultats soumis deux fois',
        status: 'rejected'
      }
    ]
  };

  const handleExport = useCallback(() => {
    setShowExportModal(true);
  }, []);

  const handleUploadPV = useCallback((event) => {
    const file = event.target.files[0];
    // Logique de téléversement à implémenter
    console.log('Uploading file:', file);
  }, []);

  const ExportModal = () => (
    <div className={`
      fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50
      ${showExportModal ? 'block' : 'hidden'}
    `}>
      <div className={`${themeClasses.cardBg} rounded-lg p-6 max-w-md w-full mx-4`}>
        <h3 className={`text-lg font-semibold mb-4 ${themeClasses.text}`}>
          {t.exportTitle}
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className={`block mb-2 ${themeClasses.text}`}>
              {t.exportFormat}
            </label>
            <select 
              className={`w-full p-2 rounded ${themeClasses.border} ${themeClasses.cardBg} ${themeClasses.text}`}
              value={exportFormat}
              onChange={(e) => setExportFormat(e.target.value)}
            >
              <option value="excel">Excel (.xlsx)</option>
              <option value="pdf">PDF</option>
              <option value="json">JSON</option>
            </select>
          </div>

          <div>
            <label className={`block mb-2 ${themeClasses.text}`}>
              {t.exportRegion}
            </label>
            <select 
              className={`w-full p-2 rounded ${themeClasses.border} ${themeClasses.cardBg} ${themeClasses.text}`}
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
            >
              <option value="all">{t.all}</option>
              {mockData.regions.map(region => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              className={`px-4 py-2 rounded ${themeClasses.border} ${themeClasses.text}`}
              onClick={() => setShowExportModal(false)}
            >
              Annuler
            </button>
            <button
              className="px-4 py-2 rounded bg-teal-500 text-white"
              onClick={() => {
                // Logique d'export à implémenter
                setShowExportModal(false);
              }}
            >
              Exporter
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      {/* En-tête avec actions */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex gap-2">
          <select 
            className={`${themeClasses.cardBg} ${themeClasses.text} ${themeClasses.border} rounded-lg px-4 py-2`}
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
          >
            <option value="all">{translations[language].results.all}</option>
            {mockData.regions.map((region) => (
              <option key={region} value={region}>{region}</option>
            ))}
          </select>
        </div>
        
        <div className="flex gap-2">
          {/* <label className={`
            ${themeClasses.cardBg} ${themeClasses.text} ${themeClasses.border} 
            rounded-lg px-4 py-2 flex items-center gap-2 cursor-pointer
          `}>
            <Upload className="h-5 w-5" />
            {translations[language].results.uploadPV}
            <input
              type="file"
              className="hidden"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleUploadPV}
            />
          </label> */}
          <button 
            className={`${themeClasses.cardBg} ${themeClasses.text} ${themeClasses.border} rounded-lg px-4 py-2 flex items-center gap-2`}
            onClick={handleExport}
          >
            <Download className="h-5 w-5" />
            {t.downloadResults}
          </button>
        </div>
      </div>

      {/* Navigation des vues */}
      <div className="flex gap-4 mb-6">
        <button 
          className={`px-4 py-2 rounded-lg ${activeView === 'summary' ? 'bg-teal-500 text-white' : `${themeClasses.cardBg} ${themeClasses.text}`}`}
          onClick={() => setActiveView('summary')}
        >
          {t.summary}
        </button>
        <button 
          className={`px-4 py-2 rounded-lg ${activeView === 'details' ? 'bg-teal-500 text-white' : `${themeClasses.cardBg} ${themeClasses.text}`}`}
          onClick={() => setActiveView('details')}
        >
          {t.details}
        </button>
        <button 
          className={`px-4 py-2 rounded-lg ${activeView === 'anomalies' ? 'bg-teal-500 text-white' : `${themeClasses.cardBg} ${themeClasses.text}`}`}
          onClick={() => setActiveView('anomalies')}
        >
          {t.anomalies}
        </button>
      </div>

      {/* Contenu principal */}
      {activeView === 'summary' && (
        <ResultsSummary 
          data={mockData}
          translations={translations}
          language={language}
          themeClasses={themeClasses}
        />
      )}

      {activeView === 'details' && (
        <ResultsDetails 
          data={mockData}
          translations={translations}
          language={language}
          themeClasses={themeClasses}
        />
      )}

      {activeView === 'anomalies' && (
        <ResultsAnomalies 
          data={mockData}
          translations={translations}
          language={language}
          themeClasses={themeClasses}
        />
      )}

      {/* Modal d'export */}
      <ExportModal />
    </div>
  );
};

export default Results;