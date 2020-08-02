// Dependencies
// ===============================================
const express = require("express")
const path = require("path")
const fs = require("fs")

// Sets up Express App
// ======================
const app = express()
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Routes
// ===============================================

// HTML Page Routes
// ======================

// Homepage Route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"))
})

// Note Page Route
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "notes.html"))
})

// API Routes
// ======================

// GET
// Read the db.json file and retuen all saved notes as JSON
app.get("/api/notes", (req, data) => {
    fs.readFile("db/db.json", "utf8", () => {
        return saveNote
    })
})

// POST
// Receive a new note on req.body
// Add the note to the db.json file
// Return the new note to the client

// DELETE
// Receive query parameter containing the id of the note to delete
// Read all notes from the db.json file
// Remove the note with the specified id
// Rewrite the note to the db.json file

// Start Server
// ===============================================
app.listen(PORT, function () {
    console.log("Server is listening on PORT " + PORT);
});

