chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "SEND_SCROLLWISE_DATA") {
    fetch("http://localhost:3000/api/extension-data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message.data),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log("Background POST success:", result);
        sendResponse({ success: true, result });
      })
      .catch((error) => {
        console.error("Background POST failed:", error);
        sendResponse({ success: false, error: error.message });
      });

    return true;
  }
});