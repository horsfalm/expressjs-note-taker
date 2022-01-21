const express = require("express");
const fs = require("fs");
const db = require("./db/db.json");
const path = require("path");
// Introduce universally unique identifier
const uuid = require("uuid");
const { DH_CHECK_P_NOT_SAFE_PRIME } = require("constants");

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));


// Get saved notes
app.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/db/db.json"))
});

// Add new notes
app.post("/api/notes", (req, res) => {
    const notes = JSON.parse(fs.readFileSync("./db/db.json"));
    const newNotes = req.body;
    newNotes.id = uuid.v4();
    notes.push(newNotes);
    fs.writeFileSync("./db/db.json", JSON.stringify(notes))
    res.json(notes);
});

// Commence listening
app.listen(PORT, () => {
    console.log(`API server now on PORT: ${PORT}!`);
});