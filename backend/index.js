// require('dotenv').config();
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const Contact = require('./models/Contact'); // Add after other require statements

// const uri = process.env.MONGO_URI;
// const app = express();
// app.use(cors({
//   origin: [
//     "https://portfolio-1-4awf.onrender.com",
//     "http://localhost:3000"
//   ]
// }));
// app.use(express.json());

// mongoose.connect(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }).then(() => console.log("MongoDB connected"))
//   .catch(err => console.error(err));

// app.post('/contact', async (req, res) => {
//   const { name, email, message } = req.body;

//   // Basic validation
//   if (
//     !name || typeof name !== 'string' || name.length > 100 ||
//     !email || typeof email !== 'string' || email.length > 100 ||
//     !message || typeof message !== 'string' || message.length > 1000
//   ) {
//     return res.status(400).json({ error: 'Invalid input' });
//   }

//   try {
//     const contact = new Contact({ name, email, message });
//     await contact.save();
//     res.status(201).json({ message: 'Contact saved successfully' });
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to save contact' });
//   }
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const Contact = require("./models/Contact");

const app = express();
const uri = process.env.MONGO_URI;

app.use(cors({
  origin: [
    "https://portfolio-1-4awf.onrender.com",
    "http://localhost:3000"
  ]
}));

app.use(express.json());

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;
  if (
    !name || typeof name !== 'string' || name.length > 100 ||
    !email || typeof email !== 'string' || email.length > 100 ||
    !message || typeof message !== 'string' || message.length > 1000
  ) {
    return res.status(400).json({ error: 'Invalid input' });
  }

  try {
    const contact = new Contact({ name, email, message });
    await contact.save();
    res.status(201).json({ message: "Contact saved successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to save contact" });
  }
});

// Serve frontend (optional if same repo)
app.use(express.static(path.join(__dirname, "client", "dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));