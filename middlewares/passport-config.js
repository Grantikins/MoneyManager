const { Strategy } = require("passport-local")
const passport = require("passport")
const User = require("../models/user")
const bcrypt = require("bcrypt")

async function authenticateUser(email, password, done){
    const user = await User.findOne({email: email})
    if(user === null){
        console.log("no user with that email")
        return done(null, false, {message: "No user with that email."})
    }
    
    if(await bcrypt.compare(password, user.password)){
        console.log("user authenticated")
        return done(null, user)
    } else{
        console.log("password incorrect")
        return done(null, false, {message: "Password incorrect."})
    }
}

function setupPassport(){
    const formNames = {usernameField: "email", passwordField: "password"}
    const localStrategy = new Strategy(formNames, authenticateUser)
    passport.use(localStrategy)
    passport.serializeUser( (user, done) => done(null, user.id) )
    passport.deserializeUser( (id, done) => {
        User.findById(id, (err, user) => {
            done(err, user)
        })
    } )
}

setupPassport()
module.exports = passport