
var path = require("path")
var express = require("express")

module.exports.login = function(req, res){
    res.sendFile(path.join(__dirname, "../../login.html"))
}

