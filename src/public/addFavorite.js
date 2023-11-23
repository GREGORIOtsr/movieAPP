
document.addEventListener('DOMContentLoaded', function() {
  const addButton = document.querySelector('.button-favorite');
  addButton.addEventListener('click', function() {
    const movieId = this.getAttribute('data-movie-id');
    fetch('/api/addfavorite', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        movie_id: movieId })
    })
    .then(response => response.json())
    .then(data => {
      console.log(data); 
    })
    .catch(error => console.error('Error:', error));
  });
});
