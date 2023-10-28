chrome.runtime.onMessage.addListener(function(message,sender,sendResponse){
    if(message.action == "getData"){
        const result = processData(message.data);
        sendResponse({result: result});
    }
});

function progressData(data){
    return data.toUpperCase();
}