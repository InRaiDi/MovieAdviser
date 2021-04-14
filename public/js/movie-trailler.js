window.onload = function () {
  const movieDetails = document.querySelector("#movieDetails");
  const xhr2 = new XMLHttpRequest();
  let movieId = sessionStorage.getItem("movieId");
  const movieInfo = `https://api.themoviedb.org/3/movie/${movieId}?api_key=6a879a78d6083b8f3ba308233e0de85b&language=en-US`;
  
  var ratingInfo;
  fetch(`/movie_rating/${movieId}`)
  .then(response => response.json())
  .then(data =>{
    ratingInfo=data
    xhr2.open("GET", movieInfo);
    xhr2.send();
    xhr2.addEventListener("load", getMovieInfo);
  });
  
  const trailer = document.querySelector("#trailer");
  const movieTitle = document.getElementById("movieTitle");
  const xhr3= new XMLHttpRequest();
  const movieTrailer = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=6a879a78d6083b8f3ba308233e0de85b&language=en-US` ;
  xhr3.open("GET", movieTrailer);
  xhr3.send();
  xhr3.addEventListener("load", getMovieTrailer);
  function getMovieInfo() {
    if (xhr2.readyState == 4) {
      const response2 = JSON.parse(xhr2.responseText);
      let getMoviesA = response2;
      // window.genreID = getMoviesA.genres[0].id;
      sessionStorage.setItem("movieGenre", getMoviesA.genres[0].id);
      console.log(sessionStorage.getItem("movieGenre"));
      let output = "";
      movieTitle.innerHTML = `${getMoviesA.original_title}`;
      let movie_genre = [];
      getMoviesA.genres.forEach(element => movie_genre.push(element.name));
      output += `
      
	
			<div class="entry-img text-center"><img src="http://image.tmdb.org/t/p/w300/${getMoviesA.poster_path}"></div>
			<div class="info grid-item">
      <ul type="none">
          <div class="entry-title">Movie name: <h2>"${getMoviesA.original_title}"<h2></div>
          <hr>
      <div class="desc_info_block">
          <li><strong>Movie original language:</strong> ${getMoviesA.original_language}</li>
          <li><strong>Movie Genre:</strong> ${movie_genre}</li>
          <li><strong>Movie description:</strong> ${getMoviesA.overview}</li>
        <li><strong>Release Date:</strong> ${getMoviesA.release_date}</li>
					<li><strong>Runtime:</strong> ${getMoviesA.runtime} (min)</li>
					<li><strong>Rating:</strong> ${(ratingInfo.total_rating/ratingInfo.rate_count).toFixed(2)} / 5 <span id="smallText">(${ratingInfo.rate_count} votes)</span></li>
          
          <form class="rating text-center" action="/rate_movie" method="POST">
          <input type="hidden" name="movie_id" value="${movieId}">
          <label>
            <input type="radio" name="stars" value="1" />
            <span class="icon">★</span>
          </label>
          <label>
            <input type="radio" name="stars" value="2" />
            <span class="icon">★</span>
            <span class="icon">★</span>
          </label>
          <label>
            <input type="radio" name="stars" value="3" />
            <span class="icon">★</span>
            <span class="icon">★</span>
            <span class="icon">★</span>   
          </label>
          <label>
            <input type="radio" name="stars" value="4" />
            <span class="icon">★</span>
            <span class="icon">★</span>
            <span class="icon">★</span>
            <span class="icon">★</span>
          </label>
          <label>
            <input type="radio" name="stars" value="5" checked/>
            <span class="icon">★</span>
            <span class="icon">★</span>
            <span class="icon">★</span>
            <span class="icon">★</span>
            <span class="icon">★</span>
          </label>
          &emsp;
          <input type="submit" name="rating" id="rating" class="rate_button" value="Rate"/>
        </form>

     </div>
          </ul>
          </div>
                   `;
      movieDetails.innerHTML = output;
    }
}

function getMovieTrailer() {
  if (xhr3.readyState == 4) {
    const response3 = JSON.parse(xhr3.responseText);
    let getTrailer = response3.results;

    let min = 0;
    let max = getTrailer.length - 1;
    min = Math.ceil(min);
    max = Math.floor(max);
    let trailerNumber = Math.floor(Math.random() * (max - min + 1)) + min;

    let output2 = "";
     output2 = `
                <div class="video-container">
                <iframe width="100%" height="500px " src="https://www.youtube.com/embed/${getTrailer[trailerNumber].key}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
                </div>`;
    trailer.innerHTML = output2;
  }
}
}