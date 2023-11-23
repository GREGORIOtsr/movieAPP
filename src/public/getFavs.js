// Este debe ser "pelisFavs", no "peliFav"
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
            console.log(data);

            containerFavs.innerHTML = "";
            data.forEach(fav => {
                const favElement = document.createElement('div');
                favElement.classList.add('favorite-item'); 
                favElement.innerHTML = 
                `<div id=favcard>
                    <p>ID de la Película: <a href="/detail/${fav.movie_id}">${fav.movie_id}</a></p>
                </div>
                `;
                containerFavs.appendChild(favElement);
            })
        } catch (error) {
            console.error('Error:', error);
        }
    });
});
