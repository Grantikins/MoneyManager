const express = require("express")
const router = express.Router()
const controller = require("../controllers/controller")
const { checkAuthenticated, checkNotAuthenticated } = require("../middlewares/auth")

router.get("/", checkNotAuthenticated, controller.getLogin)
router.get("/login", checkNotAuthenticated, controller.getLogin)
router.get("/register", checkNotAuthenticated, controller.getRegister)
router.post("/login", checkNotAuthenticated, controller.postLogin)
router.post("/register", checkNotAuthenticated, controller.postRegister)
router.post("/logout", checkAuthenticated, controller.postLogout)

router.get("/index", checkAuthenticated, controller.getIndex)

module.exports = router