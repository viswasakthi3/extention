// This function scrapes the Netflix viewing history from the webpage
function scrapeNetflixData() {
    // Your scraping code goes here
    // This is just a placeholder
    const netflixData = {
      history: [
        // Example data
        { title: 'Example Show', season: 1, episode: 1, date: '2023-06-09' },
        { title: 'Example Show', season: 1, episode: 2, date: '2023-06-10' }
      ]
    };
  
    return netflixData;
  }
  
  // This function sends the scraped data to the background script
  function sendNetflixData() {
    const netflixData = scrapeNetflixData();
    chrome.runtime.sendMessage({ action: "fetchNetflixData", data: netflixData });
  }
  
  // Call the function when the content script is loaded
  sendNetflixData();
  