document.getElementById('fetchButton').addEventListener('click', function() {
  // Send a message to the background script to start the fetch operation
  chrome.runtime.sendMessage({ action: "fetchNetflixData" });

  // Update the status text
  document.getElementById('status').textContent = 'Fetching Netflix history...';
});
