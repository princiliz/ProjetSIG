import React, { useState } from 'react';
import { Users, Plus, Pencil, Trash2, Search } from 'lucide-react';

const PollWorkers = ({ language, translations, themeClasses }) => {
    const t = translations[language].pollWorkers;

    const [scrutateurs, setScrutateurs] = useState([
        { id: 1, name: 'Jean Atangana', email: 'jean@example.com', phone: '+237 623456789', pollingStation: 'Bureau 001', votingCenter: 'Centre A', username: 'jAtangana'},
        { id: 2, name: 'Marie Solanage Bessala', email: 'marie@example.com', phone: '+237 623456790', pollingStation: 'Bureau 002', votingCenter: 'Centre B', username: 'sBessala' },
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [newScrutateur, setNewScrutateur] = useState({
        name: '',
        email: '',
        phone: '',
        username: '',
        password: '',
        votingCenter: '',
        pollingStation: ''
    });
    
    const pollingStations = [
        { id: '001', name: 'Bureau 001' },
        { id: '002', name: 'Bureau 002' },
        { id: '003', name: 'Bureau 003' },
    ];

    const votingCenters = [
        { id: 'A', name: 'Centre A' },
        { id: 'B', name: 'Centre B' },
        { id: 'C', name: 'Centre C' },
    ];

    const filteredScrutateurs = scrutateurs.filter(scrutateur =>
        scrutateur.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        scrutateur.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        scrutateur.pollingStation.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = (id) => {
        setScrutateurs(scrutateurs.filter(s => s.id !== id));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewScrutateur(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newScrutateur.name || !newScrutateur.email || !newScrutateur.phone || 
            !newScrutateur.username || !newScrutateur.password || 
            !newScrutateur.votingCenter || !newScrutateur.pollingStation) {
            alert(t.fillAllFields || 'Please fill all fields');
            return;
        }

        const newId = scrutateurs.length > 0 ? Math.max(...scrutateurs.map(s => s.id)) + 1 : 1;
        
        setScrutateurs(prev => [...prev, {
            id: newId,
            ...newScrutateur
        }]);

        setNewScrutateur({
            name: '',
            email: '',
            phone: '',
            username: '',
            password: '',
            votingCenter: '',
            pollingStation: ''
        });
        
        setShowAddModal(false);
    };

    return (
        <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className={`${themeClasses.cardBg} ${themeClasses.border} rounded-lg p-6 border`}>
                    <div className="flex items-center space-x-4">
                        <Users className="h-10 w-10 text-teal-500" />
                        <div>
                            <p className={`text-sm ${themeClasses.secondaryText}`}>
                                {t.totalScrutateurs}
                            </p>
                            <p className={`text-2xl font-bold ${themeClasses.text}`}>
                                {scrutateurs.length}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Search and Add Section */}
            <div className={`${themeClasses.cardBg} ${themeClasses.border} rounded-lg border p-6`}>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="relative flex-1 w-full sm:max-w-xs">
                        <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${themeClasses.secondaryText}`} />
                        <input
                            type="text"
                            placeholder={t.searchScrutateurs}
                            className={`w-full pl-10 pr-4 py-2 rounded-lg border ${themeClasses.border} ${themeClasses.cardBg} ${themeClasses.text}`}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
                    >
                        <Plus className="h-4 w-4" />
                        <span>{t.addScrutateur}</span>
                    </button>
                </div>

                {/* Table */}
                <div className="mt-6 overflow-x-auto">
                    {filteredScrutateurs.length > 0 ? (
                        <table className="w-full">
                            <thead>
                                <tr className={`border-b ${themeClasses.border}`}>
                                    <th className={`text-left px-6 py-3 ${themeClasses.text}`}>{translations[language].name}</th>
                                    <th className={`text-left px-6 py-3 ${themeClasses.text}`}>{translations[language].email}</th>
                                    <th className={`text-left px-6 py-3 ${themeClasses.text}`}>{translations[language].phone}</th>
                                    <th className={`text-left px-6 py-3 ${themeClasses.text}`}>{translations[language].username}</th>
                                    <th className={`text-left px-6 py-3 ${themeClasses.text}`}>{translations[language].votingCenter}</th>
                                    <th className={`text-left px-6 py-3 ${themeClasses.text}`}>{translations[language].pollingStation}</th>
                                    <th className={`text-left px-6 py-3 ${themeClasses.text}`}>{translations[language].actions}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredScrutateurs.map((scrutateur) => (
                                    <tr key={scrutateur.id} className={`border-b ${themeClasses.border}`}>
                                        <td className={`px-6 py-4 ${themeClasses.text}`}>{scrutateur.name}</td>
                                        <td className={`px-6 py-4 ${themeClasses.text}`}>{scrutateur.email}</td>
                                        <td className={`px-6 py-4 ${themeClasses.text}`}>{scrutateur.phone}</td>
                                        <td className={`px-6 py-4 ${themeClasses.text}`}>{scrutateur.username}</td>
                                        <td className={`px-6 py-4 ${themeClasses.text}`}>{scrutateur.votingCenter}</td>
                                        <td className={`px-6 py-4 ${themeClasses.text}`}>{scrutateur.pollingStation}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex space-x-2">
                                                <button className={`p-2 rounded-lg ${themeClasses.hover}`}>
                                                    <Pencil className="h-4 w-4 text-blue-500" />
                                                </button>
                                                <button 
                                                    className={`p-2 rounded-lg ${themeClasses.hover}`}
                                                    onClick={() => handleDelete(scrutateur.id)}
                                                >
                                                    <Trash2 className="h-4 w-4 text-red-500" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className={`text-center py-8 ${themeClasses.text}`}>
                            <Users className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                            <h3 className="text-lg font-medium mb-2">{t.noScrutateurs || 'No poll workers found'}</h3>
                            <p className={`${themeClasses.secondaryText}`}>
                                {t.addScrutateursMessage || 'Click the "Add" button to add poll workers'}
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Add Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className={`${themeClasses.cardBg} rounded-lg p-6 max-w-md w-full mx-4`}>
                        <h2 className={`text-xl font-bold mb-4 ${themeClasses.text}`}>
                            {t.addScrutateur}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                type="text"
                                name="name"
                                placeholder={t.name}
                                value={newScrutateur.name}
                                onChange={handleInputChange}
                                className={`w-full px-4 py-2 rounded-lg border ${themeClasses.border} ${themeClasses.cardBg} ${themeClasses.text}`}
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder={t.email}
                                value={newScrutateur.email}
                                onChange={handleInputChange}
                                className={`w-full px-4 py-2 rounded-lg border ${themeClasses.border} ${themeClasses.cardBg} ${themeClasses.text}`}
                            />
                            <input
                                type="tel"
                                name="phone"
                                placeholder={t.phone}
                                value={newScrutateur.phone}
                                onChange={handleInputChange}
                                className={`w-full px-4 py-2 rounded-lg border ${themeClasses.border} ${themeClasses.cardBg} ${themeClasses.text}`}
                            />
                            <input
                                type="text"
                                name="username"
                                placeholder={translations[language].username}
                                value={newScrutateur.username}
                                onChange={handleInputChange}
                                className={`w-full px-4 py-2 rounded-lg border ${themeClasses.border} ${themeClasses.cardBg} ${themeClasses.text}`}
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder={translations[language].password}
                                value={newScrutateur.password}
                                onChange={handleInputChange}
                                className={`w-full px-4 py-2 rounded-lg border ${themeClasses.border} ${themeClasses.cardBg} ${themeClasses.text}`}
                            />
                            <select
                                name="votingCenter"
                                value={newScrutateur.votingCenter}
                                onChange={handleInputChange}
                                className={`w-full px-4 py-2 rounded-lg border ${themeClasses.border} ${themeClasses.cardBg} ${themeClasses.text}`}
                            >
                                <option value="">{translations[language].selectVotingCenter}</option>
                                {votingCenters.map((center) => (
                                    <option key={center.id} value={center.name}>
                                        {center.name}
                                    </option>
                                ))}
                            </select>
                            <select
                                name="pollingStation"
                                value={newScrutateur.pollingStation}
                                onChange={handleInputChange}
                                className={`w-full px-4 py-2 rounded-lg border ${themeClasses.border} ${themeClasses.cardBg} ${themeClasses.text}`}
                            >
                                <option value="">{t.selectPollingStation}</option>
                                {pollingStations.map((station) => (
                                    <option key={station.id} value={station.name}>
                                        {station.name}
                                    </option>
                                ))}
                            </select>
                            <div className="flex justify-end space-x-2 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setShowAddModal(false)}
                                    className={`px-4 py-2 rounded-lg border ${themeClasses.border} ${themeClasses.hover} ${themeClasses.text}`}
                                >
                                    {t.cancel}
                                </button>
                                <button
                                    type="submit"
                                    className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg"
                                >
                                    {t.save}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PollWorkers;