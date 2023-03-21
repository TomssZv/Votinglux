const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const app = express();
require('dotenv').config();

// Values for configs
const port = 3000
const corsOptions = {
  origin: "http://localhost:3001"
}

// used functions
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB,
  port: process.env.DB_PORT
})

app.get('/', (req, res) => {
  res.json({ message: "Welcome to test api" });
})


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
})