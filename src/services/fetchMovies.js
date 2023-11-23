require("dotenv").config();

const apikey = process.env.API_KEY;

const fetchMovie = async (title) => {
  if (!title || typeof title !== "string") {
    throw new Error("Invalid title provided");
  }

  const url = `https://api.themoviedb.org/3/search/movie?api_key=${apikey}&query=${title}`;
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.results.length === 0) {
      throw new Error("No movies found with the given title");
    }

    return data.results;
  } catch (error) {
    console.error(`ERROR: ${error.stack}`);
    throw error;
  }
};

const fetchMovieDetail = async (id) => {
  if (!id || typeof id !== "number") {
    throw new Error("Invalid ID provided");
  }

  const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apikey}`;
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!data || Object.keys(data).length === 0) {
      throw new Error("No movies found with the given ID");
    }

    return data;
  } catch (error) {
    console.error(`ERROR: ${error.stack}`);
    throw error;
  }
};

const fetchCredits = async (id) => {
  if (!id || typeof id !== "number") {
    throw new Error("Invalid ID provided");
  }

  const url = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apikey}`;
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!data || Object.keys(data).length === 0) {
      throw new Error("No movies found with the given ID");
    }

    return data;
  } catch (error) {
    console.error(`ERROR: ${error.stack}`);
    throw error;
  }
};

const fetchTrailer =  async (id) => {
  if (!id || typeof id !== "number") {
    throw new Error("Invalid ID provided");
  }

  const url = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apikey}`;
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!data || Object.keys(data).length === 0) {
      throw new Error("No movies found with the given ID");
    }

    return data;
  } catch (error) {
    console.error(`ERROR: ${error.stack}`);
    throw error;
  }
};


module.exports = { fetchMovie, fetchMovieDetail, fetchCredits, fetchTrailer };
