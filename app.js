const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const userRoutes = require("./routes/routes")
const apiRoutes = require("./routes/api-router")
const bodyParser = require("body-parser")
const session = require("express-session")
const passport = require("./middlewares/passport-config")
const flash = require("express-flash")

// TEST Stuff
const User = require("./models/user")

// END TEST

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

// TEST Transaction stuff
async function test(){
    // await User.deleteMany({name: "g"})
    const user = await User.findOne({email: "g@mail.com"})
    console.log(user)
    budgets = []
    user.budgets = budgets
    await user.save()
    console.log(user.budgets)
    // user.transactions.push({amount: 20, category: "Groceries", dateCreated: Date.now()})
    // await user.save( () => console.log("saved") )
}
// test()
// END TEST

app.listen(port, () => console.log(`listening on port ... ${port}`))