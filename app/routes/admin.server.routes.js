
const adminIndex = require('../controllers/admin.server.controller');

const bodyparser = require('body-parser');
const auth = require('../auth/auth')
const urlencodedparser = bodyparser.urlencoded({extended:false});

//this function handles routing of requests
module.exports = function (app) {
    var adminIndex = require('../controllers/admin.server.controller');
    var user = require('../controllers/user.server.controller');
    var movie = require('../controllers/movies.server.controller');
    app.get('/admin', auth.requireAdmin, adminIndex.adminPage);

       // displaying db in a list
   app.get('/admin/list',auth.requireAdmin, movie.findall);

   // adding to db from Form
   app.get('/admin/add_movie',auth.requireAdmin, movie.movieadd)
      .post(urlencodedparser,auth.requireAdmin, movie.insert);

    app.get('/admin/login', function(req,res){
        res.render('admin-panel/login', {title:'Log In'});
       });
}

