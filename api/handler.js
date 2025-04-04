export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }
    try {
      // Get the form data from the request
      const formData = req.body;
      
      // Format the data properly for the Apps Script
      const payload = {
        date: formData.date,
        playerOne: {
          name: formData.player1 && formData.player1.name ? formData.player1.name : "Player 1",
          score: parseInt(formData.player1.score),
          strikes: parseInt(formData.player1.strikes),
          spares: parseInt(formData.player1.spares),
          opens: parseInt(formData.player1.opens)
        },
        playerTwo: {
          name: formData.player2 && formData.player2.name ? formData.player2.name : "Player 2",
          score: parseInt(formData.player2.score),
          strikes: parseInt(formData.player2.strikes),
          spares: parseInt(formData.player2.spares),
          opens: parseInt(formData.player2.opens)
        }
      };
      
      // Set up the request to the Google Apps Script
      const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwFRzRonS-suiL1uk1eA1FAYaFpGlVqgecbSASrLPfY9QpgrSfR6lCbJUqx5G0weqso/exec';
      
      // Send the request as JSON, which is what the Apps Script expects
      const scriptResponse = await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload) // Send the payload directly as JSON
      });
      
      console.log(JSON.stringify(payload));

      // Handle the response
      const contentType = scriptResponse.headers.get('content-type');
      let responseData;
      
      if (contentType && contentType.includes('application/json')) {
        responseData = await scriptResponse.json();
      } else {
        const text = await scriptResponse.text();
        try {
          responseData = JSON.parse(text);
        } catch (e) {
          responseData = { 
            status: scriptResponse.ok ? 'success' : 'error',
            message: text
          };
        }
      }
      
      // Return the response to the client
      let status = 'success';
      if (responseData && responseData.status) {
        status = responseData.status;
      }
      
      let message = 'Data submitted successfully';
      if (responseData && responseData.message) {
        message = responseData.message;
      }
      
      return res.status(200).json({
        status: status,
        message: message,
        data: responseData
      });
      
    } catch (error) {
      console.error('Error in Vercel API:', error);
      let errorMessage = 'An unknown error occurred';
      if (error && error.message) {
        errorMessage = error.message;
      }
      
      return res.status(500).json({
        status: 'error',
        message: errorMessage,
      });
    }
  }