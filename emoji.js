fetch("/last-updated.json")
        .then((response) => response.json())
        .then((data) => {
          document.getElementById("lastUpdated").textContent = new Date(
            data.last_updated
          ).toLocaleString("en-US", { timeZone: "America/New_York" });
        });

      // Array of emojis to cycle through
      const emojis = ["&#129421;", "&#128520;", "&#128121;", "&#128126;"]; // add as many emojis as you like
      let currentIndex = 0;

      function switchEmoji() {
        // Get the h2 element
        const emojiElement = document.getElementById("emoji");

        // Update the emoji
        emojiElement.innerHTML = emojis[currentIndex];

        // Move to the next emoji, loop back to the start if necessary
        currentIndex = (currentIndex + 1) % emojis.length;
      }

      // Switch emoji every 1000ms (1 second)
      setInterval(switchEmoji, 1000);

      // Fetch and display the last updated time
      fetch("/last-updated.json")
        .then((response) => response.json())
        .then((data) => {
          document.getElementById("lastUpdated").textContent = new Date(
            data.last_updated
          ).toLocaleString("en-US", { timeZone: "America/New_York" });
        });