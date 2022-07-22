const mongoose = require("mongoose")
const Schema = mongoose.Schema

const transactionSchema = new Schema({
    amount: Number,
    category: String,
    dateCreated: Date
})

const budgetSchema = new Schema({
    budgetLimit: Number,
    currentAmount: Number,
    category: String,
    dateCreated: Date
})

const userSchema = new Schema({
    name: String,
    email: String,
    password: String,
    transactions: [transactionSchema],
    budgets: [budgetSchema]
})

module.exports = mongoose.model("User", userSchema)