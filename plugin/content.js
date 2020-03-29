chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.id === "changeSpeed") {
        const speedVal = request.speedVal;
        if (!isNaN(speedVal) && speedVal > 0) {
            document.getElementsByTagName("video")[0].playbackRate = speedVal
        }
    } else if (request.id === "fetchSpeed") {
        sendResponse({speed: document.getElementsByTagName("video")[0].playbackRate.toString()})
    }
});
