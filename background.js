// This is a simplified version of the background.js file from the Simkl repository.
// It only includes the code necessary to fetch the watch history from Netflix and send it to our server.

var timer = null,
    timerStream = 30 * 60 * 1000, // 30 mins
    lastChecked = moment();

var debug  = false, statusCallback = null,
    storage = storageClass(),
    netflix = netflixApi(statusUpdate, sendMessage);

(function onStart() {
    if (!storage.isInitiated()) { setTimeout(onStart,500); return;}

    timer = setInterval(timerUpdate, timerStream); // 30 mins
})();

function statusUpdate(provider, active) {
    if (netflix === undefined) return;

    let status = 'waiting';

    if (netflix.checking()) status = 'updating';

    if (statusCallback) statusCallback(status,provider);

    if (provider === 'oauth' && active === 'logged') getWatchHistory();
    setIcon();
}

function sendMessage(tabId,message,callback){chrome.tabs.sendMessage(tabId, message, callback);}

function timerUpdate() {
    lastChecked = new Date();
    if (storage.authorized){
        log('do Checking');
        getWatchHistory();
    }
}

function getWatchHistory() {
    if (netflix.enabledExport()) netflix.checkUpdates();
}

chrome.runtime.onMessage.addListener(function (request, sender, response) {
    if (request.type === 'netflix'){
        if (request.action === 'load') {netflix.updateCache();
        response && response({grey: netflix.enabledGrey(), secret: netflix.enabledSecret()});}
        if (request.action === 'recvItems' && storage.authorized && (netflix.enabledRatings() || netflix.enabledGrey())) netflix.fetchItems(request.items,sender.tab);
        if (request.action === 'getRatings' && netflix.enabledRatings()) netflix.getRatings({id: request.items,tab: sender.tab.id});
        if (request.action === 'getRandom')   netflix.getRandom({url: request.items,tab: sender.tab.id});
    }
});
