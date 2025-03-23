import React from 'react';

const PlayerForm = ({ 
  playerNumber, 
  playerName, 
  setPlayerName, 
  playerScore, 
  setPlayerScore,
  playerStrikes, 
  setPlayerStrikes,
  playerSpares, 
  setPlayerSpares,
  playerOpens, 
  setPlayerOpens
}) => {
  return (
    <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
      <h3 className="text-lg font-semibold mb-3 text-indigo-700">Player {playerNumber}</h3>
      
      <div className="mb-3">
        <label htmlFor={`player${playerNumber}Name`} className="block text-gray-700 font-medium mb-1">
          Name:
        </label>
        <select
          id={`player${playerNumber}Name`}
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="Andy">Andy</option>
          <option value="Patrick">Patrick</option>
        </select>
      </div>
      
      <div className="mb-3">
        <label htmlFor={`player${playerNumber}Score`} className="block text-gray-700 font-medium mb-1">
          Final Score:
        </label>
        <input
          type="number"
          id={`player${playerNumber}Score`}
          value={playerScore}
          onChange={(e) => setPlayerScore(e.target.value)}
          min="0"
          max="300"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        {playerScore !== '' && (parseInt(playerScore) < 0 || parseInt(playerScore) > 300) && (
          <p className="text-red-500 text-sm mt-1">Score must be between 0 and 300</p>
        )}
      </div>
      
      <div className="mb-3">
        <label htmlFor={`player${playerNumber}Strikes`} className="block text-gray-700 font-medium mb-1">
          Strikes: {playerStrikes}
        </label>
        <input
          type="range"
          id={`player${playerNumber}Strikes`}
          value={playerStrikes}
          onChange={(e) => setPlayerStrikes(parseInt(e.target.value))}
          min="0"
          max="12"
          className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-xs text-gray-500">
          <span>0</span>
          <span>12</span>
        </div>
      </div>
      
      <div className="mb-3">
        <label htmlFor={`player${playerNumber}Spares`} className="block text-gray-700 font-medium mb-1">
          Spares: {playerSpares}
        </label>
        <input
          type="range"
          id={`player${playerNumber}Spares`}
          value={playerSpares}
          onChange={(e) => setPlayerSpares(parseInt(e.target.value))}
          min="0"
          max="10"
          className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-xs text-gray-500">
          <span>0</span>
          <span>10</span>
        </div>
      </div>
      
      <div>
        <label htmlFor={`player${playerNumber}Opens`} className="block text-gray-700 font-medium mb-1">
          Opens: {playerOpens}
        </label>
        <input
          type="range"
          id={`player${playerNumber}Opens`}
          value={playerOpens}
          onChange={(e) => setPlayerOpens(parseInt(e.target.value))}
          min="0"
          max="10"
          className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-xs text-gray-500">
          <span>0</span>
          <span>10</span>
        </div>
      </div>
    </div>
  );
};

export default PlayerForm;