import React, { useState } from 'react';

const AddMatchForm = ({ 
  gameDate, 
  setGameDate, 
  submitToGoogleSheets, 
  matches, 
  setMatches 
}) => {
  const [player1Name, setPlayer1Name] = useState('Andy');
  const [player1Score, setPlayer1Score] = useState('');
  const [player1Strikes, setPlayer1Strikes] = useState(0);
  const [player1Spares, setPlayer1Spares] = useState(0);
  const [player1Opens, setPlayer1Opens] = useState(0);
  const [player2Name, setPlayer2Name] = useState('Patrick');
  const [player2Score, setPlayer2Score] = useState('');
  const [player2Strikes, setPlayer2Strikes] = useState(0);
  const [player2Spares, setPlayer2Spares] = useState(0);
  const [player2Opens, setPlayer2Opens] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState({ text: '', type: '' });

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newMatch = {
      id: Date.now(),
      date: gameDate,
      player1: {
        name: player1Name,
        score: parseInt(player1Score),
        strikes: player1Strikes,
        spares: player1Spares,
        opens: player1Opens
      },
      player2: {
        name: player2Name,
        score: parseInt(player2Score),
        strikes: player2Strikes,
        spares: player2Spares,
        opens: player2Opens
      }
    };
    
    // Submit to Google Sheets
    const submitted = await submitToGoogleSheets(newMatch);
    
    if (submitted) {
      // Update local state
      setMatches([...matches, newMatch]);
      
      // Reset form fields
      setPlayer1Score('');
      setPlayer1Strikes(0);
      setPlayer1Spares(0);
      setPlayer1Opens(0);
      setPlayer2Score('');
      setPlayer2Strikes(0);
      setPlayer2Spares(0);
      setPlayer2Opens(0);
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 text-center">Add New Match</h2>
      
      {/* Submit Message Alert */}
      {submitMessage.text && (
        <div className={`mb-4 p-3 rounded ${submitMessage.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {submitMessage.text}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="gameDate" className="block text-gray-700 font-medium mb-2">
            Date:
          </label>
          <input
            type="date"
            id="gameDate"
            value={gameDate}
            onChange={(e) => setGameDate(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Two column layout for players */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* Player 1 Column */}
          <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
            <h3 className="text-lg font-semibold mb-3 text-indigo-700">Player 1</h3>
            
            <div className="mb-3">
              <label htmlFor="player1Name" className="block text-gray-700 font-medium mb-1">
                Name:
              </label>
              <select
                id="player1Name"
                value={player1Name}
                onChange={(e) => setPlayer1Name(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="Andy">Andy</option>
                <option value="Patrick">Patrick</option>
              </select>
            </div>
            
            <div className="mb-3">
              <label htmlFor="player1Score" className="block text-gray-700 font-medium mb-1">
                Final Score:
              </label>
              <input
                type="number"
                id="player1Score"
                value={player1Score}
                onChange={(e) => setPlayer1Score(e.target.value)}
                min="0"
                max="300"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              {player1Score !== '' && (parseInt(player1Score) < 0 || parseInt(player1Score) > 300) && (
                <p className="text-red-500 text-sm mt-1">Score must be between 0 and 300</p>
              )}
            </div>
            
            <div className="mb-3">
              <label htmlFor="player1Strikes" className="block text-gray-700 font-medium mb-1">
                Strikes: {player1Strikes}
              </label>
              <input
                type="range"
                id="player1Strikes"
                value={player1Strikes}
                onChange={(e) => setPlayer1Strikes(parseInt(e.target.value))}
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
              <label htmlFor="player1Spares" className="block text-gray-700 font-medium mb-1">
                Spares: {player1Spares}
              </label>
              <input
                type="range"
                id="player1Spares"
                value={player1Spares}
                onChange={(e) => setPlayer1Spares(parseInt(e.target.value))}
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
              <label htmlFor="player1Opens" className="block text-gray-700 font-medium mb-1">
                Opens: {player1Opens}
              </label>
              <input
                type="range"
                id="player1Opens"
                value={player1Opens}
                onChange={(e) => setPlayer1Opens(parseInt(e.target.value))}
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

          {/* Player 2 Column */}
          <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
            <h3 className="text-lg font-semibold mb-3 text-indigo-700">Player 2</h3>
            
            <div className="mb-3">
              <label htmlFor="player2Name" className="block text-gray-700 font-medium mb-1">
                Name:
              </label>
              <select
                id="player2Name"
                value={player2Name}
                onChange={(e) => setPlayer2Name(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="Andy">Andy</option>
                <option value="Patrick">Patrick</option>
              </select>
            </div>
            
            <div className="mb-3">
              <label htmlFor="player2Score" className="block text-gray-700 font-medium mb-1">
                Final Score:
              </label>
              <input
                type="number"
                id="player2Score"
                value={player2Score}
                onChange={(e) => setPlayer2Score(e.target.value)}
                min="0"
                max="300"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              {player2Score !== '' && (parseInt(player2Score) < 0 || parseInt(player2Score) > 300) && (
                <p className="text-red-500 text-sm mt-1">Score must be between 0 and 300</p>
              )}
            </div>
            
            <div className="mb-3">
              <label htmlFor="player2Strikes" className="block text-gray-700 font-medium mb-1">
                Strikes: {player2Strikes}
              </label>
              <input
                type="range"
                id="player2Strikes"
                value={player2Strikes}
                onChange={(e) => setPlayer2Strikes(parseInt(e.target.value))}
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
              <label htmlFor="player2Spares" className="block text-gray-700 font-medium mb-1">
                Spares: {player2Spares}
              </label>
              <input
                type="range"
                id="player2Spares"
                value={player2Spares}
                onChange={(e) => setPlayer2Spares(parseInt(e.target.value))}
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
              <label htmlFor="player2Opens" className="block text-gray-700 font-medium mb-1">
                Opens: {player2Opens}
              </label>
              <input
                type="range"
                id="player2Opens"
                value={player2Opens}
                onChange={(e) => setPlayer2Opens(parseInt(e.target.value))}
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
        </div>

        <div className="text-center">
          <button
            type="submit"
            className={`bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : 'Save Match'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddMatchForm;