const baseUrl = 'http://localhost:3000/api/v1/';

async function getMovies(){
    try {
        const movies =await fetch(`${baseUrl}movies`);
        const result =await movies.json();
        await console.log(result.data);
        await showMovies(result.data);
    } catch (error) {

        console.error(`Error al obtener las peliculas${error.message}`);
    }
}
getMovies();

function showMovies(movies)  {
    const container =document.getElementById("movies");
    container.innerHTML= "";

    movies.forEach((movie) => {

        const movieElement =document.createElement("div");
        movieElement.innerHTML=`
        <img src= "https://image.tmdb.org/t/p/w500${movie.poster_path}">;
       <h1>${movie.title}</h1>
       <p>Fecha de estreno <br>${movie.release_date}</p>

         `; 

         console.log(movie.title);

         movieElement.addEventListener("click",()=>{
            window.location.href= `detail.html?movieId=${movie.id}`;
            
         })         
         container.appendChild(movieElement);    
    });
   
}
