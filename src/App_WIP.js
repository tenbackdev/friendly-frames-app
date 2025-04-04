import React, { useState, useEffect } from 'react';
import './style.css';
import Match from './components/Match';
import PlayerStats from './components/PlayerStats';
import AddMatchForm from './components/AddMatchForm';

const FriendlyFramesApp = () => {
  const [gameDate, setGameDate] = useState(formatDate(new Date()));
  const [matches, setMatches] = useState([]);
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

  // Fetch matches from Google Sheets for a specific date
  const fetchMatchesForDate = async (date) => {
    // This URL should be replaced with your actual Google Apps Script Web App URL for fetching data
    const scriptURL = 'https://script.google.com/macros/s/AKfycbx33lRHuvVino2rO0JwPn2kZyzZTJng2GcO1uf4V8IPPbba-VW9Lsq1b4ih9YvybrY_/exec';
    
    try {
      const response = await fetch(`${scriptURL}?action=getMatchesByDate&date=${date}`, {
        method: 'GET',
        mode: 'cors', // Changed from no-cors to cors for proper data retrieval
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      // Transform fetched data into matches format
      const fetchedMatches = data.matches.map((match, index) => ({
        id: `${date}-${index}`, // Generate unique ID
        date: date,
        player1: {
          name: match.PlayerOneName,
          score: match.PlayerOneScore,
          strikes: match.PlayerOneStrikes,
          spares: match.PlayerOneSpares,
          opens: match.PlayerOneOpens
        },
        player2: {
          name: match.PlayerTwoName,
          score: match.PlayerTwoScore,
          strikes: match.PlayerTwoStrikes,
          spares: match.PlayerTwoSpares,
          opens: match.PlayerTwoOpens
        }
      }));

      setMatches(fetchedMatches);
      return fetchedMatches;
    } catch (error) {
      console.error('Error fetching matches:', error);
      return [];
    }
  };

  // Fetch matches when the component mounts or gameDate changes
  useEffect(() => {
    fetchMatchesForDate(gameDate);
  }, [gameDate]);

  // Rest of the code remains the same as in the previous implementation
  // (existing useEffect for calculating stats, submitToGoogleSheets, etc.)

  // Existing useEffect for calculating statistics
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

      // Existing stats calculation logic
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

      // Existing average calculations
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

  // Existing submitToGoogleSheets function
  const submitToGoogleSheets = async (matchData) => {
    const scriptURL = 'https://script.google.com/macros/s/AKfycbx33lRHuvVino2rO0JwPn2kZyzZTJng2GcO1uf4V8IPPbba-VW9Lsq1b4ih9YvybrY_/exec'; 
    
    try {
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
      
      // After successful submission, fetch updated matches for the current date
      await fetchMatchesForDate(gameDate);
      return true;
    } catch (error) {
      console.error('Error submitting to Google Sheets:', error);
      return false;
    }
  };

  // Render method remains the same
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

      {/* Add a date picker to change the date and fetch matches */}
      <div className="print:hidden" style={{ paddingTop: "100px" }}>
        <div className="mb-4 max-w-4xl mx-auto">
          <label htmlFor="date-picker" className="block text-sm font-medium text-gray-700">
            Select Date
          </label>
          <input 
            type="date" 
            id="date-picker"
            value={gameDate}
            onChange={(e) => setGameDate(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
       </div>
        
        {/* Main Content */}
      <div className="print:hidden" style={{ paddingTop: "100px" }}>        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Add New Match Form Section */}
          <AddMatchForm 
            gameDate={gameDate}
            setGameDate={setGameDate}
            submitToGoogleSheets={submitToGoogleSheets}
            matches={matches}
            setMatches={setMatches}
          />

          {/* Statistics Section */}
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

        {/* Matches Display Section */}
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
            
      <footer className="max-w-4xl mx-auto mt-8 text-center text-gray-500 text-sm">
        <p>Friendly Frames App - {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
};

export default FriendlyFramesApp;