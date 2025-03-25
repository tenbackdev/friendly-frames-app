import React from 'react';

const Match = ({ match }) => {
  return (
    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 shadow-sm">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-gray-500 font-medium">{match.date}</span>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {/* Player 1 Column */}
        <div className="text-center">
          <h3 className="text-lg font-semibold text-indigo-700">{match.player1.name}</h3>
          <div className="text-gray-600">
            <p>Score: <span className="font-bold">{match.player1.score}</span></p>
            <div className="flex justify-center space-x-3 mt-1">
              <span>🎳 Strikes: {match.player1.strikes}</span>
              <span>✨ Spares: {match.player1.spares}</span>
              <span>❌ Opens: {match.player1.opens}</span>
            </div>
          </div>
        </div>
        
        {/* Player 2 Column */}
        <div className="text-center">
          <h3 className="text-lg font-semibold text-green-700">{match.player2.name}</h3>
          <div className="text-gray-600">
            <p>Score: <span className="font-bold">{match.player2.score}</span></p>
            <div className="flex justify-center space-x-3 mt-1">
              <span>🎳 Strikes: {match.player2.strikes}</span>
              <span>✨ Spares: {match.player2.spares}</span>
              <span>❌ Opens: {match.player2.opens}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Match;