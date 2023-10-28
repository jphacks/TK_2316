let gifWindow = null;
let isPlaying = false;

document.getElementById('btn').addEventListener('click', () => {
    if (!gifWindow) {
        // ウィンドウが存在しない場合、新しいウィンドウを作成
        gifWindow = window.open('a.gif', 'GifWindow', 'width=300,height=300,top=0,left=0,toolbar=no,menubar=no,location=no');
        isPlaying = true;
    } else {
        // ウィンドウが既に存在する場合、再生を停止してウィンドウを閉じる
        if (isPlaying) {
            // gifを停止する処理を実行（例えば、gifWindow.stop()など）
			gifWindow.stop();
        }
        gifWindow.close();
        gifWindow = null;
        isPlaying = false;
    }
});

document.getElementById('btn_get').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { message: 'getname' }, (content) => {
            if (!content) {
                alert('Cannot Get! Try Reload First!');
                return;
            }
            document.getElementById('title').value = content;
        });
    });
});
