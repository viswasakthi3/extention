// content.js

// Function to click the "Show More" button
function clickShowMore() {
  const showMoreButton = document.querySelector('button[data-uia=""]');
  if (showMoreButton) {
      showMoreButton.click();
      // Wait for the new items to load before clicking again
      setTimeout(clickShowMore, 2000);
  } else {
      // If there's no "Show More" button, start scraping
      scrapeViewingActivity();
  }
}

// Function to scrape the viewing activity
function scrapeViewingActivity() {
  const viewingActivity = [];
  const titleElements = document.querySelectorAll('.col.title');
  for (const titleElement of titleElements) {
      const title = titleElement.textContent.trim();
      viewingActivity.push(title);
  }
  // Send the viewing activity to the background script
  chrome.runtime.sendMessage({action: "viewingActivity", data: viewingActivity});
}

// Start the process
clickShowMore();
