
var express = require("express")
var router = express.Router()
var homeController = require("../controller/homeController")

router.get('/', homeController.home)

module.exports = router