document.getElementById("startBtn").addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });

  console.log("Sending to tab:", tab.id);

  chrome.tabs.sendMessage(
    tab.id,
    { action: "START_TRACKING" },
    (response) => {
      console.log("Response:", response);

      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
      }
    }
  );
});