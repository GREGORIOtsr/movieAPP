
const containerFavs = document.getElementById("peliFav")

document.addEventListener('DOMContentLoaded', function() {
    const showButton = document.querySelector('showfavs');
    showButton.addEventListener('click', async function() {
        try {
            const response = await fetch('/api/userfavorites', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            containerFavs.innerHTML=""
            const data = await response.json();

            containerFavs.innerHTML+=data
            
            console.log('Success:', data);
        } catch (error) {
            console.error('Error:', error);
        }
    })
  })