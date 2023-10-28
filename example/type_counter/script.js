// カウンター変数を初期化
let counter = 0;

console.log("start!");

// キーが押された瞬間（keydown）の処理
document.addEventListener("keydown", function(event) {
    console.log("check type key");
    // イベントオブジェクトから押されたキーの情報を取得
    let key = event.key;
    let type_count = document.getElementById('type_count');
    let type_key = document.getElementById('type_key');
    // カウンターを1増加
    counter++;
    
    //IDがtargetの要素のテキストを更新
    type_count.innerText = "文字数:" + counter;
    type_key.innerText = "入力キー:" + key;

    //alert(counter);

});
