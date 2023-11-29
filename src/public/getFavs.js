const containerFavs = document.getElementById("pelisFavs");

document.addEventListener('DOMContentLoaded', function() {
    const showButton = document.getElementById('showfavs'); 
    showButton.addEventListener('click', async function() {
        try {
            const response = await fetch('/api/userfavorites', {
                method: 'GET', 
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            containerFavs.innerHTML = "";
            for (const fav of data) { 
                const responseDetail = await fetch(`/api/detail/${fav.movie_id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!responseDetail.ok) {
                    throw new Error(`HTTP error! status: ${responseDetail.status}`);
                }

                const dataDetail = await responseDetail.json();
                const favElement = document.createElement('div');
                favElement.classList.add('favorite-item'); 

                favElement.innerHTML = `
                    <div id="favcard">
                        <img src="https://image.tmdb.org/t/p/w500${dataDetail.poster_path}" alt="Poster">
                        <div id="textfav">
                            <p>ID de la Película: <a href="/detail/${fav.movie_id}">${fav.movie_id}</a></p>
                            <p>${dataDetail.title}</p>
                            <p>${dataDetail.release_date}</p>
                            <button id=botonRemoveFavs type="button" class="button-remove" data-movie-id=${fav.movie_id}> Remove from Favorites</button>
                        </div>
                    </div>
                `;
                containerFavs.appendChild(favElement);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });

    containerFavs.addEventListener('click', async function(event) {
        if (event.target.classList.contains('button-remove')) {
            const movieId = event.target.getAttribute('data-movie-id');
    
            try {
                const response = await fetch(`/api/removefavorite/${movieId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                   
                    body: JSON.stringify({ movie_id: movieId }),
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                console.log('Success:', data);
                alert("Movie removed from favorites!");
    
               
                event.target.closest('.favorite-item').remove();
            } catch (error) {
                console.error('Error:', error);
            }
        }
    });
    













});