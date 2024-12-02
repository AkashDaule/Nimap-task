import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import "./SearchMovies.css";

const SearchMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); 
  const query = new URLSearchParams(useLocation().search).get("query");  URL
  const itemsPerPage = 8; 

  const fetchMovies = async (query, page) => {
    const Api_key = "c45a857c193f6302f2b5061c3b85e743";
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${Api_key}&language=en-US&query=${query}&page=${page}`;

    try {
      setLoading(true);
      const response = await fetch(url);
      const data = await response.json();
      setMovies(data.results); 
      setTotalPages(data.total_pages); 
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query) {
      fetchMovies(query, currentPage); 
    }
  }, [query, currentPage]);

 
  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const pageNumbers = [];
  const maxPagesToShow = 5;

  let startPage = Math.max(currentPage - Math.floor(maxPagesToShow / 2), 1);
  let endPage = startPage + maxPagesToShow - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(endPage - maxPagesToShow + 1, 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

 
  const displayedMovies = movies.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loader">Loading...</div>
      </div>
    );
  }

  return (
    <div className="movie-container">
      <div className="movie-grid">
        {displayedMovies.length > 0 ? (
          displayedMovies.map((movie) => (
            <div key={movie.id} className="movie-card mt-3">
              <Link to={`/movie/${movie.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="movie-poster"
                />
              </Link>
              <h3 className="movie-title">{movie.title}</h3>
              <p className="movie-rating">Rating: {movie.vote_average}</p>
            </div>
          ))
        ) : (
          <p>No movies found for "{query}"</p>
        )}
      </div>


      <div className="pagination">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="page-button"
        >
          &laquo; Previous
        </button>

        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => paginate(number)}
            className={currentPage === number ? "page-button active" : "page-button"}
          >
            {number}
          </button>
        ))}

        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="page-button"
        >
          Next &raquo;
        </button>
      </div>
    </div>
  );
};

export default SearchMovies;
