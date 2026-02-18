// 1. Firebase config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "XXXX",
  appId: "YOUR_APP_ID"
};

// 2. Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// 3. Get motor ID from URL
const params = new URLSearchParams(window.location.search);
const motorId = params.get('id');

const container = document.getElementById('motor-container');

if (motorId) {
  db.collection('motors').doc(motorId).get()
    .then(doc => {
      if (!doc.exists) {
        container.innerHTML = "<p>Motor not found.</p>";
        return;
      }
      const motor = doc.data();
      container.innerHTML = `
        <h2>${motor.name} (${motor.id})</h2>
        <p>Model: ${motor.model}</p>
        <p>Brand: ${motor.brand}</p>
        <p>Warranty: ${motor.warranty}</p>
        <p>Last Service: ${motor.last_service}</p>
        <a href="${motor.certificate}" target="_blank">View Certificate</a>
      `;
    })
    .catch(err => console.error(err));
} else {
  container.innerHTML = "<p>No motor ID provided.</p>";
}
