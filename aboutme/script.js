// recaptcha handle
const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get the reCAPTCHA response
  const captchaResponse = grecaptcha.getResponse();

  if (!captchaResponse.length > 0) {
    alert("Captcha empty!");
    return;
  }

  const fd = new FormData(e.target);
  fd.append("g-recaptcha-response", captchaResponse); // Include the captcha response

  // Convert FormData to URLSearchParams
  const params = new URLSearchParams(fd);
  console.log(params)

  // Update the URL to point to the Netlify function
  // fetch("/.netlify/functions/upload", {
  //   // Use relative path to the Netlify function
  //   method: "POST",
  //   body: params,
  // })
  //   .then((res) => res.json())
  //   .then((data) => {
  //     if (data.captchaSuccess) {
  //       alert("Thanks for the question! :)");
  //       document.getElementById("name").value = "";
  //       document.getElementById("question").value = "";

  //       if (grecaptcha) {
  //         grecaptcha.reset();
  //       }
  //     } else {
  //       alert("Uh oh! Something went wrong with CAPTCHA!");
  //     }
  //   })
  //   .catch((err) => console.error("Error:", err));
});
