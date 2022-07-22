const express = require("express")
const router = express.Router()
const controller = require("../controllers/controller")
const { checkAuthenticated, checkNotAuthenticated } = require("../middlewares/auth")

router.get("/", checkNotAuthenticated, controller.getLogin)
router.get("/login", checkNotAuthenticated, controller.getLogin)
router.get("/register", checkNotAuthenticated, controller.getRegister)
router.post("/login", checkNotAuthenticated, controller.postLogin)
router.post("/register", checkNotAuthenticated, controller.postRegister)

router.get("/logout", checkAuthenticated, controller.postLogout)
router.post("/logout", checkAuthenticated, controller.postLogout)
router.get("/index", checkAuthenticated, controller.getIndex)
router.get("/input", checkAuthenticated, controller.getInput)
router.get("/budgets", checkAuthenticated, controller.getBudgets)
router.post("/budgets", checkAuthenticated, controller.postBudget)
router.post("/input", checkAuthenticated, controller.postInput)
router.delete("/index", checkAuthenticated, controller.deletePayment)

router.get("/transactions", checkAuthenticated, controller.getTransactions)
router.get("/:id", checkAuthenticated, controller.getTransactionOrBudget)

module.exports = router