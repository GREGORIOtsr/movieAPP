
const formEdit = document.querySelector('.formEdit');
formEdit.addEventListener('submit', async (event) => {

  event.preventDefault();

  const inputs = document.querySelectorAll(".inputEdit");
  const data = {};
  for (const input of inputs) {
    const name = input.getAttribute("name");
    const value = input.value;
    data[name] = value;
  }
  console.log(JSON.stringify(data));
  
  fetch('/api/editMovie', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
   if (data.message === 'Movie updated.') {
    alert('Movie edited successfully!');
    document.querySelector('.formEdit').reset()
} else {
    alert('Error editing movie: ' + data.message);
}
    })
    .catch((error) => {
        console.error('Error sending form data:', error);
      });
});
  