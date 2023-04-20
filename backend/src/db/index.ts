import { Field } from "mysql2";

const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST!,
  user: process.env.DB_USER!,
  password: process.env.DB_PASSWORD!,
  database: process.env.DB!,
  port: process.env.DB_PORT!
})

export function getUser(email: string) {
  if (!connection) return;
  
  return new Promise ((resolve, reject) => {
    connection.query("SELECT * FROM users WHERE email = ?;", [email], (err: Error, results: string[], fields: Field) => {
      if (err) {
        reject(err);
      } else {
        resolve(results[0]);
      }
    })
  })

};

export function setNewUser(
  name: string,
  surname: string,
  username: string,
  email: string,
  password: string,
) {
  connection.query("INSERT INTO users (name, surname, username, email, password, admin) VALUES (?, ?, ?, ?, ?, ?);",
  [name, surname, username, email, password, 0],
  (err: Error, result: string[]) => {
     if (err) {
      throw err;
     } else {
      console.log("Record inserted");
     }
  })
}
