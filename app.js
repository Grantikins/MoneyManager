const express = require('express')
const app = express()

app.set("view engine", "ejs")
app.use(express.static(__dirname + "/public"))

app.get("/", (request, response) => {
    response.render("login")
})

app.get("/login", (request, response) => {
    response.render("login")
})

app.get("/register", (request, response) => {
    response.render("register")
})

app.listen(3000)