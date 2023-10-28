let counter = 0;

chrome.action.onClicked.addListener((tab) => {
    const popup = chrome.extension.getViews({ type: 'popup' })[0]; // Get the popup window

    document.addEventListener("keydown", function(event) {
        // イベントオブジェクトから押されたキーの情報を取得
        let key = event.key;
        let typeCount = popup.document.getElementById('type_count');
        let typeKey = popup.document.getElementById('type_key');
        
        // カウンターを1増加
        counter++;
        
        // ポップアップのHTML内の要素を更新
        typeCount.innerText = "文字数:" + counter;
        typeKey.innerText = "入力キー:" + key;
    });
});