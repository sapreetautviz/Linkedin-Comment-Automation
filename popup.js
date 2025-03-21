document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("toggle");

    chrome.storage.local.get("isRunning", (data) => {
        if (data.isRunning) {
            button.textContent = "Stop";
            button.style.background = "#d9534f";
        } else {
            button.textContent = "Start";
            button.style.background = "#0073b1";
        }
    });

    button.addEventListener("click", () => {
        chrome.storage.local.get("isRunning", (data) => {
            const isRunning = !data.isRunning; // Toggle state
            chrome.storage.local.set({ isRunning });

            if (isRunning) {
                button.textContent = "Stop";
                button.style.background = "#d9534f";

                chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                    let activeTab = tabs[0];

                    if (!activeTab || !activeTab.url.startsWith("https://www.linkedin.com/")) {
                        alert("Open a LinkedIn page to start.");
                        return;
                    }

                    console.log("Starting Auto Commenter...");

                    chrome.scripting.executeScript({
                        target: { tabId: activeTab.id },
                        files: ["content.js"]
                    }).catch((error) => console.error("Script Injection Error:", error));
                });
            } else {
                button.textContent = "Start";
                button.style.background = "#0073b1";
                console.log("Auto Commenter Stopped.");
            }
        });
    });
});
