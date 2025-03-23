import React from 'react';

const MatchItem = ({ match }) => {
  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
      <div className="text-sm text-gray-500 mb-2">{match.date}</div>
      <div className="grid grid-cols-3 gap-2">
        <div>
          <div className="font-semibold">{match.player1.name}</div>
          <div className="text-lg">{match.player1.score}</div>
          <div className="text-sm text-gray-600">
            <div>{match.player1.strikes} strikes</div>
            <div>{match.player1.spares} spares</div>
            <div>{match.player1.opens} opens</div>
          </div>
        </div>
        <div className="text-center my-auto">
          <div className="text-xl font-bold">vs</div>
        </div>
        <div className="text-right">
          <div className="font-semibold">{match.player2.name}</div>
          <div className="text-lg">{match.player2.score}</div>
          <div className="text-sm text-gray-600">
            <div>{match.player2.strikes} strikes</div>
            <div>{match.player2.spares} spares</div>
            <div>{match.player2.opens} opens</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchItem;