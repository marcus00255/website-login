// Installerer mysql2/promise for å muliggjøre asynkron funksjonalitet
const mysql = require("mysql2/promise");
require("dotenv").config()

// Oppretter en funksjon som lager en databasekobling
async function createConnection() {
    return mysql.createConnection({
        host: process.env.host,
        user: process.env.database_username,
        password: process.env.database_password,
        database: process.env.database
    });
}

// Eksporterer funksjonen slik at den kan brukes i andre filer
module.exports = { createConnection };
