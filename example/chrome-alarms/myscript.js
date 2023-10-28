const elmSet = document.getElementById("set");
const elmSec = document.getElementById("sec");
const elmClear = document.getElementById("clear");

const alarm_id = "alarm_001";

elmSet.onclick = () =>{
    const sec = elmSec.value;
    console.log("set",sec);
    const dt = new Date();
    dt.setSeconds(dt.getSeconds() + parseInt(sec));
    chrome.alarms.create(alarm_id, {when:dt.getTime()});
};

elmClear.onclick = () =>{
    console.log("clear");
    chrome.alarms.clear(alarm_id);
};