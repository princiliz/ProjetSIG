import React from 'react';
import { 
  Paper,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import { 
  BarChart, 
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

export const ResultsSummary = ({ data, translations, language, themeClasses }) => {
  const t = translations[language].results.resultsSummary;

  const candidatesWithPercentage = data.candidates.map(candidate => ({
    ...candidate,
    percentage: ((candidate.votes / data.summary.validVotes) * 100).toFixed(2)
  }));

  const pieChartData = [
    { name: t.validVotes, value: data.summary.validVotes },
    { name: t.invalidVotes, value: data.summary.invalidVotes },
    { name: t.blankVotes, value: data.summary.blankVotes }
  ];

  return (
    <Grid container spacing={3}>
      {/* Cartes statistiques */}
      <Grid item xs={12} container spacing={2}>
        <Grid item xs={12} md={3}>
          <Paper elevation={2} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>{t.totalVotes}</Typography>
            <Typography variant="h4">
              {data.summary.totalVotes.toLocaleString()}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper elevation={2} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>{t.participation}</Typography>
            <Typography variant="h4">
              {data.summary.participation}%
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper elevation={2} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>{t.invalidVotes}</Typography>
            <Typography variant="h4">
              {data.summary.invalidVotes.toLocaleString()}
              <Typography component="span" variant="body2" color="text.secondary">
                {' '}({((data.summary.invalidVotes / data.summary.totalVotes) * 100).toFixed(1)}%)
              </Typography>
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper elevation={2} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>{t.blankVotes}</Typography>
            <Typography variant="h4">
              {data.summary.blankVotes.toLocaleString()}
              <Typography component="span" variant="body2" color="text.secondary">
                {' '}({((data.summary.blankVotes / data.summary.totalVotes) * 100).toFixed(1)}%)
              </Typography>
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Graphiques */}
      <Grid item xs={12} container spacing={2}>
        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>{t.detailedResults}</Typography>
            <div style={{ height: 400 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={candidatesWithPercentage}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis label={{ value: t.percentage, angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Bar dataKey="percentage">
                    {candidatesWithPercentage.map((candidate, index) => (
                      <Cell key={index} fill={candidate.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>{t.filterResults}</Typography>
            <div style={{ height: 400 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieChartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={150}
                    label={({name, percent}) => `${name} ${(percent * 100).toFixed(1)}%`}
                  >
                    <Cell fill="#2E7D32" />
                    <Cell fill="#C62828" />
                    <Cell fill="#757575" />
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Paper>
        </Grid>
      </Grid>

      {/* Tableau détaillé */}
      <Grid item xs={12}>
        <Paper elevation={2} sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>{t.detailedResults}</Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>{t.candidate}</TableCell>
                  <TableCell align="right">{t.votes}</TableCell>
                  <TableCell align="right">{t.percentage}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {candidatesWithPercentage.map((candidate, index) => (
                  <TableRow key={index}>
                    <TableCell>{candidate.name}</TableCell>
                    <TableCell align="right">{candidate.votes.toLocaleString()}</TableCell>
                    <TableCell align="right">{candidate.percentage}%</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Grid>
    </Grid>
  );
};