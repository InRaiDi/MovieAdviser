const axios = require('axios');
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
        
        res.redirect("/list");
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

  exports.importData=async function (req, res){
    try{
      const url='https://api.themoviedb.org/3/movie/now_playing?api_key=6a879a78d6083b8f3ba308233e0de85b&language=en-US&page=1';
      const {data}=await axios.get(url)
      if(data.hasOwnProperty('results')){
        if(data.results.length>0){
          for(const obj of data.results){
            const movie=await Movies.findOne({id:obj.id}); ///checking if it's already in DB
            if(!movie){ ///if not found then insert a new movie
              const newMovie=new Movies({
                id:obj.id,
                title:obj.original_title,
                overview:obj.overview,
                releaseDate:obj.release_date,
                voteAverage:obj.vote_average,
                voteCount:obj.vote_count,
                language:obj.original_language,
                posterPath:obj.poster_path
              })
              await newMovie.save();
            } 
          }
        }
      }
      res.redirect("/list");
      
    }catch(err){
      res.send(err.message)
    }
    

  }
  
  