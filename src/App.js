import React, { useState, useEffect } from 'react';
import './style.css';
import Match from './components/Match';
import PlayerStats from './components/PlayerStats';
import AddMatchForm from './components/AddMatchForm';

const scriptURL = 'https://script.google.com/macros/s/AKfycbzfKDyCXsrpeZuqEwslJmL--bCHNtHtC4eUR_jaRVBKlahWfnG2dNF0zEi7W2GvwNAp/exec';
const scriptURLSubmit = 'https://script.google.com/macros/s/AKfycbweU28wjVvsdFSzfSyYO60ZAEaT_tcLTZkO_n-JrXYMffvwVlpV9PsYgZlwWeGyA_aU/exec'

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
// Add this function to your FriendlyFramesApp component
const fetchMatchesForDate = async (date) => {
  try {
    const apiUrl = `/api/getMatches?date=${date}&timestamp=${new Date().getTime()}`
    console.log(apiUrl);
    // Call your Vercel API endpoint
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!data.matches || data.matches.length === 0) {
      console.warn('No matches found for the selected date');
      setMatches([]);
      return;
    }
    
    // Transform fetched data into the format your app expects
    const fetchedMatches = data.matches.map((match, index) => ({
      id: `${date}-${index}`, 
      date: match.Date,
      player1: {
        name: match.PlayerOneName,
        score: parseInt(match.PlayerOneScore),
        strikes: parseInt(match.PlayerOneStrikes),
        spares: parseInt(match.PlayerOneSpares),
        opens: parseInt(match.PlayerOneOpens)
      },
      player2: {
        name: match.PlayerTwoName,
        score: parseInt(match.PlayerTwoScore),
        strikes: parseInt(match.PlayerTwoStrikes),
        spares: parseInt(match.PlayerTwoSpares),
        opens: parseInt(match.PlayerTwoOpens)
      }
    }));
    
    setMatches(fetchedMatches);
  } catch (error) {
    console.error('Error fetching matches:', error);
    // Add user-friendly error handling
    alert('Failed to fetch matches. Please try again.');
  }
};
  

// Update submitToGoogleSheets method
const submitToGoogleSheets = async (formData) => {
  try {
    console.log("Submitting data:", formData);
    
    // Make sure all numeric values are parsed as integers
    const processedData = {
      date: formData.date,
      player1: {
        name: formData.player1.name,
        score: parseInt(formData.player1.score),
        strikes: parseInt(formData.player1.strikes),
        spares: parseInt(formData.player1.spares),
        opens: parseInt(formData.player1.opens)
      },
      player2: {
        name: formData.player2.name,
        score: parseInt(formData.player2.score),
        strikes: parseInt(formData.player2.strikes),
        spares: parseInt(formData.player2.spares),
        opens: parseInt(formData.player2.opens)
      }
    };
    
    console.log("Processed data:", JSON.stringify(processedData));

    const response = await fetch('/api/handler', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(processedData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("API Error Response:", errorText);
      try {
        const errorData = JSON.parse(errorText);
        throw new Error(`Error: ${errorData.message || response.statusText}`);
      } catch (e) {
        throw new Error(`Error: ${response.statusText} - ${errorText}`);
      }
    }

    const result = await response.json();
    console.log("Success:", result);
    
    // Refresh the matches after submission
    fetchMatchesForDate(gameDate);
    
    return result;
  } catch (error) {
    console.error("Error submitting to Google Sheets:", error);
    alert("Error submitting data: " + error.message);
    throw error;
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

  const urlTesting = `${scriptURL}?action=getMatchesByDate&date=${gameDate}`
  console.log(urlTesting)


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