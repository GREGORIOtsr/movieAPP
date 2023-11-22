const form = document.querySelector("form");
const input = document.querySelector("input");
const container = document.getElementById("containerPelicula");
const buttonDetail = document.querySelector(".detail-button");

///////SEARCH/////
document.addEventListener("DOMContentLoaded", () => {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const request = await fetch("/api/search/:" + input.value, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (request.status === 200) {
      const data = await request.json();
      container.innerHTML = "";
   
      for (const movie of data) {
        let detailLink;
        if (movie._id) {
          detailLink = `/detail/${movie._id}`;
        } else {
          detailLink = `/detail/${movie.id}`;
        }

        container.innerHTML += `
        <div>
         <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt='movie poster'>
          <p>${movie.title}</p>
          <a href="${detailLink}">See more details</a>
        </div>
      `
      console.log(movie.poster_path);
      }
    } else {
      alert("Error al buscar películas");
    }
  });

})















