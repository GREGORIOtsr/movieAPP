const form = document.querySelector("form");
const input = document.querySelector("input");
const container= document.getElementById("containerPelicula")
const buttonDetail = document.querySelector(".detail-button")
document.addEventListener('DOMContentLoaded', () => {

form.addEventListener("submit", async (event) => {
  event.preventDefault();
console.log(input.value)
  const request = await fetch("/api/search/:" + input.value, {  
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (request.status === 200) {
    const data = await request.json()
    console.log(data)
    container.innerHTML = "";
    for (const movie of data) {
      console.log(movie.id)
        container.innerHTML += `
        <div>
         <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt='movie poster'>
          <p>${movie.title}</p>
          <a href="/detail/${movie.id}">See more details</a>
        </div>
      `;
    }
  } else {
    alert("Error al buscar películas");
  }
});


// container.addEventListener("click", async (event) => {
//   if (event.target.classList.contains("detail-button")) {
//     const id = event.target.getAttribute("data-id");
//     const request = await fetch(`/api/detail/${id}`);

//     if (request.status === 200) {
//       const movieDetails = await request.json();
//       renderMovieDetails(movieDetails);
//     } else {
//       alert("Error fetching movie details");
//     }
//   }
// });

// function renderMovieDetails(movieDetails) {
//   const genres = movieDetails.genres.join(', ');
//   const detailContainer = document.getElementById("detailContainer")

//   detailContainer.innerHTML = `
//     <div>
//       <img src="https://image.tmdb.org/t/p/w1000/${movieDetails.poster_path}" alt='movie poster'>
//       <h1>${movieDetails.title}</h1>
//       <p>Release: ${movieDetails.release_date}</p>
//       <p>Genre: ${genres}</p>
//       <p>Duration: ${movieDetails.duration}</p>
//       <p>Synopsis: ${movieDetails.synopsis}</p>
//       <p>Rating: ${movieDetails.rating}</p>
//     </div>
//   `;
// }

});