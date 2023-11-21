
const formCreate = document.querySelector('.formCreate');
formCreate.addEventListener('submit', async (event) => {
  event.preventDefault();

  const inputs = document.querySelectorAll(".inputCreate");
  const data = {};
  for (const input of inputs) {
    const name = input.getAttribute("name");
    const value = input.value;
    data[name] = value;
  }
  console.log(JSON.stringify(data));
  
  fetch('/api/createMovie', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message === 'Movie created.') {
        alert('Movie created successfully!');
      } else {
        alert('Error creating movie: ' + data.msj);
      }
    })
    .catch((error) => {
        console.error('Error sending form data:', error);
      });
});
  