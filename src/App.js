import React, { useEffect, useState } from "react";
import Movie from './components/Movie';
import logo from './logo.png';
require('dotenv').config()

//const API_KEY = process.env.REACT_APP_API_KEY;
const API_KEY = "04c35731a5ee918f014970082a0088b1";

const FEATURED_API = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key="+API_KEY+"&page=1";
const SEARCH_API = "https://api.themoviedb.org/3/search/movie?&api_key="+API_KEY+"&query=";

function App() {
  const [ movies, setMovies ] = useState([]);
  const [ searchTerm, setSearchTerm] = useState('');
  console.log(logo);

  useEffect(async () => {
    getMovies(FEATURED_API);
  }, []);

  const getMovies = (API) => {
    fetch(API).then((res) => res.json())
    .then((data) => {
      console.log(data.results);
      setMovies(data.results);
    });
  }

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if(searchTerm){
      getMovies(SEARCH_API + searchTerm);
      setSearchTerm('');
    }
  };

  const handleOnChange = (e) => {    
    setSearchTerm(e.target.value);
  };


  return (
    <>
    <header>
      <div> <a href="www.thedeval.com" target="_blank"> <img src={logo} height="50px" className="logo"> </img> </a></div>
        <div className="title">Movie Database</div>
        <form onSubmit={handleOnSubmit}>
          <input type="text" placeholder="Search..." className="search" value={searchTerm} onChange={handleOnChange} />
        </form>
    </header>

    <div className="movie-container" >
      {(movies != null && movies.length > 0) ? movies.map((movie) => (
        <Movie key={movie.id} {...movie}  />
      )) : <div> no data </div> }
    </div>
    </>
  );
}

export default App;
