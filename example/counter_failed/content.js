// コンテンツスクリプトでのクリック回数トラッキングのコード
let clickCount = 0;

document.addEventListener('click', function () {
  clickCount++;
  // クリック回数をバックグラウンドスクリプトに送信
  chrome.runtime.sendMessage({ clickCount });
});
