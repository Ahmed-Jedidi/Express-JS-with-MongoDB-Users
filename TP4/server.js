const express = require("express")
const app = express()
app.use(express.json())

// Path
const path = require("path");

// Cross origin
const cors = require('cors')
app.use(cors());

// Port
const PORT = 5000

//JWT
const cookieParser = require("cookie-parser");
app.use(cookieParser());


//JWT 2
const { adminAuth, userAuth } = require("./middleware/auth.js");
//app.get("/admin", adminAuth, (req, res) => res.send("Admin Route"));
//app.get("/basic", userAuth, (req, res) => res.send("User Route"));


// DB
const connectDB = require("./db");
//Connecting the Database
connectDB();


// Bootstrap
app.use(express.static(path.join(__dirname, "public")));
app.use("/css",express.static(path.join(__dirname, "node_modules/bootstrap/dist/css")))
app.use("/js",express.static(path.join(__dirname, "node_modules/bootstrap/dist/js")))
app.use("/js", express.static(path.join(__dirname, "node_modules/jquery/dist")))



app.use("/api/auth", require("./Auth/route"))


// View
app.set("view engine", "ejs")

app.get("/", (req, res) => res.render("home"))
app.get("/register", (req, res) => res.render("register"))
app.get("/login", (req, res) => res.render("login"))

app.get("/logout", (req, res) => {
    res.cookie("jwt", "", { maxAge: "1" })
    res.redirect("/")
    })

app.get("/admin", adminAuth, (req, res) => res.render("admin"))
app.get("/basic", userAuth, (req, res) => res.render("user"))
//app.get("/admin", adminAuth, (req, res) => res.send("Admin Route"));
//app.get("/basic", userAuth, (req, res) => res.send("User Route"));



//app.listen(PORT, () => console.log(`Server Connected to port ${PORT}`))
const server = app.listen(PORT, () =>
    console.log(`Server Connected to port ${PORT}`)
)
// Handling Error
process.on("unhandledRejection", err => {
    console.log(`An error occurred: ${err.message}`)
    server.close(() => process.exit(1))
})