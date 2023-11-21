const form = document.querySelector("form");
const input = document.querySelector("input");
const container = document.getElementById("containerPelicula");
const buttonDetail = document.querySelector(".detail-button");

///////SEARCH/////
document.addEventListener("DOMContentLoaded", () => {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    console.log(input.value);
    const request = await fetch("/api/search/:" + input.value, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (request.status === 200) {
      const data = await request.json();
      console.log(data);
      container.innerHTML = "";
      for (const movie of data) {
        console.log(movie.id);
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

})
////////////////////CREATE////////////////////////

// const create = document.querySelector(".formCreate");

// create.addEventListener("submit", async (event) => {

//   event.preventDefault();

//   const inputTitle = document.querySelector("#title")
//   const inputGenres = document.querySelector("#genres")
//   const inputImage = document.querySelector("#image")
//   const inputDuration = document.querySelector("#duration")
//   const inputSynopsis = document.querySelector("#synopsis")
//   const inputDirector = document.querySelector("#director")
//   const inputActors = document.querySelector("#actors")

//   console.log(inputTitle)

//   const title = inputTitle.value;
//   const genres = inputGenres.value;
//   const image = inputImage.value;
//   const duration= inputDuration.value
//   const synopsis = inputSynopsis.value;
//   const director = inputDirector.value;
//   const actors = inputActors.value;

//   console.log(title)
 
//   const movieData = {
//     title,
//     genres,
//     image,
//     duration,
//     synopsis,
//     director,
//     actors
//   };

//   try {
//     const request = await fetch("/api/createMovie", {
//       method: "POST",
//       body: JSON(movieData), 
//     });
//     if (request.status === 201) {
      
//       const data = await request.json();
//       console.log("Movie created successfully:", data);
//     } else {
//       throw new Error("Error creating movie"); 
//     }
//   } catch (error) {
//     console.error("Error creating movie:", error); 
//     alert("Error al crear películas"); 
// };
// });













