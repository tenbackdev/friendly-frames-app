// pages/api/getMatches.js
import fetch from 'node-fetch';

export default async function handler(req, res) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    // Get date parameter from request
    const { date } = req.query;
    
    if (!date) {
      return res.status(400).json({ error: 'Date parameter is required' });
    }
    
    // URL to your Google Apps Script Web App
    const appsScriptUrl = 'https://script.google.com/macros/s/AKfycbzRZk3KPixkxhzD-4syIphO3rnoXGLnL2FY5jrKsTWAjGPwFzyZDLG-bvTz1K1QzbSk/exec';
    
    if (!appsScriptUrl) {
      return res.status(500).json({ error: 'Apps Script URL not configured' });
    }
    
    // Make request to Google Apps Script
    const response = await fetch(`${appsScriptUrl}?action=getMatchesByDate&date=${date}`);
    
    console.log(response)

    if (!response.ok) {
      throw new Error(`Apps Script responded with status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Return data to client
    return res.status(200).json(data);
  } catch (error) {
    console.error('API handler error:', error);
    return res.status(500).json({ error: 'Failed to fetch matches', message: error.message });
  }
}