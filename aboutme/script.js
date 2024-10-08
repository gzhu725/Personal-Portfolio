const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get the reCAPTCHA response
  const captchaResponse = grecaptcha.getResponse();

  if (!captchaResponse) {
    alert("Error! Fill out the Captcha!");
    return;
  }

  const fd = new FormData(e.target);
  const params = new URLSearchParams(fd);

  // Update the URL to point to the Netlify function
  fetch("/.netlify/functions/upload", {
    // Use relative path to the Netlify function
    method: "POST",
    body: params,
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.captchaSuccess) {
        alert("Thanks for the question! :)");
        document.getElementById("name").value = "";
        document.getElementById("question").value = "";

        if (grecaptcha) {
          grecaptcha.reset();
        }
      } else {
        alert("Uh oh! Something went wrong with CAPTCHA!");
      }
    })
    .catch((err) => console.error("Error:", err));
});
