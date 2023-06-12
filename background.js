chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getNetflixData") {
    // Send the data to a server
    fetch('https://your-server.com/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(request.data)
    });
  }
});
