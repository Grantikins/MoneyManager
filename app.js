const express = require('express')
const app = express()
const port = 3000
const userRoutes = require("./routes/routes")
const bodyParser = require("body-parser")
const session = require("express-session")
const passport = require("./middlewares/passport-config")
const flash = require("express-flash")

app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: false}))
app.use( session( {secret: "secret-word", resave: false, saveUninitialized: true} ) )
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())
app.use("/", userRoutes)

app.listen(port, () => console.log(`listening on port ... ${port}`))