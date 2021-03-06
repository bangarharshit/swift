chrome.runtime.onInstalled.addListener(function() {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [new chrome.declarativeContent.PageStateMatcher({
                pageUrl: {urlMatches: '(youtube|hotstar|netflix|primevideo|facebook|udemy)\.com'},
                css: ["video"]
            })
            ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });
});