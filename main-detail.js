const API_KEY = "1bd30876d2f827b0c4a0787bb7bca3b3"; // Reemplaza con tu API Key de TMDB
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_URL = "https://image.tmdb.org/t/p/w500";
const YOUTUBE_URL = "https://www.youtube.com/embed/";

// Obtener el ID de la película desde la URL
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get("movieId");
console.log(movieId);


(async function () {
    if (movieId) {
        await getMovieDetails(movieId);
        await getMovieCredits(movieId);
        await getMovieTrailer(movieId);
    }
})();

// Obtobtener los detalles de la película
async function getMovieDetails(movieId) {
    try {
        const response = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=es-ES`);
        const data = await response.json();
        if (!data || data.success === false) {
            console.error("Error en la respuesta de la API:", data.status_message);
            return;
        }
/*        Creamos la varianle del contenetod al que le vamos a agrregar los datos   */
        const fechaLanzamiento = document.getElementById("movie-release-date");
        fechaLanzamiento.innerHTML = ""; // Limpiar antes de agregar
       
        const fechaElemento = document.createElement("p");
             fechaElemento.classList.add("fecha");//crean un elemento 
             fechaElemento.innerHTML = `
             ${data.release_date}
             `;
             fechaLanzamiento.appendChild(fechaElemento);

        /* Mostrar el titulo
        Mostrar la descripción*/

        const sinopsis =document.getElementById("movie-overview");
            sinopsis.innerHTML= "";
            console.log(data.overview);
        const descripcion =document.createElement("span");
            descripcion.classList.add("descripcion_peli");
            descripcion.innerHTML = `
                ${data.overview}
             `;
             sinopsis.appendChild(descripcion);

             console.log( IMAGE_URL+data.poster_path);
             
        /*
        Mostrar la fecha de lanzamiento => OK
        Mostrar los generos ${data.overview} */
        const generos =  document.getElementById("movie-genres").innerText=data.genres?.map(genre=>genre.name);
/*         document.getElementById("movie-poster").src=data.poster_path ? IMAGE_URL + data.poster_path
 */
        const poster = document.getElementById("movie-poster")
            poster.innerHTML= "";
            const imgPoster= document.createElement("div");
            imgPoster.innerHTML=`
            <img src= "${IMAGE_URL+data.poster_path}">
            `;
        poster.appendChild(imgPoster);
        // document.getElementById("movie-genres").innerText = "";

        // data.genres.forEach((genero) => {
           
        //     document.getElementById("movie-genres").innerText = document.getElementById("movie-genres").innerText + genero.name + "," ;

        // })
        
           
            

       /*  Mostrar el porter imagen de la pelicula */
 
    } catch (error) {
        console.error("Error al obtener los detalles:", error);
    }
}

// Obtener el elenco de la película
async function getMovieCredits(movieId) {
    try {
        const response = await fetch(`${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}&language=es-ES`);
        const data = await response.json();

        const actorsContainer = document.getElementById("actors");
        actorsContainer.innerHTML = ""; // Limpiar antes de agregar

        if (!data.cast || data.cast.length === 0) {
            actorsContainer.innerHTML = "<p>No hay información del reparto.</p>";
            return;
        }

        data.cast.slice(0, 10).forEach(actor => { // Mostrar solo los primeros 10 actores
            const actorElement = document.createElement("div");
            actorElement.classList.add("actor");//crean un elemento

            actorElement.innerHTML = `
                <img src="${actor.profile_path ? IMAGE_URL + actor.profile_path : 'https://via.placeholder.com/150'}" alt="${actor.name}">
               
            `;
            actorsContainer.appendChild(actorElement);
        });
    } catch (error) {
        console.error("Error al obtener los actores:", error);
    }
}

// Obtener el tráiler de la película
async function getMovieTrailer(movieId) {
    try {
        const response = await fetch(`${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}&language=es-ES`);
        const data = await response.json();

        const trailerContainer = document.getElementById("trailer-container");
        trailerContainer.innerHTML = ""; // Limpiar antes de agregar

        if (!data.results || data.results.length === 0) {
            trailerContainer.innerHTML = "<p>No hay tráiler disponible.</p>";
            return;
        }

        const trailer = data.results.find(video => video.type === "Trailer" && video.site === "YouTube");
        if (trailer) {
            trailerContainer.innerHTML = `<iframe width="560" height="315" src="${YOUTUBE_URL + trailer.key}" frameborder="0" allowfullscreen></iframe>`;
        } else {
            trailerContainer.innerHTML = "<p>No hay tráiler disponible.</p>";
        }
    } catch (error) {
        console.error("Error al obtener el tráiler:", error);
    }
}
