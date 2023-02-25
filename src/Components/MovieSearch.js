import React, { useState } from "react";
import { Link } from "react-router-dom";

const MovieSearch = () => {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const handleInputChange = (event) => {
    setSearch(event.target.value);
  };
  const handleSearchClick = () => {
     if (search === "") {
       alert("Please enter a movie title");
       return;
     }
    setIsLoading(true);
    const apiKey = "7a21b0a7";
    fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${search}`)
      .then((response) => response.json())
      .then((data) => {
      if (data.Response === "False") {
        alert("please enter valid Movie Title")
      } else {
        setSearchResults(data.Search);
        setIsLoading(false);
  }
})
      .catch((error) => {
        console.error(error);
        setSearchResults([]);
        setIsLoading(false);
      });
  };
  return (
    <div className="movie-search">
      <a href="/">
        <h1 className="heading">Movie App</h1>
      </a>
      <div className="search-container">
        <p className="title">Search For Movies By Their Title</p>
        <input
          className="search-input"
          placeholder="Search"
          type="text"
          value={search}
          onChange={handleInputChange}
        />
      </div>
      <button className="btn" onClick={handleSearchClick}>
        Search
      </button>
       
        <div className="App">
          {searchResults.map((movie) => (
            <div key={movie.imdbID}>
              <img src={movie.Poster} alt={movie.Title} />
              <p>Year : {movie.Year}</p>
              <p>Titile : {movie.Title}</p>
              <p>Type : {movie.Type}</p>
              <Link to={`/moviedetails/${movie.imdbID}`}>
                <button className="btn1">More details</button>
              </Link>
            </div>
          ))}
        </div>
      
    </div>
  );
};

export default MovieSearch;
