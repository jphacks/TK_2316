chrome.alarms.onAlarm.addListener((alarm) => {
    chrome.windows.create({
        width: 350,
        height: 250,
        top: 200,
        left: 400,
        type: "popup",
        url: "alert.html"
    });
});
