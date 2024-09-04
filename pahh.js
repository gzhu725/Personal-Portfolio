import express from "express";
import cors from "cors";
import fetch from "node-fetch"; // You need to install this package
import { initializeApp } from "firebase/app"; // Firebase SDK for Node.js
import { getDatabase, ref, push, set } from "firebase/database";

// Initialize Express and Middleware
const app = express();
const port = 3000;

app.use(cors());
app.use(express.urlencoded({ extended: false }));

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyDKQ4HTfXx5MMskbQPJ4f-I2S6Rf6FpWUk",
  authDomain: "personal-website-d1944.firebaseapp.com",
  projectId: "personal-website-d1944",
  storageBucket: "personal-website-d1944.appspot.com",
  messagingSenderId: "1033337069522",
  appId: "1:1033337069522:web:1717dc81f52f78cab7720b",
  databaseURL: "https://personal-website-d1944-default-rtdb.firebaseio.com/",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const database = getDatabase(firebaseApp, firebaseConfig.databaseURL);

// Express Route Handling
app.post("/upload", async (req, res) => {
  try {
    // Log to check if the function runs
    console.log("Received POST request at /upload");

    const params = new URLSearchParams({
      secret: "6Lc8uTMqAAAAAKFBxU6N10NdYs1W90-jZqnQdXwq",
      response: req.body["g-recaptcha-response"],
      remoteip: req.ip,
    });

    const captchaResponse = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        body: params,
      }
    );
    const data = await captchaResponse.json();

    if (data.success) {
      res.json({ captchaSuccess: true });

      // Adding to Firebase
      const formData = req.body;
      console.log("Form Data:", formData.question);

      const newQuestionKey = push(ref(database, "questions")).key;
      await set(ref(database, "questions/" + newQuestionKey), {
        name: formData.name,
        question: formData.question,
        answer: "",
      });

      console.log("Question successfully added to Firebase!");
    } else {
      res.json({ captchaSuccess: false });
    }
  } catch (error) {
    console.error("Error in /upload route:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
