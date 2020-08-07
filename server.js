// Dependencies
// ===============================================
const express = require("express")
const path = require("path")
const fs = require("fs")
const util = require("util")
const { v4: uuid } = require('uuid')
const db = require("./db/db.json")


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

const readFilePromisify = util.promisify(fs.readFile)
const writeFilePromisify = util.promisify(fs.writeFile)

app.get("/api/notes", (req, res) => {
    // Reads file and turns file into a string and sends to data
    readFilePromisify("db/db.json", "utf8")

        .then((data) => {
            let notes = JSON.parse(data)

            return notes
        })
        .then((notes) => res.json(notes))
})

// POST
// Receive a new note on req.body
// Add the note to the db.json file
// Return the new note to the client

app.post("/api/notes", (req, res) => {
    console.log(req.body)
    readFilePromisify("db/db.json", "utf8")
        .then((data) => {
            let notes = JSON.parse(data);
            notes.push(req.body);
            let updatedNotes = JSON.stringify(notes);
            console.log("breaking at write file")
            writeFilePromisify("db/db.json", updatedNotes, "utf8")
                .then(() => {
                    console.log("WRITE NOTES", notes)
                    res.json(notes)
                })
        })

    // res.send(req.body)
    // Read first
    // Update
    // Rewrite
})

// DELETE
// Receive query parameter containing the id of the note to delete
// Read all notes from the db.json file
// Remove the note with the specified id
// Rewrite the note to the db.json file

app.delete("/api/notes/:id", (req, res) => {
    let noteId = req.params.id

    readFilePromisify("db/db.json", "utf8",)

        .then((data) => {
            let notes = JSON.parse(data)

            return notes
        })
        .then((notes) => notes.filter((note) => note.id !== noteId))
        .then((fNotes) => writeFilePromisify("db/db.json", JSON.stringify(fNotes)))
        .then(() => res.status(200).json({ status: "ok" }))
})

// Start Server
// ===============================================
app.listen(PORT, function () {
    console.log(`Server is listening on http://localhost:${PORT}`);
});

