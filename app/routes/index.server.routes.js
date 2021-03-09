
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

   app.get('/', index.render);
   app.get('/movie-details', function(req,res){
    res.render('movie-details', {title:'Movie Details'});
   });
   
   app.get('/registration', function(req,res){
      res.render('registration', {title:'Registration'});
     });

   app.post('/registration', user.register);

   app.get('/login', function(req,res){
      res.render('login', {title:'Log In'});
     });

   
   app.post('/login', (req,res,next)=>{
      passport.authenticate('local',{
         successRedirect : '/',
         failureRedirect : '/login',
         failureFlash : true,
         })(req,res,next);
   });

   app.get('/list', movie.findall);

   app.get('/add', movie.movieadd)
      .post(urlencodedparser, movie.insert);

   app.post('/update/:objid', urlencodedparser, movie.updt);

};
