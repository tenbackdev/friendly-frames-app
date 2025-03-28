function doGet(e) {
    try {
      // Open the spreadsheet
      const ss = SpreadsheetApp.openById('1msZYsssQtqkzO5zHuKeKf7iCD5z5-h-gu4PT1p-Ogd4');
      const sheet = ss.getActiveSheet();
      
      // Get all data
      const data = sheet.getDataRange().getValues();
      
      // Filter matches by date if provided
      let filteredMatches = [];
      if (e.parameter.action === 'getMatchesByDate' && e.parameter.date) {
        filteredMatches = data.slice(1).filter(row => {
          // Convert both to date strings in YYYY-MM-DD format
          const rowDateString = Utilities.formatDate(row[0], Session.getScriptTimeZone(), "yyyy-MM-dd");
          const requestDateString = e.parameter.date;
          
          return rowDateString === requestDateString;
        });
      }
      
      // Prepare matches in the format expected by the frontend
      const matches = filteredMatches.map(row => ({
        Date: Utilities.formatDate(row[0], Session.getScriptTimeZone(), "yyyy-MM-dd"),
        PlayerOneName: row[1],
        PlayerOneScore: row[2],
        PlayerOneStrikes: row[3],
        PlayerOneSpares: row[4],
        PlayerOneOpens: row[5],
        PlayerTwoName: row[6],
        PlayerTwoScore: row[7],
        PlayerTwoStrikes: row[8],
        PlayerTwoSpares: row[9],
        PlayerTwoOpens: row[10]
      }));
      
      // Check if this is a JSONP request
      const callback = e.parameter.callback;
      if (callback) {
        // Wrap the response in the callback function
        return ContentService
          .createTextOutput(`${callback}(${JSON.stringify({matches: matches})})`)
          .setMimeType(ContentService.MimeType.JAVASCRIPT);
      }
      
      // Fallback to regular JSON response
      return ContentService
        .createTextOutput(JSON.stringify({matches: matches}))
        .setMimeType(ContentService.MimeType.JSON);
    } catch (error) {
      return ContentService
        .createTextOutput(JSON.stringify({status: "error", message: error.toString()}))
        .setMimeType(ContentService.MimeType.JSON);
    }
  }
  
  function doOptions() {
    return HtmlService.createHtmlOutput()
      .setTitle("CORS Preflight")
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
      .setSandboxMode(HtmlService.SandboxMode.IFRAME);
  }
  
  function buildCorsResponse(data) {
    const output = ContentService.createTextOutput(JSON.stringify(data))
      .setMimeType(ContentService.MimeType.JSON);
    
    const response = HtmlService.createHtmlOutput(output.getContent());
    response.setTitle("CORS Response");
    response.setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
    response.setSandboxMode(HtmlService.SandboxMode.IFRAME);
    return response;
  }
  
  /*
  myE = {
    parameter: {
      // Query parameters from the URL
      // For example, if URL is ?action=getMatchesByDate&date=2024-03-26
      action: "getMatchesByDate",
      date: "2024-03-23"
    },
    contextPath: "", // Path context
    parameters: {
      // Similar to parameter, but values are arrays
      action: ["getMatchesByDate"],
      date: ["2024-03-23"]
    },
    queryString: "action=getMatchesByDate&date=2024-03-23"
  }
  
  doGet(myE)
  */