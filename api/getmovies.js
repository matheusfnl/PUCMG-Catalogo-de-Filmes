export default function getMovieData({id, category = false, getMovies, search = false}) {
  let url;

  
  if(!category && !search) {
    url = `https://api.themoviedb.org/3/movie/${id}?api_key=5d804c54e8818ba8264ff5b3bee938e3&language=pt-BR`;
  }
  else if(category && !search){
    url = `https://api.themoviedb.org/3/movie/${category}?api_key=5d804c54e8818ba8264ff5b3bee938e3&language=pt-BR`
  }
  else {
    url = `https://api.themoviedb.org/3/search/movie?api_key=5d804c54e8818ba8264ff5b3bee938e3&query=${search}"`
  }

  let xhr = new XMLHttpRequest();
  xhr.onload = getMovies
  xhr.open('GET', url, false)
  xhr.send();
}
