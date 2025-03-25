import React from 'react';

const PlayerStats = ({ player, stats, colorScheme }) => {
  // Dynamically generate color classes based on the color scheme
  const textColorClass = `text-${colorScheme}-700`;
  const bgColorClass = `bg-${colorScheme}-50`;
  const borderColorClass = `border-${colorScheme}-200`;

  return (
    <div className={`${bgColorClass} ${borderColorClass} border rounded-lg p-4`}>
      <h3 className={`text-lg font-semibold ${textColorClass} mb-4 text-center`}>
        {player} Stats
      </h3>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center">
          <div className="text-gray-600">
            <p>Total Games</p>
            <p className={`text-xl font-bold ${textColorClass}`}>{stats.totalGames}</p>
          </div>
        </div>
        
        <div className="text-center">
          <div className="text-gray-600">
            <p>Total Pins</p>
            <p className={`text-xl font-bold ${textColorClass}`}>{stats.totalPins}</p>
          </div>
        </div>
        
        <div className="text-center">
          <div className="text-gray-600">
            <p>Avg Score</p>
            <p className={`text-xl font-bold ${textColorClass}`}>{stats.avgScore}</p>
          </div>
        </div>
        
        <div className="text-center">
          <div className="text-gray-600">
            <p>Avg Strikes</p>
            <p className={`text-xl font-bold ${textColorClass}`}>{stats.avgStrikes}</p>
          </div>
        </div>
        
        <div className="text-center">
          <div className="text-gray-600">
            <p>Avg Spares</p>
            <p className={`text-xl font-bold ${textColorClass}`}>{stats.avgSpares}</p>
          </div>
        </div>
        
        <div className="text-center">
          <div className="text-gray-600">
            <p>Avg Opens</p>
            <p className={`text-xl font-bold ${textColorClass}`}>{stats.avgOpens}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerStats;