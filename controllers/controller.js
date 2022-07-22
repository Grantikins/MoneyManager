const bcrypt = require("bcrypt")
const passport = require("../middlewares/passport-config")
const path = require("path")
const User = require("../models/user")

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

    async postRegister(request, response){
        try{
            const {name, email, password} = request.body 
            if(await User.exists({email: email})) 
                throw "Email already in use."                
            const hashedPassword = await bcrypt.hash(password, 10)  
            const newUser = new User({name: name, email: email, password: hashedPassword})
            await newUser.save()
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
        response.render("index.ejs", {name: request.user.name, transactions: request.user.transactions})
    }

    getBudgets(request, response){
        response.render("budgets.ejs", {budgets: request.user.budgets})
    }

    async postBudget(request, response){
        const {limit, category} = request.body
        var user = await User.findById(request.user.id)
        user.budgets.push( {budgetLimit: limit, currentAmount: 0, category: category, dateCreated: Date.now()} )
        await user.save()
        response.render("budgets.ejs", {budgets: user.budgets})
    }

    getInput(request, response){
        response.render("input.ejs")
    }

    async postInput(request, response){
        console.log(request.body)
        const {amount, category, date} = request.body
        const user = await User.findById(request.user.id)
        for(var i = 0; i < user.budgets.length; i++){
            if(user.budgets[i].category.toString().trim() === category.toString().trim()){
                if(date){
                    if(user.budgets[i].dateCreated < date)
                        user.budgets[i].currentAmount += parseInt(amount)
                } else if(user.budgets[i].dateCreated < Date.now()){
                    user.budgets[i].currentAmount += parseInt(amount)
                }
            }
        }
        if(date){
            var year = date.split("-")[0]
            var month = date.split("-")[1]
            var day = date.split("-")[2]
            user.transactions.push({amount: amount, category: category, dateCreated: Date.UTC(parseInt(year), parseInt(month) - 1, parseInt(day))})
        } else{
            user.transactions.push({amount: amount, category: category, dateCreated: Date.now()})
        }
        await user.save( () => console.log("saved input!") )
        response.render("input.ejs")
    }

    async deletePayment(request, response){
        response.render("index.ejs")
    }

    getTransactionOrBudget(request, response){
        const payment = request.user.transactions.filter( (t) => t.id === request.params.id )
        if(payment.length === 1)
            response.render("payment.ejs", {transaction: payment[0]})
        else{
            const budget = request.user.budgets.filter( (b) => b.id === request.params.id )
            response.render("budget.ejs", {budget: budget[0]})
        }
    }

    getTransactions(request, response){
        const params = request.body
        if(params){
            var transactions = request.user.transactions
            console.log(params)
        }
        response.render("transactions.ejs", {transactions: request.user.transactions})
    }

}

module.exports = new UserControllers()