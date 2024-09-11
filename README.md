# Personal-Portfolio

This is my new website, which you can view [here!](https://gloriazhu.net/).

# Frontend

The frontend was made with HTML, CSS, and Javascript.

# Backend

The backend originally used Express.js to test functionality on a local host. However, after deploying the website to Netlify, I decided to make my backend upload function serverless by using Netlify serverless functions. The backend handles both writing to a Firebase database after a user submits a question, as well as handles Google Recaptcha, to make sure that nobody is able to send fake/spam messages to my database. Secrets are handled within the `.env `file.

# Current Bugs
1. Timestamp on mobile does not work
2. Not the best mobile compatibility.

# Upcoming Features
1. Light mode
2. Blog section
