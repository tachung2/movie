// TMDB getlist

const API_KEY = 'api_key=d339d2e4a1c59c8499dacf75c38da31c';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&'+API_KEY+'&language=ko-KR';
const IMG_URL = 'http://image.tmdb.org/t/p/w500';

const list = document.getElementById('page_list');

getList(API_URL);

function getList(url) {
    fetch(url).then(res => res.json()).then(data => {
        showList(data.results);
    })
}

function showList(data) {
    list.innerHTML = '';

    data.forEach(movie => {
    const {title, poster_path, vote_average} = movie;
    const movieEl = document.createElement('div');
    movieEl.classList.add('movie');
    movieEl.innerHTML = `
    <img src="${IMG_URL+poster_path}" alt="${title}">
        <div class="movie-info">
            <h3>${title}</h3>
            <span class="${getColor(vote_average)}">${vote_average}</span>
        </div>
    `
    list.appendChild(movieEl);
    })
}

function getColor(vote) {
    if(vote>=8) {
        return 'green';
    }else if(vote >= 5) {
        return 'orange';
    }else {
        return 'red';
    }
}