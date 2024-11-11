const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const admin = require("firebase-admin");

// Initialize Express app
const app = express();

// Import Firebase service account key
const serviceAccount = require("./firebaseServiceAccountKey.json");

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://bloodbank-8d15a-default-rtdb.firebaseio.com/", // Replace with your Firebase Realtime Database URL
});

// Reference to Firebase Realtime Database
const db = admin.database();

app.use(cors());
app.use(bodyParser.json());

// Route to handle form data submission
app.post("/api/addData", (req, res) => {
  const { name, bloodGroup } = req.body;

  // Log incoming data for verification
  console.log("Received data:", { name, bloodGroup });

  // Save data to Firebase Realtime Database under the "users" node
  db.ref("users")
    .push({ name, bloodGroup })
    .then(() => {
      console.log("Data saved to Firebase:", { name, bloodGroup });
      res.status(200).json({ message: "Data saved successfully" });
    })
    .catch((error) => {
      console.error("Error saving data to Firebase:", error);
      res.status(500).json({ message: "Failed to save data" });
    });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
