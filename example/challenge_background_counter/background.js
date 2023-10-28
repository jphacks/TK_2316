let keyPressCount = 0; // キー入力回数を保持する変数
let counter_tag;

chrome.tabs.onActivated.addListener(function (activeInfo) {
    // アクティブなタブが変更されたときの処理
    // ここでキー入力を監視できます
    counter_tag = document.getElementById('counter'); // カウンター要素を取得

    chrome.scripting.executeScript({
        target: { tabId: activeInfo.tabId },
        function: () => {
            // この中でキー入力を取得するJavaScriptコードを記述
            window.addEventListener("keydown", (event) => {
                // キー入力のイベントが発生したときの処理
                keyPressCount++; // キー入力回数を増やす
                alert(counter_tag);
                counter_tag.innerText = "キー入力回数: " + keyPressCount;
                // ここでキー入力回数に対する任意の処理を実行
            });
        },
    });
});
