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

// Start Server
// ===============================================

// Routes
// ===============================================

// HTML Page Routes
// ======================

// API Routes
// ======================
