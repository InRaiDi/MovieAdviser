//window.onload = function() {
//    const xhr = new XMLHttpRequest();
//    const endPoint = `https://api.themoviedb.org/3/movie/now_playing?api_key=6a879a78d6083b8f3ba308233e0de85b&language=en-US&page=1`;
//    xhr.open("GET", endPoint);
//    xhr.addEventListener("load", updateLatestMovies);
//    xhr.send();

//    function updateLatestMovies() {
//        const nowPlaying = document.querySelector("#nowPlaying");
//        if (xhr.readyState == 4) {
//            const response = JSON.parse(xhr.responseText);
//
//            const nowPlayingOutput = document.querySelector("#nowPlaying");
//            let nowPlayingA = response.results;
//            let output = "";

//            for (let i = 0; i < 15; i++) {
//                output += `
//                    <div id="card" class="grid-item" style="width: 24rem;">
//                        <div id="card-img-top">
//                            <a onclick="movieSelected('${nowPlayingA[i].id}')" href="#"><img class="poster-image" src="http://image.tmdb.org/t/p/w400/${nowPlayingA[i].poster_path}"></a>
//                         </div>
//                        <div class="card-body">
//                            <div class="card-title">
//                                <a onclick="movieSelected('${nowPlayingA[i].id}')" href="#"><h2>${nowPlayingA[i].title}</h2></a>
//                            </div>
//                            <p class="card-text"><span class="max-lines">${nowPlayingA[i].overview}</span>
//                        </div>
//                        <ul class="list-group list-group-flush">
//                            <li class="list-group-item"><strong>Release Date:</strong> ${nowPlayingA[i].release_date}</li>
//                           
//                            <li class="list-group-item"><strong>Rating:</strong> ${nowPlayingA[i].vote_average} / 10 <span id="smallText">(${nowPlayingA[i].vote_count} votes)</span></li>
//                        </ul>
                               
//                    </div>`;
//            }
//            nowPlayingOutput.innerHTML = output;
//        }
//    }
//}




function movieSelected(id) {
  sessionStorage.setItem("movieId", id);
  location.replace("movie-details");
  return false;
}
