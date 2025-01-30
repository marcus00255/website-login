// Henter inn databasekobling
const { createConnection } = require("./database");
const bcrypt = require("bcrypt")
const saltRounds = 10

// En funksjon som setter inn informasjon i databasen
async function addUser(email, password) {
    const connection = await createConnection();
    // Åpner en databasekobling
    connection.connect();

    const find_user_query = "SELECT * FROM user WHERE email = ?;"
    const [rows] = await connection.execute(find_user_query, [email])
    const user = await rows[0]

    if (user) {
        return false
    }

    const query = "INSERT INTO user (email, password) VALUES (?, ?)"
    const hashed_password = bcrypt.hashSync(password, saltRounds)
    connection.execute(query, [email, hashed_password]);

    // Lukker databasekoblingen
    connection.end();
    return true
}

async function authenticateUser(email, password) {
    const connection = await createConnection()
    connection.connect()

    const query = "SELECT * FROM user WHERE email = ?;"
    const [rows] = await connection.execute(query, [email])
    const user = await rows[0]
    console.log(user)

    const match = await bcrypt.compare(password, user.password)

    connection.end()

    if (match) {
        return {success: true, email: user.email, name: user.name}
    }

    console.log("Wrong password")
    return match
}

// Eksporterer funksjonen slik at den kan brukes i andre filer, for eksempel app.js
module.exports = { addUser, authenticateUser };
