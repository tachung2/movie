// TMDB api 사용
getMovies('https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=d339d2e4a1c59c8499dacf75c38da31c&language=ko-KR&page=1')
// DB라면 "url"을 DB주소로

function getMovies(url) {

    fetch(url).then(res => res.json()).then(data => {
        const movies = []; // movies라는 배열선언
        for (var i = 0; i < 5; i++) {
            movies[i] = data.results[i]; // movies라는 배열에 결과 값을 선언
        }
        showMovies(movies) // 다음 기능에 movies배열을 넘김
    })
}


function showMovies(movies) {
    document.getElementById('main').innerHTML = ''; // getElementById('[id]')로 html에서 main이라는 id 뒤에 개행

    movies.forEach(movies => {
        const { id } = movies; // api post로 날려 message로 받은 'id'라는 값을 무비로부터 받음
        fetch('https://api.themoviedb.org/3/movie/' + id + '/videos?api_key=d339d2e4a1c59c8499dacf75c38da31c&language=ko-KR') // 유튜브 영상 id 가져오는 api post
            .then(res => res.json()) // json파일로 결과를 가져옴
            .then(videoData => { // videoData로 라는 배열로 만듬
                console.log(videoData) // 정상적으로 가져왔는지 배열을 로그로 출력
                if (videoData.results.length > 0) { // 모든 videoData의 배열 갯수가 0보다 클 경우
                    const tr = videoData.results[0].key; // videoData의 배열 첫번째 영상의 id를 tr이라는 상수에 적용
                    console.log(tr); // tr을 로그로 출력
                    const element = document.createElement('div'); // element라는 상수로 div를 만들어냄
                    element.classList.add('swiper-slide'); // element 안에 swiper-slide 라는 클래스를 추가
                    element.innerHTML = `                               
                    <iframe width="1280" height="720" src="https://www.youtube.com/embed/${tr}?enablejsapi=1&rel=0" frameborder="0" allowfullscreen></iframe>
                    ` // element 안에 클래스 밑에 다음 클래스를 추가
                    document.getElementById('main').appendChild(element); // main이라는 id에 element 안에 있는 것 중에 중복 되는 경우 추가 안 하고 중복이 안 되면 추가한다.
                }
            })
    })
}