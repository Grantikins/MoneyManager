const express = require("express")
const router = express.Router()
const controller = require("../controllers/api-controller")
const { checkAuthenticated } = require("../middlewares/auth")

router.get("/user/data", checkAuthenticated, controller.getData)

router.get("/user/data/transaction/:id", checkAuthenticated, controller.getTransactionData)
router.delete("/user/data/transaction/:id", checkAuthenticated, controller.deleteTransactionData)

router.get("/user/data/budget/:id", checkAuthenticated, controller.getBudgetData)
router.delete("/user/data/budget/:id", checkAuthenticated, controller.deleteBudgetData)

module.exports = router