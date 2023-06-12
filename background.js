// background.js

// Listen for messages from the content script
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "viewingActivity") {
      // The viewing activity data is in request.data
      // You can send it to your server here
      console.log(request.data);
  }
});
