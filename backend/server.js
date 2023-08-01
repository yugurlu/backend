

var path = require("path")
var express = require("express")
var app = express()
var bodyParser = require("body-parser")

app.use("/public", express.static(path.join(__dirname, "public")))

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.engine("ejs", require("ejs").renderFile)
app.set("views", __dirname + "/views")

// app.use(function(req, res, next){
//     console.log("url: " + req.url)
//     console.log("time: " + Date.now())
//     next()  //middleware
// })

require("./app_server/routes/routeManager")(app)

app.listen(8080)