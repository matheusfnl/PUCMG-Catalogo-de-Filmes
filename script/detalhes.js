import getMovieData from '../api/getmovies.js'
import getMovieBadgets from '../api/getbadgets.js'

const params = new URLSearchParams(window.location.search);
const id = params.get('id');
let movie, badgets;

const getMovies = (data) => {
  movie = {}
  movie = JSON.parse(data.target.response)
  console.log(movie)
}

const getBadgets = (data) => {
  badgets = JSON.parse(data.target.response).genres
  console.log(badgets)
}

function convertMinsToHrsMins(minutes) {
  var h = Math.floor(minutes / 60);
  var m = minutes % 60;
  h = h < 10 ? '0' + h : h; 
  m = m < 10 ? '0' + m : m; 

  return h + 'h ' + m + 'm';
}

function fillInfo() {
  const watch_movie = document.getElementById('watch_movie')
  watch_movie.href = movie.homepage

  const card_title = document.getElementById('card_title')
  card_title.textContent = movie.title;

  const filme_nota = document.getElementById('filme_nota')
  filme_nota.textContent = movie.vote_average

  const card_date = document.getElementById('card_date')
  card_date.textContent = movie.release_date;

  const card_image = document.getElementById('card_image')
  card_image.style.backgroundImage = `url(https://image.tmdb.org/t/p/w500${movie.backdrop_path})`;

  const card_desc_image = document.getElementById('card_desc_image');
  card_desc_image.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  const card_desc_text = document.getElementById('card_desc_text')
  card_desc_text.textContent = movie.overview

  const card_desc_infos_original_title = document.getElementById('card_desc_infos_original_title')
  card_desc_infos_original_title.textContent = movie.original_title

  const card_desc_infos_status = document.getElementById('card_desc_infos_status')
  card_desc_infos_status.textContent = movie.status

  const card_desc_infos_popularidade = document.getElementById('card_desc_infos_popularidade')
  card_desc_infos_popularidade.textContent = movie.popularity

  const time = convertMinsToHrsMins(movie.runtime)
  const card_desc_infos_runtimes = document.getElementById('card_desc_infos_runtimes')
  card_desc_infos_runtimes.textContent = time
}

getMovieData({id, getMovies})
getMovieBadgets(getBadgets)

fillInfo()