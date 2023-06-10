function fetchNetflixData() {
    var watched = Array.from(document.querySelectorAll(".retableRow")).map(function(row) {
        var date = row.querySelector(".date").textContent;
        var text = row.querySelector(".title").textContent;
        text = text.replace(": Part ", " - Part ");

        var [show, season, title] = text.split(/: Season |: Series |: Collection |: "/);
        var isShow = !title ? false : true;
        title = isShow ? title.replace(/^(.*)\"$/, "$1") : row.querySelector(".title").textContent;
        season = parseInt(season);

        show = show.replace(" (U.S.)", "");
        date = new Date(date);

        return {
            date: date,
            isShow: isShow,
            show: show,
            season: season,
            title: title
        };
    });

    // Send the data to the background script
    chrome.runtime.sendMessage({action: "fetchNetflixData", data: watched});
}
