require("dotenv").config();

const apikey = process.env.API_KEY;

const fetchMovie = async (title) => {

    // if (!title || typeof title !== 'string') {
    //     throw new Error("Invalid title provided");
    // }
    
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apikey}&query=${title}`;
    try {
        const response = await fetch(url);
        const data = await response.json();

        // if  (data.results.length === 0) {
        //     throw new Error("No movies found with the given title");
        // }

       return data.results[0];
       
    } catch (error) {
        console.error(`ERROR: ${error.stack}`);
        throw error; 
    }
}

module.exports = {fetchMovie};

//fetchMovieDetail
// const fetchMovieDetail = async (title) => {

//     if (!title || typeof title !== 'string') {
//         throw new Error("Invalid title provided");
//     }
    
//     let encodedTitle = encodeURIComponent(title).replace(/%20/g, '+'); //rellena los espacios con + en vez de %20
//     const url = `https://api.themoviedb.org/3/movie${encodedTitle}?api_key=${apikey}`;
//     try {
//         const response = await fetch(url);
//         const data = await response.json();

//         if  (data.results.length === 0) {
//             throw new Error("No movies found with the given title");
//         }

//        return data;

        
//     } catch (error) {
//         console.error(`ERROR: ${error.stack}`);
//         throw error; 
//     }
// }


