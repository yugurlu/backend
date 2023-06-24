

var path = require("path")
var express = require("express")
var loginControl = require("./app_server/routes/loginRoute")

var app = express();

app.use('/public', express.static(path.join(__dirname, "public")))

app.use('/login', loginControl)

app.listen(8000)