const Movies = require('../models/movies.server.model')

const render = function(req, res){
    Movies.find({}, function (err, retobj) {
        let ret = {};
        ret.movies = retobj;
    res.render('homepage', {title:'Movies Website', userLogged: req.user, data:ret});
    });
}

const displayInfo = function (req, res) {

    var username = req.body.username;
    var session = req.session;
    session.username = username;
    console.log("username: " + session.username + " logged:" + session.logged);
    
}; 

module.exports = {"render": render, "displayInfo": displayInfo}