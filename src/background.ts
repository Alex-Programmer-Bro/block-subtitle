chrome.action.onClicked.addListener(() => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const tab = tabs[0];
    if (tab.id) {
      chrome.tabs.sendMessage(tab.id, {}, () => {});
    }
  });
});
