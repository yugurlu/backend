

var fs = require("fs")
var path = require("path")
var express = require("express")
var app = express();

app.use('/public', express.static(path.join(__dirname, "public")))

app.get('/', function(req, res){
    fs.readFile('index.html', function(err,data){
        res.write(data)
        res.end()
    })
})

app.get('/login', function(req, res){
    res.write("login screen")
    res.end()
})

app.listen(8000)