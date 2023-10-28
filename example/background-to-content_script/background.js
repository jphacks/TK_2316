//content_script.jsから値を受け取る
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    //受け取った値にテキストを追加する。
    responseMessage = message.text + "：backgroundで受け取ったよ："
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        //content_script.jsに値を返す
        chrome.tabs.sendMessage(tabs[0].id, {message: responseMessage});
    });
});