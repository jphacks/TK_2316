// ポップアップページのクリック回数を更新
chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  chrome.scripting.executeScript({
    target: { tabId: tabs[0].id },
    function: function () {
      // クリック回数をトラッキングする変数
      let clickCount = 0;

      // クリックイベントリスナーを追加
      document.addEventListener('click', function () {
        clickCount++;
        // クリック回数をバックグラウンドスクリプトに送信
        chrome.runtime.sendMessage({ clickCount });
      });
    },
  });
});

// メッセージを受信してクリック回数を更新
chrome.runtime.onMessage.addListener(function (message) {
  document.getElementById('clickCount').textContent = message.clickCount;
});
