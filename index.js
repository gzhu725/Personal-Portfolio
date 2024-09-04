// // // Import necessary Firebase functions
// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js";
// import {
//   getDatabase,
//   ref,
//   push,
//   set,
// } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-database.js";

// // Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyDKQ4HTfXx5MMskbQPJ4f-I2S6Rf6FpWUk",
//   authDomain: "personal-website-d1944.firebaseapp.com",
//   projectId: "personal-website-d1944",
//   storageBucket: "personal-website-d1944.appspot.com",
//   messagingSenderId: "1033337069522",
//   appId: "1:1033337069522:web:1717dc81f52f78cab7720b",
//   databaseURL: "https://personal-website-d1944-default-rtdb.firebaseio.com/",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// // Initialize Database
// const database = getDatabase(app, firebaseConfig.databaseURL);

// // Export the save function
// export function saveQuestion(name, question) {
//   const newQuestionKey = push(ref(database, "questions")).key;
//   return set(ref(database, "questions/" + newQuestionKey), {
//     name: name,
//     question: question,
//     answer: ""
//   })
//     .then(() => {
//       document.getElementById("name").value = "";
//       document.getElementById("question").value = "";
//       console.log("thanks for your question!!");
//     })
//     .catch((error) => {
//       console.error("Error saving question:", error);
//     });
// }


// // document
// //   .getElementById("questionForm")
// //   .addEventListener("submit", function (event) {
// //     event.preventDefault();
// //     const name = document.getElementById("name").value;
// //     const question = document.getElementById("question").value;
// //     saveQuestion(name, question);
// //   });
