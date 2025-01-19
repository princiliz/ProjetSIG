import React, { useState, useCallback } from 'react';
import { 
  ClipboardCheck, 
  Upload, 
  AlertTriangle, 
  Check, 
  LogOut,
  ChevronDown,
  Edit2,
  Save,
  FileText
} from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const ResultsEntryPage = () => {
  const [isDark, setIsDark] = useState(false);
  const [formData, setFormData] = useState({
    totalVotants: '',
    totalBulletins: '',
    bulletinsNuls: '',
    bulletinsBlancs: '',
    suffragesExprimes: '',
    candidates: [
      { id: 1, name: 'Candidat 1', party: 'Parti A', votes: '' },
      { id: 2, name: 'Candidat 2', party: 'Parti B', votes: '' },
      { id: 3, name: 'Candidat 3', party: 'Parti C', votes: '' },
    ]
  });
  const [uploadedFile, setUploadedFile] = useState(null);
  const handleUploadPV = useCallback((event) => {
      const file = event.target.files[0];
      // Logique de téléversement à implémenter
      console.log('Uploading file:', file);
    }, []);

  // Classes dynamiques basées sur le thème
  const themeClasses = {
    mainBg: isDark ? 'bg-slate-900' : 'bg-slate-50',
    cardBg: isDark ? 'bg-slate-800' : 'bg-white',
    text: isDark ? 'text-white' : 'text-slate-800',
    secondaryText: isDark ? 'text-slate-300' : 'text-slate-600',
    input: isDark ? 'bg-slate-700 border-slate-600' : 'bg-white border-slate-200',
    headerBg: isDark ? 'bg-slate-800' : 'bg-white',
    hover: isDark ? 'hover:bg-slate-700' : 'hover:bg-slate-50'
  };

  // Calcul automatique des suffrages exprimés
  const calculateSuffragesExprimes = () => {
    const total = parseInt(formData.totalBulletins) || 0;
    const nuls = parseInt(formData.bulletinsNuls) || 0;
    const blancs = parseInt(formData.bulletinsBlancs) || 0;
    return total - nuls - blancs;
  };

  return (
    <div className={`min-h-screen ${themeClasses.mainBg}`}>
      <ThemeToggle isDark={isDark} onToggle={() => setIsDark(!isDark)} />
      
      {/* Header */}
      <header className={`${themeClasses.headerBg} border-b ${isDark ? 'border-slate-700' : 'border-slate-200'} p-4 sticky top-0 z-10`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <ClipboardCheck className="h-8 w-8 text-teal-500" />
            <div>
              <h1 className={`text-xl font-bold ${themeClasses.text}`}>Saisie des Résultats</h1>
              <p className={`text-sm ${themeClasses.secondaryText}`}>Bureau de vote #123 - Quartier Centre</p>
            </div>
          </div>
          <button className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
            <Save className="h-4 w-4" />
            <span>Sauvegarder</span>
          </button>
          <button className="flex items-center space-x-2 text-red-500 hover:text-red-600">
        <LogOut className="h-5 w-5" />
        <span className="hidden sm:inline">
          Deconnexion
        </span>
      </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6 grid gap-6 md:grid-cols-2">
        {/* Section des totaux */}
        <div className={`${themeClasses.cardBg} rounded-xl shadow-lg p-6`}>
          <h2 className={`text-lg font-semibold ${themeClasses.text} mb-4`}>Informations Générales</h2>
          <div className="space-y-4">
            <div>
              <label className={`block text-sm font-medium ${themeClasses.secondaryText} mb-1`}>
                Nombre total de votants
              </label>
              <input
                type="number"
                value={formData.totalVotants}
                onChange={(e) => setFormData({...formData, totalVotants: e.target.value})}
                className={`w-full px-4 py-2 rounded-lg border ${themeClasses.input} ${themeClasses.text}`}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium ${themeClasses.secondaryText} mb-1`}>
                  Bulletins nuls
                </label>
                <input
                  type="number"
                  value={formData.bulletinsNuls}
                  onChange={(e) => setFormData({...formData, bulletinsNuls: e.target.value})}
                  className={`w-full px-4 py-2 rounded-lg border ${themeClasses.input} ${themeClasses.text}`}
                />
              </div>
              <div>
                <label className={`block text-sm font-medium ${themeClasses.secondaryText} mb-1`}>
                  Bulletins blancs
                </label>
                <input
                  type="number"
                  value={formData.bulletinsBlancs}
                  onChange={(e) => setFormData({...formData, bulletinsBlancs: e.target.value})}
                  className={`w-full px-4 py-2 rounded-lg border ${themeClasses.input} ${themeClasses.text}`}
                />
              </div>
            </div>
            <div className={`p-4 rounded-lg bg-teal-500/10 border border-teal-500/20`}>
              <div className="flex justify-between items-center">
                <span className={`font-medium ${themeClasses.text}`}>Suffrages exprimés</span>
                <span className={`text-lg font-bold ${themeClasses.text}`}>
                  {calculateSuffragesExprimes()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Section upload PV */}
        <div className={`${themeClasses.cardBg} rounded-xl shadow-lg p-6`}>
          <h2 className={`text-lg font-semibold ${themeClasses.text} mb-4`}>Procès-verbal</h2>
          <div className={`border-2 border-dashed ${isDark ? 'border-slate-600' : 'border-slate-200'} rounded-lg p-6 text-center`}>
            {uploadedFile ? (
              <div className="space-y-2">
                <FileText className="h-12 w-12 mx-auto text-teal-500" />
                <p className={`${themeClasses.text}`}>{uploadedFile.name}</p>
                <button 
                  className="text-red-500 hover:text-red-600 text-sm"
                  onClick={() => setUploadedFile(null)}
                >
                  Supprimer
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <Upload className="h-12 w-12 mx-auto text-teal-500" />
                <p className={`${themeClasses.text}`}>Déposez votre PV scanné ici</p>
                <p className={`text-sm ${themeClasses.secondaryText}`}>
                  Format PDF ou image (max 10MB)
                </p>
                <button className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg">
                  <label className='cursor-pointer'>
                    Parcourir
                    <input
                      type="file"
                      className="hidden"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleUploadPV}
                    />
                  </label>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Section résultats par candidat */}
        <div className={`${themeClasses.cardBg} rounded-xl shadow-lg p-6 md:col-span-2`}>
          <h2 className={`text-lg font-semibold ${themeClasses.text} mb-4`}>Résultats par Candidat</h2>
          <div className="space-y-4">
            {formData.candidates.map((candidate, index) => (
              <div 
                key={candidate.id}
                className={`p-4 rounded-lg border ${isDark ? 'border-slate-700' : 'border-slate-200'}`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className={`font-medium ${themeClasses.text}`}>{candidate.name}</h3>
                    <p className={`text-sm ${themeClasses.secondaryText}`}>{candidate.party}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <input
                      type="number"
                      value={candidate.votes}
                      onChange={(e) => {
                        const newCandidates = [...formData.candidates];
                        newCandidates[index].votes = e.target.value;
                        setFormData({...formData, candidates: newCandidates});
                      }}
                      className={`w-32 px-4 py-2 rounded-lg border ${themeClasses.input} ${themeClasses.text}`}
                      placeholder="Nombre de voix"
                    />
                    <Edit2 className={`h-5 w-5 ${themeClasses.secondaryText} cursor-pointer hover:text-teal-500`} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ResultsEntryPage;