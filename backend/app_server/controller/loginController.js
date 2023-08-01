
module.exports.login = function(req, res) {
    res.render("login.ejs")
}

module.exports.loginPost = function(req, res) {
    console.log(req.body)
    res.render("home.ejs", {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
}