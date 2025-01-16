const express = require("express");
const app = express();
const port = 3000;
const { addUser } = require("./database/services"); // Henter funkjsonen som vi eksporterte i services
const bodyParser = require("body-parser"); // Hjelper oss å hente ut req.body

// Middleware for å parse URL-encoded data (f.eks. fra skjemaer)
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware for å parse JSON-data
app.use(bodyParser.json());

// Setter opp EJS som malmotor for å rendere HTML-sider
app.set("view engine", "ejs");


// Rute for hovedsiden (GET forespørsel)
app.get("/", (req, res) => {
    // Renders index.ejs-filen fra views-mappen
    res.render("index");
});

app.get("/signup", (req, res) => {
    res.render("signup");
});


// Rute for å håndtere skjema innsending (POST forespørsel)
app.post("/signup", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    addUser(email, password);
    return res.redirect("/"); // Omdirigerer brukeren tilbake til hovedsiden
});

// Starter serveren og lytter på port 3000
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
