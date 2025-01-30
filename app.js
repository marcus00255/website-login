const express = require("express");
const app = express();
const port = 3000;
const { addUser, authenticateUser } = require("./database/services"); // Henter funkjsonen som vi eksporterte i services
const bodyParser = require("body-parser"); // Hjelper oss å hente ut req.body
const validator = require("validator")
const session = require("express-session")

//app.use(bodyParser)

// Middleware for å parse URL-encoded data (f.eks. fra skjemaer)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    session({
        resave: false, // don't save session if unmodified
        saveUninitialized: false, // don't create session until something stored
        secret: "shhhh, very secret",
    })
)

// Middleware for å parse JSON-data
app.use(bodyParser.json());

// Setter opp EJS som malmotor for å rendere HTML-sider
app.set("view engine", "ejs");


// Rute for hovedsiden (GET forespørsel)
app.get("/", (req, res) => {
    // Renders index.ejs-filen fra views-mappen
    res.render("index");
});

// signup
app.get("/signup", (req, res) => {
    res.render("signup");
})

app.post("/signup", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const is_strong_password = validator.isStrongPassword(password, {
        minLength: 3,
        minLowercase: 0,
        minUppercase: 0,
        minNumbers: 0,
        minSymbols: 0,
    })

    if (!is_strong_password) {
        console.log("Weak password")
        return res.redirect("/signup")
    }

    const email_check = await addUser(email, password);
    if (!email_check) {
        console.log("Email is already in use");
        return res.redirect("/signup");
    }

    return res.redirect("/login");
});

// login
app.get("/login", (req, res) => {
    res.render("login")
})
app.post("/login", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const auth = await authenticateUser(email, password)

    if (auth) {
        req.session.email = auth.email
        req.session.name = auth.name
        return res.redirect("/dashboard")
    }
    return res.redirect("/login")
})

function is_authenticated(req, res, next) {
    if (req.session.email) {
        next()
    } else {
        req.session.error = "Access denied!"
        res.redirect("/login")
    }
}

app.get("/dashboard", is_authenticated, (req, res) => {
    res.render("dashboard", { name: req.session.name })
})

// Starter serveren og lytter på port 3000
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
