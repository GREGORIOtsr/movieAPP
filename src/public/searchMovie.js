

const form = document.querySelector("form");
const input = document.querySelector("input");
const container = document.getElementById("containerPelicula");
const buttonDetail = document.querySelector(".detail-button");

///////SEARCH/////
document.addEventListener("DOMContentLoaded", () => {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const searchRequest = await fetch("/api/search/:" + input.value, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    });

    if (searchRequest.status === 200) {
      const movies = await searchRequest.json();
      container.innerHTML = "";

      for (const movie of movies) {
        try {
          const movieDetailsResponse = await fetch(`/api/detail/${movie.id}`);
          const creditsResponse = await fetch(`/api/credits/${movie.id}`);

          if (!movieDetailsResponse.ok || !creditsResponse.ok) {
            throw new Error('Error fetching movie details or credits');
          }

          const movieDetails = await movieDetailsResponse.json();
          const credits = await creditsResponse.json();

          console.log(movieDetails)
          console.log(credits)

          const director = credits.crew.find(person => person.job === 'Director');
          const directorName = director ? director.name : 'Director no encontrado';
          container.innerHTML += `
            <div>
              <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt='movie poster'>
              <p>${movie.title}</p>
              <p>${movie.release_date}</p>
              <p>${directorName}</p>
              <p>${movieDetails.genres.map(genre => genre.name).join(', ')}</p>
              <p>${movieDetails.runtime} minutes</p>
              <a class="adetails" href="/detail/${movie.id}">See more details</a>
            </div>
          `;
        } catch (error) {
          console.error(`Error fetching movie details for movie ID ${movie.id}: ${error}`);
        }
      }
    } else {
      alert("Error al buscar películas");
    }
  });
});














