// Henter inn databasekobling
const { createConnection } = require("./database");
const bcrypt = require("bcrypt")
const saltRounds = 10

// En funksjon som setter inn informasjon i databasen
async function addUser(email, password) {
    const connection = await createConnection();
    // Åpner en databasekobling
    connection.connect();

    const hashedPassword = bcrypt.hashSync(password, saltRounds)

    const query = "INSERT INTO user (email, password) VALUES (?, ?)";
    connection.execute(query, [email, hashedPassword]);

    // Lukker databasekoblingen
    connection.end();
}

async function authenticateUser(email, password) {
    const connection = await createConnection()
    connection.connect()

    const query = "SELECT * FROM user WHERE email = ?;"
    const [rows] = await connection.execute(query, [email])
    const user = await rows[0]

    const match = await bcrypt.compare(password, user.password)

    connection.end()

    return match
}

// Eksporterer funksjonen slik at den kan brukes i andre filer, for eksempel app.js
module.exports = { addUser, authenticateUser };
