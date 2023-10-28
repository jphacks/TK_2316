// バックグラウンドスクリプトでのクリック回数管理
let totalClickCount = 0;

// メッセージを受信してクリック回数を累積
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  totalClickCount += message.clickCount;
});

// ポップアップページにクリック回数を送信
chrome.runtime.onConnect.addListener(function (port) {
  if (port.name === 'popup') {
    port.onMessage.addListener(function () {
      port.postMessage({ clickCount: totalClickCount });
    });
  }
});
