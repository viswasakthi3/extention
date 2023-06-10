// Get the Netflix viewing activity
function getNetflixViewingActivity() {
    // Go to the Netflix viewing activity page
    window.location.href = 'https://www.netflix.com/viewingactivity';
  
    // Wait for the viewing activity to load
    setTimeout(function() {
      // Get the viewing activity rows
      var viewingActivityRows = document.getElementsByClassName('retableRow');
  
      // Initialize an array to store the viewing activity
      var viewingActivity = [];
  
      // Loop through each viewing activity row
      for (var i = 0; i < viewingActivityRows.length; i++) {
        // Get the viewing activity row
        var viewingActivityRow = viewingActivityRows[i];
  
        // Get the title of the viewing activity
        var title = viewingActivityRow.getElementsByClassName('title')[0].innerText;
  
        // Get the date of the viewing activity
        var date = viewingActivityRow.getElementsByClassName('date')[0].innerText;
  
        // Add the viewing activity to the array
        viewingActivity.push({
          title: title,
          date: date
        });
      }
  
      // Return the viewing activity
      return viewingActivity;
    }, 5000);
  }
  