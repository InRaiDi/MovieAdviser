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
    res.render('contact-us', {title:'Contact Us', userLogged: req.user});
}

const findall = function (req, res) {
    const title = {$regex: ".*/" + req.body.title + "/i.*"};
    console.log("Title: " + title.$regex);
    Movies.find({title: {$regex: req.body.title, $options: '-i'}}, function (err, retobj) {
      let data = {};
      data.movies = retobj;
     
      res.render("advance-search", {title:'Movie List', data: data, userLogged: req.user, movieTitle: req.body.title });
    });
  }

const ourTeamPage = function(req, res){
    res.render('our-team', {title:'Our Team Page', userLogged: req.user});
}
const privacyPolicy = function(req, res){
    res.render('privacy-policy', {title:'Privacy Policy', userLogged: req.user});
}
const upcomingMovies = function(req, res){
    Movies.find({}, function (err, retobj) {
        let ret = {};
        ret.movies = retobj;
    res.render('upcoming', {title:'Upcoming Movies', userLogged: req.user, data:ret});
    });
}
const recommendedMovies = function(req, res){
    Movies.find({}, function (err, retobj) {
        let ret = {};
        ret.movies = retobj;
    res.render('recommended', {title:'Recommended Movies', userLogged: req.user, data:ret});
    });
}
const toprateMovies = function(req,res){
    Movies.find({}, function (err, retobj){
        let ret ={};
        ret.movies = retobj;
    res.render('toprate', {title:'Top Rate Movies', userLogged: req.user, data:ret});
    });
}
module.exports = {"upcomingMovies":upcomingMovies,"render": render,"recommendedMovies": recommendedMovies, "render": render,
                    "displayInfo": displayInfo, "contactUsPage": contactUsPage,
                     "ourTeamPage":ourTeamPage, "privacyPolicy":privacyPolicy, "toprateMovies": toprateMovies, "findall": findall }