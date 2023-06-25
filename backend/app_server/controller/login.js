
var path = require("path")
var express = require("express")

module.exports.login = function(req, res){
    console.log(res.deneme)
    res.sendFile(path.join(__dirname, "../../login.html"))
}

module.exports.home = function(req, res){
    res.sendFile(path.join(__dirname, "../../home.html"))
}