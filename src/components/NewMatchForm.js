import React from 'react';
import PlayerForm from './PlayerForm';

const NewMatchForm = ({
  gameDate,
  setGameDate,
  player1Name,
  setPlayer1Name,
  player1Score,
  setPlayer1Score,
  player1Strikes,
  setPlayer1Strikes,
  player1Spares,
  setPlayer1Spares,
  player1Opens,
  setPlayer1Opens,
  player2Name,
  setPlayer2Name,
  player2Score,
  setPlayer2Score,
  player2Strikes,
  setPlayer2Strikes,
  player2Spares,
  setPlayer2Spares,
  player2Opens,
  setPlayer2Opens,
  isSubmitting,
  submitMessage,
  handleSubmit
}) => {
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
          <PlayerForm
            playerNumber="1"
            playerName={player1Name}
            setPlayerName={setPlayer1Name}
            playerScore={player1Score}
            setPlayerScore={setPlayer1Score}
            playerStrikes={player1Strikes}
            setPlayerStrikes={setPlayer1Strikes}
            playerSpares={player1Spares}
            setPlayerSpares={setPlayer1Spares}
            playerOpens={player1Opens}
            setPlayerOpens={setPlayer1Opens}
          />
          
          <PlayerForm
            playerNumber="2"
            playerName={player2Name}
            setPlayerName={setPlayer2Name}
            playerScore={player2Score}
            setPlayerScore={setPlayer2Score}
            playerStrikes={player2Strikes}
            setPlayerStrikes={setPlayer2Strikes}
            playerSpares={player2Spares}
            setPlayerSpares={setPlayer2Spares}
            playerOpens={player2Opens}
            setPlayerOpens={setPlayer2Opens}
          />
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

export default NewMatchForm;