import React from 'react';
// import { 
//   PieChart, 
//   Pie, 
//   ResponsiveContainer, 
//   Tooltip, 
//   Legend,
//   TreeMap
// } from 'recharts';

export const ResultsDetails = ({ data, translations, language, themeClasses }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Résultats par région */}
      <div className={`${themeClasses.cardBg} p-4 rounded-lg shadow`}>
        <h3 className={`text-lg font-semibold mb-4 ${themeClasses.text}`}>
          {translations[language].results.byRegion}
        </h3>
        <div className="h-96">
          {/* <ResponsiveContainer width="100%" height="100%">
            <TreeMap
              data={data.regionalResults}
              dataKey="value"
              aspectRatio={4 / 3}
              stroke="#fff"
              fill="#8884d8"
            >
              <Tooltip />
            </TreeMap>
          </ResponsiveContainer> */}
        </div>
      </div>

      {/* Distribution des votes */}
      <div className={`${themeClasses.cardBg} p-4 rounded-lg shadow`}>
        <h3 className={`text-lg font-semibold mb-4 ${themeClasses.text}`}>
          {translations[language].results.detailedResults}
        </h3>
        <div className="h-96">
          {/* <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data.voteDistribution}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={120}
                fill="#8884d8"
                label
              />
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer> */}
        </div>
      </div>
    </div>
  );
};