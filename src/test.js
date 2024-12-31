// src/pages/Admin/Dashboard.jsx

// src/pages/Admin/ScrutateurManagement.jsx

// src/pages/Admin/PollingStationManagement.jsx

// src/pages/Admin/ResultsDashboard.jsx
import { useState } from 'react';

export const ResultsDashboard = () => {
  const [results, setResults] = useState([
    {
      id: 1,
      pollingStation: 'BV001',
      status: 'pending',
      totalVotes: 450,
      candidates: [
        { name: 'Candidat A', votes: 200 },
        { name: 'Candidat B', votes: 250 },
      ],
    },
    // Add more mock data as needed
  ]);

  const validateResults = (resultId) => {
    setResults(
      results.map((result) =>
        result.id === resultId
          ? { ...result, status: 'validated' }
          : result
      )
    );
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Tableau de Bord des Résultats</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-medium mb-2">Total des Votes</h3>
          <p className="text-3xl font-bold text-blue-600">
            {results.reduce((acc, curr) => acc + curr.totalVotes, 0)}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-medium mb-2">Bureaux Validés</h3>
          <p className="text-3xl font-bold text-green-600">
            {results.filter((r) => r.status === 'validated').length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-medium mb-2">En Attente</h3>
          <p className="text-3xl font-bold text-yellow-600">
            {results.filter((r) => r.status === 'pending').length}
          </p>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Bureau de Vote
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Votes
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Résultats
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Statut
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {results.map((result) => (
              <tr key={result.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {result.pollingStation}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {result.totalVotes}
                </td>
                <td className="px-6 py-4">
                  {result.candidates.map((candidate) => (
                    <div key={candidate.name} className="text-sm">
                      {candidate.name}: {candidate.votes} votes
                    </div>
                  ))}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      result.status === 'validated'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {result.status === 'validated' ? 'Validé' : 'En attente'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {result.status === 'pending' && (
                    <button
                      onClick={() => validateResults(result.id)}
                      className="text-green-600 hover:text-green-900"
                    >
                      Valider
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// src/pages/Scrutateur/ResultEntry.jsx
import { useState } from 'react';

export const ResultEntry = () => {
  const [formData, setFormData] = useState({
    totalVoters: '',
    validVotes: '',
    invalidVotes: '',
    candidates: [
      { id: 1, name: 'Candidat A', votes: '' },
      { id: 2, name: 'Candidat B', votes: '' },
    ],
    attachments: [],
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    const totalVotes = formData.candidates.reduce(
      (sum, candidate) => sum + Number(candidate.votes || 0),
      0
    );

    if (!formData.totalVoters) {
      newErrors.totalVoters = 'Ce champ est requis';
    }
    if (!formData.validVotes) {
      newErrors.validVotes = 'Ce champ est requis';
    }
    if (totalVotes !== Number(formData.validVotes)) {
      newErrors.validVotes = 'Le total des votes ne correspond pas';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Submit data to server
      console.log('Form submitted:', formData);
    }
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, attachments: [...formData.attachments, ...files] });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Saisie des Résultats</h2>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Nombre d'inscrits
          </label>
          <input
            type="number"
            className={`mt-1 block w-full rounded-md shadow-sm ${
              errors.totalVoters ? 'border-red-500' : 'border-gray-300'
            }`}
            value={formData.totalVoters}
            onChange={(e) =>
              setFormData({ ...formData, totalVoters: e.target.value })
            }
          />
          {errors.totalVoters && (
            <p className="mt-1 text-sm text-red-600">{errors.totalVoters}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Bulletins valides
          </label>
          <input
            type="number"
            className={`mt-1 block w-full rounded-md shadow-sm ${
              errors.validVotes ? 'border-red-500' : 'border-gray-300'
            }`}
            value={formData.validVotes}
            onChange={(e) =>
              setFormData({ ...formData, validVotes: e.target.value })
            }
          />
          {errors.validVotes && (
            <p className="mt-1 text-sm text-red-600">{errors.validVotes}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Bulletins nuls
          </label>
          <input
            type="number"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            value={formData.invalidVotes}
            onChange={(e) =>
              setFormData({ ...formData, invalidVotes: e.target.value })
            }
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Résultats par candidat</h3>
          {formData.candidates.map((candidate) => (
            <div key={candidate.id}>
              <label className="block text-sm font-medium text-gray-700">
                {candidate.name}
              </label>
              <input
                type="number"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                value={candidate.votes}
                onChange={(e) => {
                  const newCandidates = formData.candidates.map((c) =>
                    c.id === candidate.id
                      ? { ...c, votes: e.target.value }
                      : c
                  );
                  setFormData({ ...formData, candidates: newCandidates });
                }}
              />
            </div>
          ))}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Procès-verbal scanné
          </label>
          <input
            type="file"
            multiple
            accept="image/*,.pdf"
            onChange={handleFileUpload}
            className="mt-1 block w-full"
          />
          <div className="mt-2 space-y-2">
            {formData.attachments.map((file, index) => (
              <div key={index} className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">{file.name}</span>
                <button
                  type="button"
                  onClick={() => {
                    const newAttachments = formData.attachments.filter(
                      (_, i) => i !== index
                    );
                    setFormData({ ...formData, attachments: newAttachments });
                  }}
                  className="text-red-600 hover:text-red-900"
                >
                  Supprimer
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-gray-700 hover:bg-gray-50"
          >
            Réinitialiser
          </button>
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            Soumettre
          </button>
        </div>
      </form>
    </div>
  );
};