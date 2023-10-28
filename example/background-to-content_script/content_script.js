//①クリックでbackground.jsに値を渡す。
$(document).click(function () {
    chrome.runtime.sendMessage({text: "フロントがクリックされたよ"});
  });
   
  //②background.jsからのresponseを受け取って、ログ出力。
  chrome.runtime.onMessage.addListener(function(response, sender, sendResponse) {
      console.log(response.message);
  });