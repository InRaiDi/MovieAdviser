
const index = require('../controllers/index.server.controller');
const passport = require('passport');
const bodyparser = require('body-parser');
const urlencodedparser = bodyparser.urlencoded({extended:false});
const movie = require('../controllers/movies.server.controller');

//this function handles routing of requests
module.exports = function (app) {
   var index = require('../controllers/index.server.controller');
   var user = require('../controllers/user.server.controller');
   var movie = require('../controllers/movies.server.controller');
   var search = require('../controllers/search.server.controller');

   app.get('/', index.render);
   app.get('/contact-us', index.contactUsPage);
   app.get('/privacy-policy', index.privacyPolicy);
   app.get('/our-team', index.ourTeamPage);
   app.get('/advance-search', search.searchPage);
   app.get('/upcoming-movies', index.upcomingMovies);
   app.get('/toprated-movies',index.toprateMovies);

   app.get('/movie-details', function(req,res){
    res.render('movie-details', {title:'Movie Details', userLogged: req.user});
   });
   
   app.get('/registration', function(req,res){
      res.render('registration', {title:'Registration', userLogged: req.user});
     });

   app.post('/registration', user.register);

   app.get('/login', function(req,res){
      res.render('login', {title:'Log In', userLogged: req.user});
     });

   
   app.post('/login', (req,res,next)=>{
      passport.authenticate('user',{
         successRedirect : '/',
         failureRedirect : '/login',
         failureFlash : true,
         })(req,res,next);
   });
   app.get('/logout', function(req,res){
      req.logout();
      res.redirect('/');
     })



   // update db from /list page
   app.post('/update/:objid', urlencodedparser, movie.updt);

   //to import data from API and save to DB
   app.get('/import_data',movie.importData)

   //for rating a movie
   app.post('/rate_movie',movie.rateMovie)

};
