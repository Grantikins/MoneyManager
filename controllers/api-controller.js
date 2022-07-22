const { response } = require("express")
const User = require("../models/user")

class apiController{

    getData(request, response){
        response.json(request.user)
    }

    getTransactionData(request, response){
        var transactions = request.user.transactions
        transactions = transactions.filter( ({id}) => id === request.params.id )
        response.json(transactions[0])
    }

    async deleteTransactionData(request, response){
        var transactions = request.user.transactions
        transactions = transactions.filter( (transaction) => transaction.id !== request.params.id )
        const user = await User.findById(request.user.id)
        user.transactions = transactions
        await user.save()
        response.redirect("/index")
    }

    getBudgetData(request, response){
        var budgets = request.user.budgets
        budgets = budgets.filter( (budget) => budget.id === request.params.id )
        response.json(budgets[0])
    }

    async deleteBudgetData(request, response){
        var budgets = request.user.budgets
        budgets = budgets.filter( (budget) => budget.id !== request.params.id )
        console.log(budgets)
        const user = await User.findById(request.user.id)
        user.budgets = budgets
        await user.save()
        response.redirect("/budgets")
    }

}

module.exports = new apiController()