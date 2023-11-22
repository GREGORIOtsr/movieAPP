//////////FAV///////////

const button = document.querySelector(".button-favorite");
button.addEventListener("click", () => {
  const id = window.location.href.match(/detail\/(\d+)/)[1];
  const data = {
    "id": id
  };
  fetch("api/addfavorite", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(response => {
      if (response.status === 200) {
        button.classList.add("is-active");
      } else {
        button.classList.remove("is-active");
      }
    })
    .catch(error => {
      console.log(error);
    });
});
