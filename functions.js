//urls para cada tipo de requisição
const base_url = 'https://api.themoviedb.org/3';
const api_key = 'api_key=506fadb0256c13349acc05dabebf9604';
const api_url = base_url+"/discover/movie?sort_by=popularity.desc&language=pt-br&" + api_key;
const url_img = 'https://image.tmdb.org/t/p/w500';
const search_url = base_url + '/search/movie?' + api_key;
const movie_url = base_url + '/movie/popular?' + api_key + '&language=pt-br&page=4'
const series_url = base_url + '/tv/popular?' + api_key + '&language=pt-br&page=3'
const top_rated_url = base_url + '/movie/top_rated?' + api_key + '&language=pt-br&page=5'
const url_recomendations = base_url + '/movie/140/recommendations?' + api_key + '&language=pt-br&page=1'

//Elementos HTML
const form = document.querySelector('#form');
const search = document.querySelector('.search');
const container = document.querySelector('.container');
const section_banner = document.querySelector('.section-banner');
const menu_items = document.querySelectorAll('header .menu a')
const moviesElement = document.querySelectorAll('.container .movie')
const icon_menu = document.querySelector('.icon-menu img')
const menu_mobile = document.querySelector('.menu-mobile')
const body = document.querySelector('body')


//variáveis para o slide do banner
let images = document.querySelectorAll('.banner-single');
let index = 0;
let indexMax = images.length;
let dots_slide = document.querySelectorAll('.wraper-dots .dots')


function menuMobile(){
   icon_menu.addEventListener('click',()=>{
      menu_mobile.style.setProperty('left','0')
   })

   body.addEventListener('click',()=>{
      if(getComputedStyle(menu_mobile).left == '0px'){
          menu_mobile.style.setProperty('left','-200px')
      }
  })

}menuMobile()


function getMovies(url){
  fetch(url).then((response) => response.json()).then((movies)=>{
    showMovies(movies.results)
  })
}getMovies(api_url)


function defineContentPage(){
    if(location.href == 'https://allanc12.github.io/The-best-movies/index.html'){
      getMovies(api_url)
    }else if(location.href == 'https://allanc12.github.io/The-best-movies/fimes.html'){
      getMovies(movie_url)
    }else if(location.href == 'https://allanc12.github.io/The-best-movies/series.html'){
      getMovies(series_url)
    }else if(location.href == 'https://allanc12.github.io/The-best-movies/topRated.html'){
      getMovies(top_rated_url)
    }else if(location.href == 'https://allanc12.github.io/The-best-movies/recomendations.html'){
      getMovies(url_recomendations)
    }else if(location.href == 'https://allanc12.github.io/The-best-movies/results.html'){
      getMovies(search_url + '&query='+ localStorage.getItem('search'))
    }
}defineContentPage()


function showMovies(movies){
  container.innerHTML = ''
    movies.forEach((movie)=>{
      
      let movieEl = document.createElement('div');
      movieEl.classList.add('movie');
      const {poster_path,overview,title,vote_average,name,release_date,id} = movie
      
      movieEl.innerHTML = `
      <div class="movie-img">
      <img src="${url_img+poster_path}" alt="">
      <div class="description">
      <p>${overview}</p>
      </div>
      </div>
      
      <div class="footer-movie">
      <h1>${title || name}</h1>
      <h3 class="${getColor(vote_average)}">${vote_average}</h3>
      </div>
      <span style="display:none;" class="launch-date">${release_date}</span>
      <span style="display:none;" class="movie_id">${id}</span>
      `
      container.append(movieEl)
    })
    
  }
  
  
function showAboutMovie(){
    setTimeout(()=>{
      let boxFilm = document.querySelectorAll('.movie')
      
      for(let i = 0; i < boxFilm.length; i++){

            let adressImage = boxFilm[i].children[0].children[0].src
            let titleFilm = boxFilm[i].children[1].children[0].innerText
            let sinopseFilm = boxFilm[i].children[0].children[1].children[0].innerText
            let averageVote = boxFilm[i].children[1].children[1].innerText
            let launch = boxFilm[i].children[2].innerText
            let id= boxFilm[i].children[3].innerText
        
            boxFilm[i].addEventListener('click',()=>{
                location.href = "about.html"
                localStorage.setItem('image',adressImage)
                localStorage.setItem('title',titleFilm)
                localStorage.setItem('description',sinopseFilm)
                localStorage.setItem('vote',averageVote)
                localStorage.setItem('launch',launch)
                localStorage.setItem('id',id)

            })
        }
        
    },100)
            
}showAboutMovie()
          
          
          
function getColor(vote){
    if(vote >= 7){
      return 'green';
    }else if(vote >= 5){
      return 'yellow';
    }else{
      return 'red';
    }
}

          
function searchMovie(){
    let searchTerm = search.value;
    
    if(searchTerm){
      localStorage.setItem('search',searchTerm) 
      location.href = 'https://allanc12.github.io/The-best-movies/results.html'
    }
    
  } 
  
form.addEventListener('submit',(e)=>{
     e.preventDefault()
    searchMovie()
})



function initSlideHome(){
  images[index].classList.remove('selected')
  dots_slide[index].style.backgroundColor = "transparent"
  index++
  if(index == indexMax) index = 0;
  images[index].classList.add('selected')
  dots_slide[index].style.backgroundColor = "#ccc"
}


function startSlideHome(){
  intervalSlide = setInterval(()=>{
    initSlideHome()
  },3000)
}startSlideHome()


function pauseSlideHome(){
  for(let i = 0;i< dots_slide.length; i++){
    
    dots_slide[i].addEventListener('mouseover',()=>{
      clearInterval(intervalSlide)
    })
    
    dots_slide[i].addEventListener('mouseout',()=>{
      startSlideHome()
    })
    
  }
  
}pauseSlideHome()
