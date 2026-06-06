let scrollCount = 0;
let lastScrollTime = 0;
let trackingActive = false;
let startTime = null;

function detectContentType() {
  const text = `${document.title} ${window.location.href}`.toLowerCase();

  if (
    text.includes("tutorial") ||
    text.includes("lecture") ||
    text.includes("course") ||
    text.includes("learn") ||
    text.includes("coding") ||
    text.includes("programming") ||
    text.includes("javascript") ||
    text.includes("python") ||
    text.includes("java") ||
    text.includes("dsa") ||
    text.includes("data structures") ||
    text.includes("machine learning") ||
    text.includes("study") ||
    text.includes("exam")
  ) {
    return "Education";
  }

  if (
    text.includes("linkedin") ||
    text.includes("career") ||
    text.includes("jobs") ||
    text.includes("internship") ||
    text.includes("resume")
  ) {
    return "Career";
  }

  if (
    text.includes("shorts") ||
    text.includes("music") ||
    text.includes("movie") ||
    text.includes("comedy") ||
    text.includes("song") ||
    text.includes("vlog") ||
    text.includes("gaming")
  ) {
    return "Entertainment";
  }

  return "General Browsing";
}

async function saveData() {
  if (!trackingActive || !startTime) return;

  const minutes = Math.floor((Date.now() - startTime) / 60000);
  const alerts = scrollCount >= 10 ? 1 : 0;

  const wellnessScore = Math.max(
    100 - alerts * 20 - Math.floor(scrollCount / 10),
    0
  );

  const data = {
    site: window.location.hostname,
    title: document.title,
    url: window.location.href,
    contentType: detectContentType(),
    scrollCount,
    screenTime: minutes,
    alerts,
    wellnessScore,
    updatedAt: new Date().toISOString(),
  };

  console.log("Trying to send data:", data);

  try {
    await chrome.storage.local.set({ scrollwiseData: data });

    chrome.runtime.sendMessage(
  {
    action: "SEND_SCROLLWISE_DATA",
    data: data,
  },
  (response) => {
    console.log("Background response:", response);
  }
);
    console.log("Response body:", result);
  } catch (error) {
    console.log("POST failed:", error);
  }
}

chrome.runtime.onMessage.addListener((message) => {
  console.log("MESSAGE RECEIVED:", message);

  if (message.action === "START_TRACKING") {
    trackingActive = true;
    scrollCount = 0;
    lastScrollTime = 0;
    startTime = Date.now();

    alert("ScrollWise tracking started!");
    saveData();
  }
});

window.addEventListener("scroll", () => {
  if (!trackingActive) return;

  const now = Date.now();

  if (now - lastScrollTime < 500) return;

  lastScrollTime = now;
  scrollCount++;

  console.log("SCROLL DETECTED:", scrollCount);

  saveData();

  if (scrollCount === 10) {
    showWarning();
  }
});

function showWarning() {
  if (document.getElementById("scrollwise-warning")) return;

  const warning = document.createElement("div");
  warning.id = "scrollwise-warning";

  warning.innerHTML = `
    <div style="font-size:22px; font-weight:bold; margin-bottom:8px;">
      ⚠️ ScrollWise Alert
    </div>
    <div>
      Continuous scrolling detected.<br/>
      Take a short mindful break.
    </div>
  `;

  warning.style.position = "fixed";
  warning.style.top = "30px";
  warning.style.right = "30px";
  warning.style.zIndex = "999999";
  warning.style.background = "#facc15";
  warning.style.color = "#24345C";
  warning.style.padding = "24px";
  warning.style.borderRadius = "16px";
  warning.style.width = "350px";
  warning.style.fontSize = "18px";
  warning.style.fontWeight = "600";
  warning.style.lineHeight = "1.5";
  warning.style.boxShadow = "0 8px 24px rgba(0,0,0,0.25)";

  document.body.appendChild(warning);

  setTimeout(() => {
    warning.remove();
  }, 6000);
}