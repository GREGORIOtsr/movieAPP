const form = document.querySelector("form");
const input = document.querySelector("input");
const container= document.getElementById("containerPelicula")

form.addEventListener("submit", async (event) => {
  event.preventDefault();
console.log(input.value)
  const request = await fetch("api/search/:" + input.value, {  
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
        container.innerHTML += `
        <div>
         <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt='movie poster'
          <p>${movie.title}</p>
          <button type="button"> See more details</button>      
        </div>
      `;
    }
  } else {
    alert("Error al buscar películas");
  }
});