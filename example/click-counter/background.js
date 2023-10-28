let count = 0;
let counting = false;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === "toggle") {
    counting = !counting;
    let iconPath = counting ? 'active_icon_16.png' : 'icon_16.png';
    chrome.action.setIcon({path: iconPath}, () => {
      let error = chrome.runtime.lastError;
      if (error) {
        console.log(error);
      }
    });

    // counting が true の場合、viewer.html を表示
    if (counting) {
      chrome.windows.create({
        url: 'viewer.html',
        type: 'popup',
        width: 300,
        height: 300
      }, (window) => {
        viewerWindow = window;
      });
    } else {
      // counting が false の場合、viewerWindow が存在すれば閉じる
      if (viewerWindow) {
        chrome.windows.remove(viewerWindow.id);
        viewerWindow = null;
      }
    }
    sendResponse({counting: counting, count: count});
  } else if (request.message === "getCount") {
    sendResponse({counting: counting, count: count});
  }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (counting && changeInfo.status === "complete") {
    count++;
  }
});

chrome.tabs.onActivated.addListener(activeInfo => {
  if (counting) {
    count++;
  }
});
