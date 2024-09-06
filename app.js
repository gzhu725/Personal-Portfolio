import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, set } from "firebase/database";
import dotenv from 'dotenv'

dotenv.config()
const app = express();
const port = 3000;

app.use(cors());
app.use(express.urlencoded({ extended: false }));

// Firebase Configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
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
      secret: process.env.RECAPTCHA_SECRET,
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
