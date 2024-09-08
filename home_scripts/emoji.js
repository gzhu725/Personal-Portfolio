// Fetch and display the last updated time
fetch("/home_scripts/last-updated.json")
  .then((response) => response.json())
  .then((data) => {
    document.getElementById("lastUpdated").textContent = new Date(
      data.last_updated
    ).toLocaleString("en-US", { timeZone: "America/New_York" });
  })
  .catch((err) => console.error("Error fetching last-updated.json:", err));

// Array of emojis to cycle through
const emojis = ["&#129421;", "&#128520;", "&#128121;", "&#128126;"];
let currentIndex = 0;

function switchEmoji() {
  const emojiElement = document.getElementById("emoji");

  emojiElement.innerHTML = emojis[currentIndex];

  currentIndex = (currentIndex + 1) % emojis.length;
}

setInterval(switchEmoji, 1000);
