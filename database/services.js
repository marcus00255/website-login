// Henter inn databasekobling
const { createConnection } = require("./database");

// En funksjon som setter inn informasjon i databasen
async function addUser(email, password) {
    const connection = await createConnection();
    // Åpner en databasekobling
    connection.connect();

    const query = "INSERT INTO user (email, password) VALUES (?, ?)";
    connection.execute(query, [email, password]);

    // Lukker databasekoblingen
    connection.end();
}

// Eksporterer funksjonen slik at den kan brukes i andre filer, for eksempel app.js
module.exports = { addUser };
