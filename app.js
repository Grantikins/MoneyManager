const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const userRoutes = require("./routes/routes")
const apiRoutes = require("./routes/api-router")
const bodyParser = require("body-parser")
const session = require("express-session")
const passport = require("./middlewares/passport-config")
const flash = require("express-flash")

const {database} = require("./dbConfig/database")
const mongoose = require("mongoose")
const mongoose_config = {useNewUrlParser: true, useUnifiedTopology: true}
const connection = mongoose.connect(database, mongoose_config)

if(connection){
    console.log("db connected!")
}

app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: false}))
app.use( session( {secret: "secret-word", resave: false, saveUninitialized: true} ) )
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())
app.use("/", userRoutes)
app.use("/api", apiRoutes)

app.listen(port, () => console.log(`listening on port ... ${port}`))