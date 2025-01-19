import React, { useState } from 'react';
import { Plus, Search, Edit2, Trash2, MapPin } from 'lucide-react';
import PollingStationModal from './PollingStationModal';


const PollingStations = ({ language, translations, themeClasses }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedStation, setSelectedStation] = useState(null);
    const [stations, setStations] = useState([]);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
    const t = translations[language].pollingStations;
  
    const handleEdit = (station) => {
      setSelectedStation(station);
      setIsModalOpen(true);
    };
  
    const handleSubmit = (formData) => {
      if (selectedStation) {
        setStations(prevStations => 
          prevStations.map(station => 
            station.id === selectedStation.id ? { ...formData, id: station.id } : station
          )
        );
      } else {
        setStations(prevStations => [...prevStations, { ...formData, id: Date.now() }]);
      }
      setIsModalOpen(false);
      setSelectedStation(null);
    };

    const handleDelete = (id) => {
      setShowDeleteConfirm(id);
    };

    const confirmDelete = (id) => {
      setStations(prevStations => prevStations.filter(station => station.id !== id));
      setShowDeleteConfirm(null);
    };
  
    return (
      <div className="space-y-6">
        <PollingStationModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedStation(null);
          }}
          station={selectedStation}
          onSubmit={handleSubmit}
          themeClasses={themeClasses}
          language={language}
          translations={t}
        />
  
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              className={`pl-10 pr-4 py-2 w-full rounded-lg border ${themeClasses.border} ${themeClasses.cardBg} ${themeClasses.text}`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600"
          >
            <Plus className="h-4 w-4" />
            <span>{t.newStation}</span>
          </button>
        </div>
  
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className={`${themeClasses.cardBg} p-6 rounded-xl`}>
            <h3 className={`${themeClasses.secondaryText} text-sm font-medium`}>{t.totalStations}</h3>
            <p className={`${themeClasses.text} text-2xl font-bold mt-2`}>{stations.length}</p>
          </div>
          <div className={`${themeClasses.cardBg} p-6 rounded-xl`}>
            <h3 className={`${themeClasses.secondaryText} text-sm font-medium`}>{t.totalCapacity}</h3>
            <p className={`${themeClasses.text} text-2xl font-bold mt-2`}>
              {stations.reduce((sum, station) => sum + Number(station.capacite), 0)}
            </p>
          </div>
          <div className={`${themeClasses.cardBg} p-6 rounded-xl`}>
            <h3 className={`${themeClasses.secondaryText} text-sm font-medium`}>{t.activeStations}</h3>
            <p className={`${themeClasses.text} text-2xl font-bold mt-2`}>
              {stations.filter(station => station.statut === 'actif').length}
            </p>
          </div>
        </div>
  
        <div className={`${themeClasses.cardBg} rounded-xl overflow-hidden`}>
          <div className="overflow-x-auto">
            {stations.length > 0 ? (
              <table className="w-full">
                <thead className={`${themeClasses.border}`}>
                  <tr className={`border-b ${themeClasses.border}`}>
                    <th className={`px-6 py-4 text-left ${themeClasses.secondaryText}`}>{t.tableHeaders.name}</th>
                    <th className={`px-6 py-4 text-left ${themeClasses.secondaryText}`}>{t.tableHeaders.votingCenter}</th>
                    <th className={`px-6 py-4 text-left ${themeClasses.secondaryText}`}>{t.tableHeaders.location}</th>
                    <th className={`px-6 py-4 text-left ${themeClasses.secondaryText}`}>{t.tableHeaders.coordinates}</th>
                    <th className={`px-6 py-4 text-left ${themeClasses.secondaryText}`}>{t.tableHeaders.capacity}</th>
                    <th className={`px-6 py-4 text-left ${themeClasses.secondaryText}`}>{t.tableHeaders.status}</th>
                    <th className={`px-6 py-4 text-left ${themeClasses.secondaryText}`}>{t.tableHeaders.actions}</th>
                  </tr>
                </thead>
                <tbody>
                  {stations.map((station) => (
                    <tr key={station.id} className={`border-b ${themeClasses.border}`}>
                      <td className={`px-6 py-4 ${themeClasses.text}`}>{station.nom}</td>
                      <td className={`px-6 py-4 ${themeClasses.text}`}>{station.centreDeVote}</td>
                      <td className={`px-6 py-4 ${themeClasses.text}`}>
                        {`${station.region} - ${station.departement} - ${station.arrondissement}`}
                      </td>
                      <td className={`px-6 py-4 ${themeClasses.text}`}>
                        {`${station.latitude}, ${station.longitude}`}
                      </td>
                      <td className={`px-6 py-4 ${themeClasses.text}`}>{station.capacite}</td>
                      <td className={`px-6 py-4`}>
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          station.statut === 'actif' 
                            ? 'bg-green-100 text-green-800' 
                            : station.statut === 'en-preparation'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {t.status[station.statut]}
                        </span>
                      </td>
                      <td className={`px-6 py-4`}>
                        <div className="flex space-x-2">
                          <button 
                            className="p-1 hover:bg-slate-200 rounded"
                            onClick={() => handleEdit(station)}
                          >
                            <Edit2 className="h-4 w-4 text-blue-500" />
                          </button>
                          <button className="p-2 rounded-lg hover:bg-slate-100">
                            <MapPin className="h-4 w-4 text-green-500" />
                          </button>
                          {showDeleteConfirm === station.id ? (
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => confirmDelete(station.id)}
                                className="text-xs bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                              >
                                {t.delete.confirm}
                              </button>
                              <button
                                onClick={() => setShowDeleteConfirm(null)}
                                className="text-xs bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600"
                              >
                                {t.delete.cancel}
                              </button>
                            </div>
                          ) : (
                            <button 
                              onClick={() => handleDelete(station.id)}
                              className="p-1 hover:bg-slate-200 rounded"
                            >
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="flex flex-col items-center justify-center py-12">
                <p className={`${themeClasses.text} text-lg`}>{t.noStations}</p>
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="mt-4 flex items-center space-x-2 px-4 py-2 text-teal-500 hover:text-teal-600"
                >
                  <Plus className="h-4 w-4" />
                  <span>{t.addStation}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

export default PollingStations;