"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const cors = require('cors');
const app = express();
// Values for configs
const port = 3000;
const corsOptions = {
    origin: "http://localhost:3001"
};
// used functions
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.json({ message: "Welcome to test api" });
});
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
