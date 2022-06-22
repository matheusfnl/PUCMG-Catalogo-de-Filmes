import getMovieData from '../api/getmovies.js'
import getMovieBadgets from '../api/getbadgets.js'

// variáveis

let badgets = []
let movies;
let actual_page = 1;

// Funções

const criaCards = (data, div) => {
  data.forEach(item => {
    const div_primaria = document.createElement('div');
    div_primaria.classList.add('col-md')
    div_primaria.classList.add('d-flex')
    div_primaria.classList.add('justify-content-center')
    div_primaria.classList.add('mb-5')
    div_primaria.classList.add('destaque_card')

    let src;

    if(!item.poster_path) {
      src = './imagens/no_banner.png'
    }
    else {
      src = `https://image.tmdb.org/t/p/w500${item.poster_path}`
    }

    div_primaria.innerHTML = `
      <a class="go-to-page" href="./detalhes.html?id=${item.id}">
        <div class="poster-destaque text-center">
          <div id="score-${item.id}" class="position-absolute" style="margin-top: -10px;"></div>
          <img class="card-image" src="${src}" alt="">
          <h5 class="text-destaque text-white mt-2 mb-1">${item.title}</h5>
          <div id="badgets-${item.id}" class=""></div>
        </div>
      </a>
    `
    div.appendChild(div_primaria)

    let score = document.getElementById(`score-${item.id}`)
    score.innerHTML = `
      <h4><span class="badge bg-warning text-dark score-destaque">${item.vote_average}</span><h4>
    `

    let badget = document.getElementById(`badgets-${item.id}`)

    item.genre_ids.forEach(genre_id => {
      badgets.forEach(genre => {
        if(genre_id === genre.id) {
          badget.innerHTML += `
           <span class="badge bg-light text-dark badge-destaque">${genre.name}</span>
          `
        }
      });
    });
  });
}

function paginate (arr, pag_number) {
  return arr.reduce((acc, val, i) => {
    let idx = Math.floor(i / pag_number)
    let page = acc[idx] || (acc[idx] = [])
    page.push(val)

    return acc
  }, [])
}

const showMoreFilms = () => {
  const rowFilmes = document.getElementById('rowFilmesLista')

  let pages = paginate(movies, 5)

  if(pages[actual_page] != undefined) {
    criaCards(pages[actual_page], rowFilmes)
  }

  if(pages[actual_page+1] == undefined){
    $('#showMoreFilmsButton').prop('disabled', true)
  }
}

const getBadgets = (data) => {
  badgets = JSON.parse(data.target.response).genres
}

const getMovies = (data) => {
  movies = {}
  movies = JSON.parse(data.target.response).results
  actual_page = 1;
  $('#showMoreFilmsButton').prop('disabled', false)


  const rowFilmes = document.getElementById('rowFilmesLista')

  while(rowFilmes.firstChild) {
    rowFilmes.removeChild(rowFilmes.firstChild);
  }

  showMoreFilms()
}

// iniciando dados

getMovieBadgets(getBadgets)
getMovieData({category: 'popular', getMovies})

// AÇÕES DO USUÁRIO

$("#search_button").click(function (){
  if(search_bar.value !== '') {
    $('html, body').animate({
        scrollTop: $("#scroll_search").offset().top
    }, 10);

    const search_bar = document.getElementById('search_bar')
    getMovieData({search: search_bar.value, getMovies})

    document.getElementById('titulo_categoria').innerHTML = 'Resultado da pesquisa'
  }
});


$('#showMoreFilmsButton').click(function() {
  actual_page++;
  showMoreFilms()
})

$('#dropdown-1').click(function() {
  getMovieData({category: 'popular', getMovies})
  document.getElementById('titulo_categoria').innerHTML = 'Em destaque'
  $('html, body').animate({
    scrollTop: $("#scroll_search").offset().top
}, 10);
})

$('#dropdown-2').click(function() {
  getMovieData({category: 'now_playing', getMovies})
  document.getElementById('titulo_categoria').innerHTML = 'No cinema'
  $('html, body').animate({
    scrollTop: $("#scroll_search").offset().top
}, 10);
})

$('#dropdown-3').click(function() {
  getMovieData({category: 'upcoming', getMovies})
  document.getElementById('titulo_categoria').innerHTML = 'Em breve'
  $('html, body').animate({
    scrollTop: $("#scroll_search").offset().top
}, 10);
})

$('#dropdown-4').click(function() {
  getMovieData({category: 'top_rated', getMovies})
  document.getElementById('titulo_categoria').innerHTML = 'Bem avaliados'
  $('html, body').animate({
    scrollTop: $("#scroll_search").offset().top
}, 10);
})

$('#em-destaque').click(function() {
  $('html, body').animate({
    scrollTop: $("#scroll_search").offset().top
}, 10);
})

$('#avaliacoes').click(function() {
  $('html, body').animate({
    scrollTop: $("#scroll_avaliacoes").offset().top
}, 10);
})

$('#entrevistas').click(function() {
  $('html, body').animate({
    scrollTop: $("#scroll_entrevistas").offset().top
}, 10);
})

$('#novidades').click(function() {
  $('html, body').animate({
    scrollTop: $("#scroll_novidades").offset().top
}, 10);
})

