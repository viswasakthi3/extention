// This script will be injected into the Netflix viewing activity page.
// It can read the DOM of the page to fetch the watch history.

function decode_date(date) {
    // Function to convert Netflix date format to a JavaScript Date object.
    // Netflix dates are in the format 'Month DD, YYYY'
    const [month, day, year] = date.split(' ');
    return new Date(`${month} ${day.replace(',', '')}, ${year}`);
  }
  
  // Load the list of watched shows from Netflix.
  var watched = Array.from(document.querySelectorAll(".retableRow")).map(function(row) {
    var date = row.querySelector(".date").textContent;
    var text = row.querySelector(".title").textContent;
    text = text.replace(": Part ", " - Part ");
    if(text.indexOf("Mystery Science Theater 3000: The Return: Season ") !== -1)
      text = text.replace(": The Return: Season ", ": Season 1");
  
    var [show, season, title] = text.split(/: Season |: Series |: Collection |: "/);
    var isShow = !title ? false : true;
    title = isShow ? title.replace(/^(.*)\"$/, "$1") : row.querySelector(".title").textContent;
    season = parseInt(season);
  
    show = show.replace(" (U.S.)", "");
    date = decode_date(date);
  
    return {
      date: date,
      isShow: isShow,
      show: show,
      season: season,
      title: title
    };
  });
  
  // Send the watched data to the background script
  chrome.runtime.sendMessage({watched: watched});
  