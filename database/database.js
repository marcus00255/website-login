// Installerer mysql2/promise for å muliggjøre asynkron funksjonalitet
const mysql = require("mysql2/promise");

// Oppretter en funksjon som lager en databasekobling
async function createConnection() {
    return mysql.createConnection({
        host: "localhost", // Angir databasen sin vert (her: localhost)
        user: "root", // Brukernavnet for å logge inn på databasen
        password: "DB123", // Passordet for å logge inn på databasen
        database: "cars", // Navnet på databasen som skal brukes
    });
}

// Eksporterer funksjonen slik at den kan brukes i andre filer
module.exports = { createConnection };
