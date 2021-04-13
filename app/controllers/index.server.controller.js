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
    if(req.body.title){
        const title = {$regex: ".*/" + req.body.title + "/i.*"};
        console.log("Title: " + title.$regex);
        Movies.find({title: {$regex: req.body.title, $options: '-i'}}, function (err, retobj) {
        let data = {};
        data.movies = retobj;
     
        res.render("advance-search", {title:'Movie List', data: data, userLogged: req.user, movieTitle: req.body.title });
        });
    }
}

const findAllAdvanced = function (req, res) {
    console.log("Language: " + req.body.language + "- Year: " + req.body.year + "- Title: " + req.body.movieTitle);
    let data = {};
        if(req.body.movieTitle || req.body.year || req.body.language || req.body.movieRating){
            Movies.find({
                title: {$regex: req.body.movieTitle, $options: '-i'}, 
                language: {$regex: req.body.language, $options: '-i'},
                releaseDate: {$regex: req.body.year, $options: '-i'},
                voteAverage: {$gte: req.body.movieRating}
            }, function (err, retobj){
                data.movies = retobj;
                console.log(data.movies);
                if(data.movies){
                    res.render("advance-search", {title: 'Movie List', data: data, userLogged: req.user, 
                    movieTitle: req.body.movieTitle, language: req.body.language, year: req.body.year, movieRating: req.body.movieRating});
                } else {
                    Movies.find({title: {$regex: req.body.movieTitle, $options: '-i'}},function(err, retobj){
                        data.movies = retobj;
                        res.render("advance-search", {title: 'Movie List', data: data, userLogged: req.user, movieTitle: req.body.movieTitle});
                    });
                }
                
            });
    } else if(req.body.movieTitle){
        Movies.find({ title: {$regex: req.body.movieTitle, $options: '-i'}},function(err, retobj){
            data.movies = retobj;
            res.render("advance-search", {title: 'Movie List', data: data, userLogged: req.user, movieTitle: req.body.movieTitle});
        });
    }
        

    
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
                     "ourTeamPage":ourTeamPage, "privacyPolicy":privacyPolicy, "toprateMovies": toprateMovies, "findall": findall, "findAllAdvanced": findAllAdvanced }