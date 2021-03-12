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

const contactUsPage = function(req, res){
    res.render('contact-us', {title:'Movies Website', userLogged: req.user});
}

const ourTeamPage = function(req, res){
    res.render('our-team', {title:'Movies Website', userLogged: req.user});
}
const privacyPolicy = function(req, res){
    res.render('privacy-policy', {title:'Movies Website', userLogged: req.user});
}

module.exports = {"render": render, "displayInfo": displayInfo, "contactUsPage": contactUsPage, "ourTeamPage":ourTeamPage, "privacyPolicy":privacyPolicy }