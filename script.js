const API_KEY = "cd0e5fce9d43c3fe0933fa75d71707b8";

const API_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`;
const IMG_PATH = "https://image.tmdb.org/t/p/w500";
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;

const moviesContainer = document.getElementById("movies");
const search = document.getElementById("search");
const popup = document.getElementById("popup");
const popupContent = document.getElementById("popup-content");

// Load movies
getMovies(API_URL);



function getMovies(url) {
  fetch(url)
    .then(res => res.json())
    .then(data => showMovies(data.results));
}

function showMovies(movies) {
  moviesContainer.innerHTML = "";

  // 👇 هنا تحط الكود
  if (movies.length === 0) {
    moviesContainer.innerHTML = `<h2 style="text-align:center;">No results found 😢</h2>`;
    return;
  }

  movies.forEach(movie => {
    const { title, poster_path, vote_average, overview } = movie;

    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");

    movieEl.innerHTML = `
      <div class="movie-card">
        <img src="${IMG_PATH + poster_path}" />

        <div class="movie-info">
          <h3>${title}</h3>
          <span class="rating ${getClassByRate(vote_average)}">
            ⭐ ${vote_average.toFixed(1)}
          </span>
        </div>

        <div class="movie-overlay">
          <p>${overview ? overview.substring(0, 120) : "No description"}...</p>
        </div>
      </div>
    `;

    moviesContainer.appendChild(movieEl);
  });
}
// rating color
function getClassByRate(vote) {
  if (vote >= 8) return "green";
  else if (vote >= 5) return "orange";
  else return "red";
}

// search
search.addEventListener("input", (e) => {
  const query = e.target.value;

  if (query) {
    getMovies(SEARCH_API + query);
  } else {
    getMovies(API_URL);
  }
});

// close popup
popup.addEventListener("click", () => {
  popup.classList.add("hidden");
});

