import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function MovieInfo() {
  const { imdbID } = useParams(); 

  const [movieData, setMovieData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const ApiKey = "7a21b0a7";
    fetch(`https://www.omdbapi.com/?apikey=${ApiKey}&i=${imdbID}`)
      .then((response) => response.json())
      .then((data) => {
        setMovieData(data); 
        setIsLoading(false); 
      })
      .catch((error) => {
        setIsLoading(false); 
        setError(error); 
      });
  }, [imdbID]); 

  
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (!movieData) {
    return null;
  }

  return (
    <div className="movie-data">
      <div className="data">
      <a href="/">
        <h1 className="">Movie App</h1>
      </a>
        <h2>Titile : {movieData.Title}</h2>
        <img src={movieData.Poster} alt={movieData.Title} />
      </div>
      <p>Year : {movieData.Year}</p>
      <p>Type : {movieData.Type}</p>
      <p>Directed by : {movieData.Director}</p>
      <p>IMDB rating : {movieData.imdbRating}</p>
      <p>Discription :{movieData.Plot}</p>
    </div>
  );
}

export default MovieInfo;
