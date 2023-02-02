// background.js
chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.sendMessage(tab.id, { action: "downloadVideo" });
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action == "downloadVideo") {
    // URL for the video segment
    var url = request.url;
    var filename = "video.ts";
    
    // Download the video segment
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.responseType = "blob";
    xhr.onload = function() {
      var blob = xhr.response;
      var link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = filename;
      link.click();
    };
    xhr.send();
  }
});