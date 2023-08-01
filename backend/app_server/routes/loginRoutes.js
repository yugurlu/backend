
var express = require("express")
var router = express.Router()
var loginController = require("../controller/loginController")

router.get("/", loginController.login)
router.post("/", loginController.loginPost)

module.exports = router