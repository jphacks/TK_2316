window.onload = function() {
  let statusDiv = document.getElementById('status');
  let countDiv = document.getElementById('count');
  let toggleBtn = document.getElementById('toggle');

  chrome.runtime.sendMessage({message: 'getCount'}, response => {
    countDiv.textContent = response.count;
    if (response.counting) {
      statusDiv.textContent = 'Counting...';
      toggleBtn.textContent = 'Stop';
    } else {
      statusDiv.textContent = 'Stopped';
      toggleBtn.textContent = 'Start';
    }
  });

  toggleBtn.onclick = function() {
    chrome.runtime.sendMessage({message: 'toggle'}, response => {
      countDiv.textContent = response.count;
      if (response.counting) {
        statusDiv.textContent = 'Counting...';
        toggleBtn.textContent = 'Stop';
      } else {
        statusDiv.textContent = 'Stopped';
        toggleBtn.textContent = 'Start';
      }
    });
  };
};