const fetch = require('node-fetch');

const movie = require("../models/movies.server.model");
const Movies = require('mongoose').model('Movie');

const upcomingMovie = require("../models/movies.server.model");
const UpcomingMovies = require('mongoose').model('Movie');

const topRateMovie = require("../models/movies.server.model");
const TopRateMovies = require('mongoose').model('Movie');
const recommendedMovies = require("../models/movies.server.model");
const RecommendedMovies = require('mongoose').model('Movie');

exports.movieadd = function (req, res) {
    const ret = {};
    res.render("admin-panel/movie_add", { title:'Add a Movie', data: ret });
  }

  //to insert to data and display 
exports.insert = function (req, res ) {
    const ret = {};
    const movies = new Movies(req.body);
    const upcomingMovies = new Movies(req.body);
    const topRateMovies = new Movies(req.body);
    const recommendedMovies = new Movies(req.body);

    console.log(movies);
    movie.create(req.body, function(err, retobj){
        if(err){
            ret.msg = err.message;
            res.json({ret});
        }
        else{
        
        res.redirect("/admin/list");
        }
      }); 
    console.log(recommendedMovies);
    movie.create(req.body, function(err, retobj){
        if(err){
            ret.msg = err.message;
            res.json({ret});
        }
        else{
        
        res.redirect("/admin/list");
        }
      }); 

      console.log(upcomingMovies);
      upcomingMovie.create(req.body, function(err, retobj){
        if(err){
            ret.msg = err.message;
            res.json({ret});
        }
        else{
        
        res.redirect("/admin/list");
        }
      }); 

      console.log(topRateMovies);
      upcomingMovie.create(req.body, function(err, retobj){
        if(err){
            ret.msg = err.message;
            res.json({ret});
        }
        else{
        res.redirect("/admin/list");
        }
      }); 
    }
  
  
  exports.findall = function (req, res) {
    movie.find({}, function (err, retobj) {
      let ret = {};
      ret.movies = retobj;
     
      res.render("admin-panel/movie_list", {title:'Movie List', data: ret });
    });
    upcomingMovie.find({}, function (err, retobj) {
      let ret = {};

      ret.upcomingMovies = retobj;
      res.render("admin-panel/movie_list", {title:'Movie List', data: ret });
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
                res.redirect("/admin/list");
              }
          });
      }
    });
  }

  exports.importData=async function (req, res){
    try{
      const url='https://api.themoviedb.org/3/movie/now_playing?api_key=6a879a78d6083b8f3ba308233e0de85b&language=en-US&page=1';
      const url2='https://api.themoviedb.org/3/movie/upcoming?api_key=6a879a78d6083b8f3ba308233e0de85b&language=en-US&page=1';
      const url3 = 'https://api.themoviedb.org/3/movie/top_rated?api_key=6a879a78d6083b8f3ba308233e0de85b&language=en-US&page=1';
      fetch(url)
      .then(res => res.json())
      .then(async(json) =>{
        let data=json;
        if(data.hasOwnProperty('results')){
          if(data.results.length>0){

            for(const obj of data.results){
              const movie=await Movies.findOne({id:obj.id}); ///checking if it's already in DB

              if(!movie){ ///if not found then insert a new movie

                const newMovie=new Movies({ 
                  id:obj.id,
                  title:obj.original_title,
                  genre:obj.genre_ids,
                  overview:obj.overview,
                  releaseDate:obj.release_date,
                  voteAverage:obj.vote_average,
                  voteCount:obj.vote_count,
                  language:obj.original_language,
                  posterPath:obj.poster_path,
                  movieType: 'latest'
                })
                await newMovie.save();
              } 
            }
            res.redirect("/admin/list");
          }
        }
      }).catch(err => res.send(err));;

      fetch(url2)
      .then(res => res.json())
      .then(async(json) =>{
        let data=json;
        if(data.hasOwnProperty('results')){
          if(data.results.length>0){

            for(const obj of data.results){
              const upcomingMovie=await UpcomingMovies.findOne({id:obj.id}); ///checking if it's already in DB

              if(!upcomingMovie){ ///if not found then insert a new movie

                const newUpcomingMovie=new UpcomingMovies({ 
                  id:obj.id,
                  title:obj.original_title,
                  genre:obj.genre_ids,
                  overview:obj.overview,
                  releaseDate:obj.release_date,
                  voteAverage:obj.vote_average,
                  voteCount:obj.vote_count,
                  language:obj.original_language,
                  posterPath:obj.poster_path,
                  movieType:'upcoming'
                })
                await newUpcomingMovie.save();
              } 
            }
            res.redirect("/admin/list");
          }
        } 
      }).catch(err => res.send(err));;

      fetch(url3)
      .then(res => res.json())
      .then(async(json) =>{
        let data=json;
        if(data.hasOwnProperty('results')){
          if(data.results.length>0){

            for(const obj of data.results){
              const toprateMovie=await TopRateMovies.findOne({id:obj.id}); ///checking if it's already in DB

              if(!toprateMovie){ ///if not found then insert a new movie

                const newToprateMovie=new TopRateMovies({ 
                  id:obj.id,
                  title:obj.original_title,
                  genre:obj.genre_ids,
                  overview:obj.overview,
                  releaseDate:obj.release_date,
                  voteAverage:obj.vote_average,
                  voteCount:obj.vote_count,
                  language:obj.original_language,
                  posterPath:obj.poster_path,
                  movieType:'topRate'
                })
                await newToprateMovie.save();
              } 
            }
            res.redirect("/admin/list");
          }
        } 
      }).catch(err => res.send(err));;

      fetch(url, url2, url3)
      .then(res => res.json())
      .then(async(json) =>{
        let data=json;
        if(data.hasOwnProperty('results')){
          if(data.results.length>0){

            for(const obj of data.results){
              const movie=await Movies.findOne({id:obj.id}); ///checking if it's already in DB

              if(!movie){ ///if not found then insert a new movie

                const newMovie=new Movies({ 
                  id:obj.id,
                  title:obj.original_title,
                  genre:obj.genre_ids,
                  overview:obj.overview,
                  releaseDate:obj.release_date,
                  voteAverage:obj.vote_average,
                  voteCount:obj.vote_count,
                  language:obj.original_language,
                  posterPath:obj.poster_path,
                  movieType: 'recommended'
                })
                await newMovie.save();
              } 
            }
            res.redirect("/admin/list");
          }
        }
      }).catch(err => res.send(err));;



    }catch(err){
      res.send(err.message)
    }
  }

  exports.rateMovie = async function (req, res ) {
    let movie=await Movies.findOne({id:req.body.movie_id})
    movie.total_rating=movie.total_rating+parseInt(req.body.stars) 
    movie.rate_count=movie.rate_count+1
    await movie.save()
    res.redirect('/movie-details')
  }
  
  exports.getMovieRating = async function (req, res ) {
    let movie=await Movies.findOne({id:req.params.movie_id})
    res.send(movie)
  }
  