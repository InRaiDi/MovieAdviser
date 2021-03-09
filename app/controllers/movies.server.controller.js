const movie = require("../models/movies.server.model");
const Movies = require('mongoose').model('Movie');


exports.movieadd = function (req, res) {
    const ret = {};
    res.render("movie_add", { data: ret });
  }

  //to insert to data and display 
exports.insert = function (req, res ) {
    const ret = {};
    const movies = new Movies(req.body);
    console.log(movies);
    movie.create(req.body, function(err, retobj){
        if(err){
            ret.msg = err.message;
            res.json({ret});
        }
        else{
        movies.save(function(err){
        if(err){
            ret.msg = err.message;
            res.json({ret});
        }else{
        res.redirect("/list");
        }
      }); 
    }
});    
}
  
  
  exports.findall = function (req, res) {
    movie.find({}, function (err, retobj) {
      let ret = {};
      ret.movies = retobj;
      res.render("movie_list", { data: ret });
    });
  }
  
exports.updt = function (req, res) {
    const ret = {};
    movie.findByIdAndUpdate(req.params.objid, req.body, function (err, inobj) {
      if (err) {
        ret.msg = err.message;
        res.json({ ret });
      } 
      else {
          movies.findByIdAndUpdate(req.params.objid, req.body, function(err, inobj){
              if(err){
                ret.msg = err.message;
                res.json({ ret });
              }
              else{
                res.redirect("/list");
              }
          });
      }
    });
  }

  