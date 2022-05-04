const users = require("../models/users")
const passport = require("../middlewares/passport-config")
const path = require("path")

class UserControllers{
    getLogin(request, response){
        response.render("login.ejs")
    }

    getRegister(request, response){
        response.render("register.ejs")
    }

    postLogin(request, response, next){
        const config = {}
        config.successRedirect = "/index"
        config.failureRedirect = "/login"
        config.failureFlash = true
        const authHandler = passport.authenticate("local", config)
        authHandler(request, response, next)
    }

    postRegister(request, response){
        try{
            const {name, email, password} = request.body    
            users.add(name, email, password)
            response.redirect("/login")
        } catch{
            response.redirect("/register")
        }
    }

    postLogout(request, response){
        request.logOut()
        response.redirect("/login")
    }

    getIndex(request, response){
        response.render("index.ejs", {name: request.user.name})
    }

}

module.exports = new UserControllers()