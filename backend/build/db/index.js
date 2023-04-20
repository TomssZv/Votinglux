"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = void 0;
const mysql = require('mysql2');
require('dotenv').config();
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB,
    port: process.env.DB_PORT
});
function getUser(email) {
    if (!connection)
        return;
    connection.query('SELECT * FROM users where email = ?', email, (err, results, fields) => {
        return results;
    });
}
exports.getUser = getUser;
;
