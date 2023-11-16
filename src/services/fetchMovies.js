require("dotenv").config();


const apikey = process.env.API_KEY;
console.log(apikey)

const fetchFilm = async (title) => {

    if (!title || typeof title !== 'string') {
        throw new Error("Invalid title provided");
    }
    
    let encodedTitle = encodeURIComponent(title).replace(/%20/g, '+'); //rellena los espacios con + en vez de %20
    const url = `https://api.themoviedb.org/3/search/movie?query=${encodedTitle}&api_key=${apikey}`;
    try {
        const response = await fetch(url);
        const data = await response.json();

        if  (data.results.length === 0) {
            throw new Error("No movies found with the given title");
        }

       return data;

        
    } catch (error) {
        console.error(`ERROR: ${error.stack}`);
        throw error; 
    }
}


module.exports = fetchFilm;