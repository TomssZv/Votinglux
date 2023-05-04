import { Field, createConnection } from "mysql2";
import { resolve } from "path";
import dotenv from 'dotenv';

dotenv.config()

const connection = createConnection({
  host: process.env['DB_HOST'] ?? '',
  user: process.env['DB_USER'] ?? '',
  password: process.env['DB_PASSWORD'] ?? '',
  database: process.env['DB'] ?? '',
  port: parseInt(process.env['DB_PORT']!),
})

export function getUser(email: string) {
  if (!connection) return;
  
  return new Promise ((resolve, reject) => {
    connection.query(
      "SELECT * FROM users WHERE email = ?;",
      [email],
      (err, results: any[], fields) => {
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
  connection.query(
    "INSERT INTO users (name, surname, username, email, password, admin) VALUES (?, ?, ?, ?, ?, ?);",
    [name, surname, username, email, password, 0],
    (err, result: any[]) => {
      if (err) {
        throw err;
      } else {
        console.log("Record inserted");
      }
    })
}

export function getCategoriesDB() {
  return new Promise ((resolve, reject) => {
    connection.query(
      "SELECT * FROM category;",
      (err: Error, results: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    })
  })
}