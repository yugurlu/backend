
var express = require("express")
var loginControl = require("../controller/login")

var router = express.Router()

router.get("/", loginControl.login)

module.exports = router
