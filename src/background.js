chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.url) {
      console.log('Tab URL changed to: ' + changeInfo.url);
  }
});
