import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push, set } from 'firebase/database';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

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
const database = getDatabase(firebaseApp);

export async function handler(event) {
  try {
    if (event.httpMethod !== "POST") {
      return {
        statusCode: 405,
        body: JSON.stringify({ message: "Method Not Allowed" }),
      };
    }

    console.log("Received POST request");

    const params = new URLSearchParams({
      secret: process.env.RECAPTCHA_SECRET,
      response: JSON.parse(event.body)["g-recaptcha-response"],
      remoteip: event.headers["x-forwarded-for"] || 'unknown',
    });

    const captchaResponse = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        body: params,
      }
    );

    const data = await captchaResponse.json();
    console.log("reCAPTCHA response:", data);

    if (data.success) {
      const formData = JSON.parse(event.body);
      const newQuestionKey = push(ref(database, "questions")).key;
      await set(ref(database, "questions/" + newQuestionKey), {
        name: formData.name,
        question: formData.question,
        answer: "",
      });

      return {
        statusCode: 200,
        body: JSON.stringify({ captchaSuccess: true, message: "Question added to Firebase!" }),
      };
    } else {
      return {
        statusCode: 400,
        body: JSON.stringify({ captchaSuccess: false, message: "CAPTCHA verification failed" }),
      };
    }
  } catch (error) {
    console.error("Error in function:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal Server Error", error: error.message }),
    };
  }
}