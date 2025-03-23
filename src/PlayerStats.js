import React from 'react';

const PlayerStats = ({ player, stats, colorScheme }) => {
  const colors = {
    indigo: {
      border: 'border-indigo-200',
      bg: 'bg-indigo-50',
      title: 'text-indigo-700',
      value: 'text-indigo-600'
    },
    green: {
      border: 'border-green-200',
      bg: 'bg-green-50',
      title: 'text-green-700',
      value: 'text-green-600'
    }
  };

  const theme = colors[colorScheme] || colors.indigo;

  return (
    <div className={`border ${theme.border} rounded-lg p-4 ${theme.bg}`}>
      <h3 className={`text-lg font-semibold mb-3 ${theme.title} text-center`}>{player}</h3>
      
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-white p-3 rounded shadow-sm">
          <div className="text-gray-600 text-sm">Total Pins</div>
          <div className={`text-2xl font-bold ${theme.value}`}>{stats.totalPins}</div>
        </div>
        <div className="bg-white p-3 rounded shadow-sm">
          <div className="text-gray-600 text-sm">Average Score</div>
          <div className={`text-2xl font-bold ${theme.value}`}>{stats.avgScore}</div>
        </div>
      </div>
      
      <div className="mt-4 grid grid-cols-3 gap-2">
        <div className="text-center">
          <div className="text-sm text-gray-600">Strikes</div>
          <div className="font-semibold">{stats.totalStrikes} total</div>
          <div className="text-xs text-gray-500">({stats.avgStrikes} avg)</div>
        </div>
        <div className="text-center">
          <div className="text-sm text-gray-600">Spares</div>
          <div className="font-semibold">{stats.totalSpares} total</div>
          <div className="text-xs text-gray-500">({stats.avgSpares} avg)</div>
        </div>
        <div className="text-center">
          <div className="text-sm text-gray-600">Opens</div>
          <div className="font-semibold">{stats.totalOpens} total</div>
          <div className="text-xs text-gray-500">({stats.avgOpens} avg)</div>
        </div>
      </div>
    </div>
  );
};

export default PlayerStats;