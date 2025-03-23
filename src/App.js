import React, { useState, useEffect } from 'react';
import './style.css';
import Match from './Match';
import PlayerStats from './PlayerStats';

const FriendlyFramesApp = () => {
  const [gameDate, setGameDate] = useState(formatDate(new Date()));
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
  const [matches, setMatches] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState({ text: '', type: '' });
  const [stats, setStats] = useState({
    andy: {
      totalPins: 0,
      totalGames: 0,
      avgScore: 0,
      totalStrikes: 0,
      avgStrikes: 0,
      totalSpares: 0,
      avgSpares: 0,
      totalOpens: 0,
      avgOpens: 0
    },
    patrick: {
      totalPins: 0,
      totalGames: 0,
      avgScore: 0,
      totalStrikes: 0,
      avgStrikes: 0,
      totalSpares: 0,
      avgSpares: 0,
      totalOpens: 0,
      avgOpens: 0
    }
  });

  // Google Sheet ID
  const SHEET_ID = '1msZYsssQtqkzO5zHuKeKf7iCD5z5-h-gu4PT1p-Ogd4';
  
  // Format date to YYYY-MM-DD
  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // Calculate statistics whenever matches change
  useEffect(() => {
    if (matches.length > 0) {
      const newStats = {
        andy: {
          totalPins: 0,
          totalGames: 0,
          avgScore: 0,
          totalStrikes: 0,
          avgStrikes: 0,
          totalSpares: 0,
          avgSpares: 0,
          totalOpens: 0,
          avgOpens: 0
        },
        patrick: {
          totalPins: 0,
          totalGames: 0,
          avgScore: 0,
          totalStrikes: 0,
          avgStrikes: 0,
          totalSpares: 0,
          avgSpares: 0,
          totalOpens: 0,
          avgOpens: 0
        }
      };

      matches.forEach(match => {
        // Player 1 stats
        if (match.player1.name.toLowerCase() === 'andy') {
          newStats.andy.totalPins += match.player1.score;
          newStats.andy.totalGames += 1;
          newStats.andy.totalStrikes += match.player1.strikes;
          newStats.andy.totalSpares += match.player1.spares;
          newStats.andy.totalOpens += match.player1.opens;
        } else if (match.player1.name.toLowerCase() === 'patrick') {
          newStats.patrick.totalPins += match.player1.score;
          newStats.patrick.totalGames += 1;
          newStats.patrick.totalStrikes += match.player1.strikes;
          newStats.patrick.totalSpares += match.player1.spares;
          newStats.patrick.totalOpens += match.player1.opens;
        }

        // Player 2 stats
        if (match.player2.name.toLowerCase() === 'andy') {
          newStats.andy.totalPins += match.player2.score;
          newStats.andy.totalGames += 1;
          newStats.andy.totalStrikes += match.player2.strikes;
          newStats.andy.totalSpares += match.player2.spares;
          newStats.andy.totalOpens += match.player2.opens;
        } else if (match.player2.name.toLowerCase() === 'patrick') {
          newStats.patrick.totalPins += match.player2.score;
          newStats.patrick.totalGames += 1;
          newStats.patrick.totalStrikes += match.player2.strikes;
          newStats.patrick.totalSpares += match.player2.spares;
          newStats.patrick.totalOpens += match.player2.opens;
        }
      });

      // Calculate averages
      if (newStats.andy.totalGames > 0) {
        newStats.andy.avgScore = (newStats.andy.totalPins / newStats.andy.totalGames).toFixed(1);
        newStats.andy.avgStrikes = (newStats.andy.totalStrikes / newStats.andy.totalGames).toFixed(1);
        newStats.andy.avgSpares = (newStats.andy.totalSpares / newStats.andy.totalGames).toFixed(1);
        newStats.andy.avgOpens = (newStats.andy.totalOpens / newStats.andy.totalGames).toFixed(1);
      }

      if (newStats.patrick.totalGames > 0) {
        newStats.patrick.avgScore = (newStats.patrick.totalPins / newStats.patrick.totalGames).toFixed(1);
        newStats.patrick.avgStrikes = (newStats.patrick.totalStrikes / newStats.patrick.totalGames).toFixed(1);
        newStats.patrick.avgSpares = (newStats.patrick.totalSpares / newStats.patrick.totalGames).toFixed(1);
        newStats.patrick.avgOpens = (newStats.patrick.totalOpens / newStats.patrick.totalGames).toFixed(1);
      }

      setStats(newStats);
    }
  }, [matches]);

  // Submit data to Google Sheets using Google Apps Script Web App
  const submitToGoogleSheets = async (matchData) => {
    // This URL should be replaced with your actual Google Apps Script Web App URL after deployment
    const scriptURL = 'https://script.google.com/macros/s/AKfycbx33lRHuvVino2rO0JwPn2kZyzZTJng2GcO1uf4V8IPPbba-VW9Lsq1b4ih9YvybrY_/exec'; 
    
    try {
      setIsSubmitting(true);
      
      const response = await fetch(scriptURL, {
        method: 'POST',
        mode: 'no-cors', // Important for cross-origin requests
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date: matchData.date,
          PlayerOneName: matchData.player1.name,
          PlayerOneScore: matchData.player1.score,
          PlayerOneStrikes: matchData.player1.strikes,
          PlayerOneSpares: matchData.player1.spares,
          PlayerOneOpens: matchData.player1.opens,
          PlayerTwoName: matchData.player2.name,
          PlayerTwoScore: matchData.player2.score,
          PlayerTwoStrikes: matchData.player2.strikes,
          PlayerTwoSpares: matchData.player2.spares,
          PlayerTwoOpens: matchData.player2.opens
        }),
      });
      
      setSubmitMessage({ 
        text: 'Match saved successfully to Google Sheets!', 
        type: 'success' 
      });
      
      // Clear message after 5 seconds
      setTimeout(() => {
        setSubmitMessage({ text: '', type: '' });
      }, 5000);
      
      return true;
    } catch (error) {
      console.error('Error submitting to Google Sheets:', error);
      setSubmitMessage({ 
        text: 'Error saving match. Please try again.', 
        type: 'error' 
      });
      
      // Clear message after 5 seconds
      setTimeout(() => {
        setSubmitMessage({ text: '', type: '' });
      }, 5000);
      
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

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
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Fixed position header container */}
      <div className="fixed top-0 left-0 right-0 z-10 bg-gray-100 p-4 print:hidden">
        <header className="max-w-4xl mx-auto bg-indigo-600 rounded-lg shadow">
          <div className="p-6 text-center">
            <h2 className="text-2xl font-bold text-white">Friendly Frames</h2>
          </div>
        </header>
      </div>
            
      {/* Main Content */}
      <div className="print:hidden" style={{ paddingTop: "100px" }}>        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Game Form Section */}
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

          {/* Matches Display Section - Now using Match component */}
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 text-center">Match History</h2>
            
            {matches.length === 0 ? (
              <p className="text-center text-gray-500 my-8">No matches recorded yet.</p>
            ) : (
              <div className="space-y-4">
                {matches.map((match) => (
                  <Match key={match.id} match={match} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Statistics Section - Now using PlayerStats component */}
        {matches.length > 0 && (
          <div className="bg-white rounded-lg p-6 shadow-md mb-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 text-center">Player Statistics</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Andy Stats */}
              <PlayerStats 
                player="Andy" 
                stats={stats.andy} 
                colorScheme="indigo" 
              />
              
              {/* Patrick Stats */}
              <PlayerStats 
                player="Patrick" 
                stats={stats.patrick} 
                colorScheme="green" 
              />
            </div>
          </div>
        )}
      </div>
            
      <footer className="max-w-4xl mx-auto mt-8 text-center text-gray-500 text-sm">
        <p>Friendly Frames App - {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
};

export default FriendlyFramesApp;