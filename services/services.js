import axios from 'axios';

const apiUrl = 'https://api.themoviedb.org/3';
const apiKey = `api_key=${process.env.EXPO_PUBLIC_TMDB_API_KEY}`;

export const getPopularMovies = async () => {
  const resp = await axios.get(`${apiUrl}/movie/popular?${apiKey}`);
  return resp.data.results;
};

export const getUpcomingMovies = async () => {
  const resp = await axios.get(`${apiUrl}/movie/upcoming?${apiKey}`);
  return resp.data.results;
};

export const getPopularTv = async () => {
  const resp = await axios.get(`${apiUrl}/tv/popular?${apiKey}`);
  return resp.data.results;
};

export const getFamilyMovies = async () => {
  const resp = await axios.get(
    `${apiUrl}/discover/movie?${apiKey}&with_genres=10751`,
  );
  return resp.data.results;
};

export const getDocumentaryMovies = async () => {
  const resp = await axios.get(
    `${apiUrl}/discover/movie?${apiKey}&with_genres=99`,
  );
  return resp.data.results;
};

export const getMovie = async id => {
  const resp = await axios.get(`${apiUrl}/movie/${id}?${apiKey}`);
  return resp.data;
};

export const getTv = async id => {
  const resp = await axios.get(`${apiUrl}/tv/${id}?${apiKey}`);
  return resp.data;
};

export const searchMovie = async query => {
  const resp = await axios.get(
    `${apiUrl}/search/movie?${apiKey}&query=${query}`,
  );
  return resp.data.results;
};
