//////////FAV///////////

const button = document.querySelector(".button-favorite");

const sendFav = (user_id, ) => {
  const token = Cookies.get("token");

  const request = new Request("/api/addfav", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      user_id,
      movie_id,
    }),
  });

  fetch(request)
    .then((response) => {
      if (response.ok) {
        console.log("Fav added successfully");
      } else {
        console.log("Error adding fav");
      }
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
};

const addFavorite = (email) => {
 
  favoritesAPIController.createFav(email, id);
};

button.addEventListener("click", () => {
  sendFav(id, email);
});