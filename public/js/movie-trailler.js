 window.onload = function () {
  const movieDetails = document.querySelector("#movieDetails");
  const xhr2 = new XMLHttpRequest();
  let movieId = sessionStorage.getItem("movieId");
  const movieInfo = `https://api.themoviedb.org/3/movie/${movieId}?api_key=6a879a78d6083b8f3ba308233e0de85b&language=en-US`;
  xhr2.open("GET", movieInfo);
  xhr2.send();
  xhr2.addEventListener("load", getMovieInfo);
  const trailer = document.querySelector("#trailer");
  const xhr3= new XMLHttpRequest();
  const movieTrailer = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=6a879a78d6083b8f3ba308233e0de85b&language=en-US` ;
  xhr3.open("GET", movieTrailer);
  xhr3.send();
  xhr3.addEventListener("load", getMovieTrailer);
  function getMovieInfo() {
    if (xhr2.readyState == 4) {
      const response2 = JSON.parse(xhr2.responseText);
      let getMoviesA = response2;
      let output = "";
      output += `
      
			<br>
			<div class="poster"><img src="http://image.tmdb.org/t/p/w300/${getMoviesA.poster_path}"></div>
			<div class="info">
      <ul>
					<li><strong>Info:</strong>
          <li><strong>Movie name:</strong> <h1>"${getMoviesA.original_title}"<h1></li>
          <li><strong>Movie original language:</strong> ${getMoviesA.original_language}</li>

          <li><strong>Movie description:</strong> ${getMoviesA.overview}</li>
        <li><strong>Release Date:</strong> ${getMoviesA.release_date}</li>
					<li><strong>Runtime:</strong> ${getMoviesA.runtime} (min)</li>
					<li><strong>Rating:</strong> ${getMoviesA.vote_average} / 10 <span id="smallText">(${getMoviesA.vote_count} votes)</span></li>
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
                <iframe width="100%" height="100%" src="https://www.youtube.com/embed/${getTrailer[trailerNumber].key}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
                </div>`;
    trailer.innerHTML = output2;
  }
}
}