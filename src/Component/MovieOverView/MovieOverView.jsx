import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Hook to get the movie_id from the URL
import axios from "axios"; 
import { Spinner } from "react-bootstrap"; 
import "./MovieOverView.css";

const MovieOverView = () => {
  const { id } = useParams();
  const [movieData, setMovieData] = useState(null); 
  const [castData, setCastData] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  const Api_key = "c45a857c193f6302f2b5061c3b85e743"; 


  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const movieResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${Api_key}&language=en-US`
        );
        setMovieData(movieResponse.data);
        setLoading(false);
        const castResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${Api_key}&language=en-US`
        );
        setCastData(castResponse.data.cast);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchMovieData();
  }, [id]);


  if (loading) {
    return (
      <div className="loading-container">
        <Spinner animation="border" variant="light" />
        <p>Loading...</p>
      </div>
    );
  }


  if (error) {
    return <div>Error: {error}</div>;
  }


  if (!movieData) {
    return <div>Movie not found!</div>;
  }

  return (
    <>
      <div className="movie-container container">
        <div className="movie-details">
          <div className="movie-poster">
            <div className="d-flex">
              <div>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`}
                  alt={movieData.title}
                  style={{ width: "200px", height: "auto" }}
                />
                <p className="overview overview-mobile-resp" style={{ fontSize: "15px" }}>{movieData.overview}</p>
              </div>
              <div className="cast-section-mobile-resp">
                <h2 style={{ fontSize: "19px", marginLeft: "-100vh" }}>{movieData.title}</h2>
                <p style={{ fontSize: "15px", marginLeft: "-100vh" }} className="rating">Rating: {movieData.vote_average}</p>
                <p style={{ fontSize: "15px", marginLeft: "-100vh" }} className="details">
                  <span>{movieData.runtime} min</span> |{" "}
                  <span>{movieData.genres.map((genre) => genre.name).join(", ")}</span>
                </p>
                <p style={{ fontSize: "15px", marginLeft: "-100vh" }} className="release-date">Release Date: {movieData.release_date}</p>
              </div>
            </div>
          </div>

          <div>
            <img
              src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`}
              alt={movieData.title}
              style={{ width: "300px" }}
            />
          </div>
        </div>


        <div className="cast-section">
          <h3>Cast</h3>
          <div className="cast-grid">
            {castData.slice(0, 7).map((castMember) => (
              <div className="cast-card" key={castMember.cast_id}>

                <img
                  src={`https://image.tmdb.org/t/p/w500${castMember.profile_path}`}
                  alt={castMember.name}
                  onError={(e) => (e.target.src = "https://via.placeholder.com/150")}

                />
                <p>{castMember.name}</p>
                <p className="character">Character: {castMember.character}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieOverView;
