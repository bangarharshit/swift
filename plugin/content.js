Object.defineProperty(HTMLMediaElement.prototype, 'playing', {
    get: function(){
        return !!(this.currentTime > 0 && !this.paused && !this.ended && this.readyState > 2);
    }
});
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.id === "changeSpeed") {
        const speedVal = request.speedVal;
        const url = request.url;
        if (!isNaN(speedVal) && speedVal > 0) {
            if (url.indexOf("facebook") !== -1) {
                const videoElements = document.getElementsByTagName("video");
                for (index in videoElements) {
                    if (videoElements[index].playing) {
                        videoElements[index].playbackRate = speedVal;
                        break
                    }
                } 
            } else {
                document.getElementsByTagName("video")[0].playbackRate = speedVal
            }
        }
    } else if (request.id === "fetchSpeed") {
        const url = request.url;
        if (url.indexOf("facebook") !== -1) {
            const videoElements = document.getElementsByTagName("video");
            for (index in videoElements) {
                if (videoElements[index].playing) {
                    sendResponse({speed: videoElements[index].playbackRate.toString()})
                }
            }
        } else {
            sendResponse({speed: document.getElementsByTagName("video")[0].playbackRate.toString()})
        }
    }
});
