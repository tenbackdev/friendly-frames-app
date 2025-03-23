import React from 'react';
import MatchItem from './MatchItem';

const MatchHistory = ({ matches }) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 text-center">Match History</h2>
      
      {matches.length === 0 ? (
        <p className="text-center text-gray-500 my-8">No matches recorded yet.</p>
      ) : (
        <div className="space-y-4">
          {matches.map((match) => (
            <MatchItem key={match.id} match={match} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MatchHistory;