
var loginRoute = require("./loginRoutes")
var homeRoute = require("./homeRoutes")

module.exports = function(app){
    app.use('/home', homeRoute)
    app.use('/login', loginRoute)
}