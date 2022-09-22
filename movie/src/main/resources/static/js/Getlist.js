// TMDB getlist

const API_KEY = 'api_key=d339d2e4a1c59c8499dacf75c38da31c';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&'+API_KEY+'&language=ko-KR';
const IMG_URL = 'http://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL + '/search/movie?' + API_KEY;

const genres = [
    {
        "id": 28,
        "name": "액션"
    },
    {
        "id": 12,
        "name": "어드밴처"
    },
    {
        "id": 16,
        "name": "애니메이션"
    },
    {
        "id": 35,
        "name": "코믹"
    },
    {
        "id": 80,
        "name": "범죄"
    },
    {
        "id": 99,
        "name": "다큐멘터리"
    },
    {
        "id": 18,
        "name": "드라마"
    },
    {
        "id": 10751,
        "name": "가족"
    },
    {
        "id": 14,
        "name": "판타지"
    },
    {
        "id": 36,
        "name": "역사"
    },
    {
        "id": 27,
        "name": "공포"
    },
    {
        "id": 10402,
        "name": "음악"
    },
    {
        "id": 9648,
        "name": "미스터디"
    },
    {
        "id": 10749,
        "name": "로맨스"
    },
    {
        "id": 878,
        "name": "SF"
    },
    {
        "id": 10770,
        "name": "TV"
    },
    {
        "id": 53,
        "name": "스릴러"
    },
    {
        "id": 10752,
        "name": "전쟁"
    },
    {
        "id": 37,
        "name": "서부"
    }
]

const list = document.getElementById('page_list');
const form = document.getElementById('form');
const search = document.getElementById('search');
const tagsEl = document.getElementById('tags');

const prev = document.getElementById('prev')
const next = document.getElementById('next')
const current = document.getElementById('current')

var currentPage = 1;
var nextPage = 2;
var prevPage = 3;
var lastUrl = "";
var totalPages = 100;

var selectedGenre = []
setGenres();
function setGenres() {
    tagsEl.innerHTML = '';
    genres.forEach(genre => {
        const genremovie = document.createElement('div');
        genremovie.classList.add('tag');
        genremovie.id=genre.id;
        genremovie.innerText = genre.name;
        genremovie.addEventListener('click', () => {
            if(selectedGenre.length == 0){
                selectedGenre.push(genre.id);
            }else{
                if(selectedGenre.includes(genre.id)){
                    selectedGenre.forEach((id, idx) => {
                      if(id == genre.id) {
                          selectedGenre.splice(idx, 1);
                      }
                    })
                }else {
                    selectedGenre.push(genre.id);
                }
            }
            getList(API_URL + '&with_genres=' + encodeURI(selectedGenre.join(',') + '&language=ko-KR'))
            highlightSelection()
        })
        tagsEl.append(genremovie);
    })
}

function highlightSelection() {
    const tags = document.querySelectorAll('.tag');
    tags.forEach(tag => {
        tag.classList.remove('highlight')
    })
    clearBtn();
    if(selectedGenre.length != 0) {
        selectedGenre.forEach(id => {
            const highlightedTag = document.getElementById(id);
            highlightedTag.classList.add('highlight');
        })
    }else {
        let clear = document.getElementById('clear');
        clear.remove();
    }
}

function clearBtn() {
    let clearBtn = document.getElementById('clear');
    if(clearBtn){
        clearBtn.classList.add('highlight')
    }else {
        let clear = document.createElement('div');
        clear.classList.add('tag', 'highlight');
        clear.id = 'clear';
        clear.innerText = 'X';
        clear.addEventListener('click', () => {
            selectedGenre = [];
            setGenres();
            getList(API_URL);
        })
        tagsEl.append(clear);
    }
}


getList(API_URL);

function getList(url) {
    lastUrl = url;
    fetch(url).then(res => res.json()).then(data => {
        if(data.results.length !== 0) {
            showList(data.results);
            currentPage = data.page;
            nextPage = currentPage + 1;
            prevPage = currentPage - 1;
            totalPages = data.total_pages;

            current.innerText = currentPage;
            if(currentPage <= 1){
                prev.classList.add('disabled');
                next.classList.remove('disabled');
            }else if(currentPage >= totalPages){
                prev.classList.remove('disabled');
                next.classList.add('disabled');
            }else{
                prev.classList.remove('disabled');
                next.classList.remove('disabled');
            }


        }else {
            list.innerHTML= `<h1 class="no_result">결과가 없습니다.</h1>`
        }
    })
}

function showList(data) {
    list.innerHTML = '';

    data.forEach(movie => {
    const {title, poster_path, vote_average} = movie;
    const movieEl = document.createElement('div');
    movieEl.classList.add('movie');
    movieEl.innerHTML = `
    <img src="${poster_path? IMG_URL+poster_path: "http://via.placeholder.com/1080x1500"}" alt="${title}">
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

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchTerm = search.value;
    selectedGenre=[];
    setGenres();
    if(searchTerm) {
        getList(searchURL+'&query='+searchTerm+'&language=ko-KR')
    } else {
        getList(API_URL);
    }
})

prev.addEventListener('click', () => {
    if(prevPage > 0){
        pageCall(prevPage);
    }
})

next.addEventListener('click', () => {
    if(nextPage <= totalPages) {
        pageCall(nextPage);
    }
})

function pageCall(page) {
    let urlSplit = lastUrl.split('?');
    let queryParams = urlSplit[1].split('&');
    let key = queryParams[queryParams.length -1].split('=');
    if(key[0] != 'page'){
        let url = lastUrl + '&page='+page
        getList(url);
    }else{
        key[1] = page.toString();
        let a = key.join('=');
        queryParams[queryParams.length -1] = a;
        let b = queryParams.join('&');
        let url = urlSplit[0] +'?'+ b
        getList(url);
    }
}