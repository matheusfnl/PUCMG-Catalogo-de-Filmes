
export default function getMovieBadgets(getBadgets) {
  let url = 'https://api.themoviedb.org/3/genre/movie/list?api_key=5d804c54e8818ba8264ff5b3bee938e3';

  let xhr = new XMLHttpRequest();
  xhr.onload = getBadgets
  xhr.open('GET', url, false)
  xhr.send();
}