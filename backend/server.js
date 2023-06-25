

var path = require("path")
var express = require("express")
var loginControl = require("./app_server/routes/loginRoute")

var app = express();

app.use("/public", express.static(path.join(__dirname, "public")))

app.use(function(req, res, next){
    console.log("url...:" + req.url)
    console.log("time...:" + Date.now())
    next()  //middleware
})

app.use('/', loginControl)


app.listen(8000)