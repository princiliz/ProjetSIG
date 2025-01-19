import React from 'react';
import { AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

export const ResultsAnomalies = ({ data, translations, language, themeClasses }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'validated':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'rejected':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className={`${themeClasses.cardBg} rounded-lg shadow overflow-hidden`}>
      <table className="w-full">
        <thead className={`${themeClasses.border}`}>
          <tr>
            <th className={`px-4 py-3 text-left ${themeClasses.text}`}>
              {translations[language].results.anomalyType}
            </th>
            <th className={`px-4 py-3 text-left ${themeClasses.text}`}>
              {translations[language].results.anomalyLocation}
            </th>
            <th className={`px-4 py-3 text-left ${themeClasses.text}`}>
              {translations[language].results.anomalyDescription}
            </th>
            <th className={`px-4 py-3 text-center ${themeClasses.text}`}>
              {translations[language].results.status}
            </th>
            <th className={`px-4 py-3 text-center ${themeClasses.text}`}>
              {translations[language].results.actions}
            </th>
          </tr>
        </thead>
        <tbody>
          {data.anomalies.map((anomaly, index) => (
            <tr key={index} className={`border-t ${themeClasses.border}`}>
              <td className={`px-4 py-3 ${themeClasses.text}`}>{anomaly.type}</td>
              <td className={`px-4 py-3 ${themeClasses.text}`}>{anomaly.location}</td>
              <td className={`px-4 py-3 ${themeClasses.text}`}>{anomaly.description}</td>
              <td className={`px-4 py-3 text-center`}>
                {getStatusIcon(anomaly.status)}
              </td>
              <td className={`px-4 py-3 text-center`}>
                <button
                  className="text-teal-500 hover:text-teal-600"
                  //onClick={() => handleResolveAnomaly(anomaly.id)}
                >
                  {translations[language].results.resolveAnomaly}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};