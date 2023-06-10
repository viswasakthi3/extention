chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "fetchNetflixData") {
      // Fetch the Netflix data here
      const netflixData = request.data;
  
      // Send the data to your server
      fetch('https://your-server.com/api/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(netflixData)
      }).then(response => response.json())
        .then(data => console.log(data))
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  });
  