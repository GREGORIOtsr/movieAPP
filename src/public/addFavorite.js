
document.addEventListener('DOMContentLoaded', function() {
  const addButton = document.querySelector('.button-favorite');
  addButton.addEventListener('click', async function() {
    const movieId = this.getAttribute('data-movie-id');
      try {
          const response = await fetch('/api/addfavorite', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({movie_id: movieId }),
          });
          if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          console.log('Success:', data);
          alert("Movie added to favorite!")
      } catch (error) {
          console.error('Error:', error);
      }
  })

  

})
