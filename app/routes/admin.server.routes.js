
const adminIndex = require('../controllers/admin.server.controller');

const bodyparser = require('body-parser');
const urlencodedparser = bodyparser.urlencoded({extended:false});

//this function handles routing of requests
module.exports = function (app) {
    var adminIndex = require('../controllers/admin.server.controller');
    var user = require('../controllers/user.server.controller');
    var movie = require('../controllers/movies.server.controller');
    app.get('/admin', adminIndex.adminPage);

       // displaying db in a list
   app.get('/list', movie.findall);

   // adding to db from Form
   app.get('/add', movie.movieadd)
      .post(urlencodedparser, movie.insert);

    app.get('/admin-panel/login', function(req,res){
        res.render('admin-panel/login', {title:'Log In'});
       });
}