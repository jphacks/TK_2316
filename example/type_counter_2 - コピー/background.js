chrome.action.disable();

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab)=>{
    if(changeInfo.status == "complete"){
        alert("complete");
        if(tab.url.indexOf("yahoo") != 1){
            alert("enable");
            chrome.action.enable(tabId);
        }
        else{
            alert("disable");
            chrome.action.disable(tabId);
        }

    }
});