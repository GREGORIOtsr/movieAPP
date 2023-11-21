const formEdit = document.querySelector('.formEdit');
formCreate.addEventListener('submit', async (event) => {
  event.preventDefault();

  const objeto = Object.fromEntries(document.querySelectorAll("inputEdit").map(input => [input.name, input.value]));


  fetch('/api/editMovie', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(objeto),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message === 'Movie edited.') {
        alert('Movie edited successfully!');
      } else {
        alert('Error editing movie: ' + data.msj);
      }
    })
    .catch((error) => {
      console.error('Error sending form data:', error);
    });
});
