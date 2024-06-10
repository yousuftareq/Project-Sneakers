// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Your web app's Firebase configuration
    const firebaseConfig = {
        apiKey: "AIzaSyDi59Qt8hX4oBF7eXkeI11QxLBq_pTRFK0",
        authDomain: "project-sneakers-7c4b1.firebaseapp.com",
        projectId: "project-sneakers-7c4b1",
        storageBucket: "project-sneakers-7c4b1.appspot.com",
        messagingSenderId: "506072441201",
        appId: "1:506072441201:web:6ccc3e25c8ea0198cd16d0"
      };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Function to save user data
async function saveUserData(userId, data) {
  try {
    await setDoc(doc(db, "users", userId), data);
    console.log("User data saved successfully!");
  } catch (error) {
    console.error("Error saving user data: ", error);
  }
}

// Submit button event listener for user registration
const form = document.querySelector('.signup-form');
form.addEventListener("submit", function(event) {
  event.preventDefault();

  // Inputs
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up
      const user = userCredential.user;
      alert("Account created successfully!");

      // Save user data
      saveUserData(user.uid, { email: user.email });

      // Optionally, redirect the user to another page
      window.location.href = './login.html'; // Redirect to login page after signup
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    });
});