// captcha handle

const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const captchaResponse = grecaptcha.getResponse();

  if (!captchaResponse.length > 0) {
    throw new Error("Captcha empty!");
  }

  const fd = new FormData(e.target);
  const params = new URLSearchParams(fd);

  fetch("http://localhost:3000/upload", {
    method: "POST",
    body: params,
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.captchaSuccess) {
        alert("thanks for the question :)")
        document.getElementById("name").value = "";
        document.getElementById("question").value = "";
        if (grecaptcha) {
          grecaptcha.reset();
        }
      }
    })
    .catch((err) => console.error(err));
});
