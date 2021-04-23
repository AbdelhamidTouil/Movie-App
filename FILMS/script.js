
const API_KEY = 'api_key=ea551bd2ce60768abd9bf79c53a90251';//API Key (v3 auth)
const BASE_URL = 'https://api.themoviedb.org/3';//Example API Request
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&'+API_KEY; //Discover API Examples

const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL + '/search/movie?'+API_KEY;


const main = document.getElementById('main'); // recuperation de #main
const form =  document.getElementById('form'); // recuperation de #form
const search = document.getElementById('search'); // recuperation de #search


getMovies(API_URL); 
 
// this function for get films
function getMovies(url) {

    fetch(url).then(res => res.json()).then(data => {
        console.log(data.results)
        if(data.results.length !== 0){
            showMovies(data.results);
        }else{
            main.innerHTML= `<h1 class="no-results">No Results Found</h1>`
        }
       
    })

}
// end get Movie


// this function for show films
function showMovies(data) {
    main.innerHTML = '';

    data.forEach(movie => {
        const {title, poster_path, vote_average, overview} = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
             <img src="${poster_path? IMG_URL+poster_path: "http://via.placeholder.com/1080x1580" }" alt="${title}">

            <div class="overview">

                <h3>Overview</h3>
                ${overview}
            </div>
        
        `

        main.appendChild(movieEl);
    })
}

// end  showMovies

// for serches
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchTerm = search.value;
    selectedGenre=[];
   
    if(searchTerm) {
        getMovies(searchURL+'&query='+searchTerm)
    }else{
        getMovies(API_URL);
    }

})