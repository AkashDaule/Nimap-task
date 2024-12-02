// features/movies/Upcoming.jsx
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUpcomingMoviesThunk, setCurrentPage } from '../../features/movies/upcomingSlice'; 
import { Link } from 'react-router-dom';
import './Upcoming.css';

const Upcoming = () => {
  const dispatch = useDispatch();
  const { movies, currentPage, totalPages, loading } = useSelector((state) => state.upcomingMovies);

  const itemsPerPage = 8; // Number of movies per page

  useEffect(() => {
    dispatch(fetchUpcomingMoviesThunk(currentPage)); // Dispatch the action to fetch upcoming movies
  }, [dispatch, currentPage]); // Fetch when component mounts or page changes

  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      dispatch(setCurrentPage(pageNumber)); // Set the current page in Redux
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
        {movies.map((movie, index) => (
          <div key={index} className="movie-card mt-3">
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
        ))}
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
            className={currentPage === number ? 'page-button active' : 'page-button'}
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

export default Upcoming;
