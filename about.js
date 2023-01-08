const containerAbout = document.querySelector('.container-about')
const id = localStorage.getItem('id')
const url_movies = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=506fadb0256c13349acc05dabebf9604&language=en-US`
const url_youtube = 'https://www.youtube.com/embed/'
let keyVideo = []

function getVideoApi(url){
    fetch(url).then(response => response.json()).then(videos=>{
        var response = videos
        getKey(response.results[0])})
        
    }getVideoApi(url_movies)
    

function getKey(resultVideo){
        keyVideo.push(resultVideo.key)
        contentHtmlPage(url_youtube+keyVideo[0]);
        
 }


function contentHtmlPage(adress){
    let about_movie = document.createElement('section')
    about_movie.classList.add('about-movie')

    about_movie.innerHTML = `
    <aside class="about">
        <div class="banner-about" style="background-image:url('${localStorage.getItem('image')}');"></div>

            <div class="content-about">
                <h2>Informações do vídeo</h2>
                <h1>Título original:</h1> <p>${localStorage.getItem('title')}</p>
                <h1>Lançamento:</h1> <p>${localStorage.getItem('launch')}</p>
                <h1>Avaliação:</h1> <p>${localStorage.getItem('vote')}</p>
            </div>
    </aside> 

    <div class="box-trailer">
         <div class="trailer"><iframe src="${adress}"></iframe></div>
        <p>${localStorage.getItem('description')}</p>     
    </div>
    `

    containerAbout.prepend(about_movie)
}


 

 

