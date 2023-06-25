
var express = require("express")
var loginControl = require("../controller/login")

var router = express.Router()


router.use(function(req, res, next){
    res.deneme = "test"
    next()
})

router.get("/login", loginControl.login)

router.get("/", loginControl.home)

module.exports = router
