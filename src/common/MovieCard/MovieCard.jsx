import React from "react";
import { Badge } from "react-bootstrap";
import "./MovieCard.style.css";
import { useMovieGenreQuery } from "../../hooks/useMovieGenre";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ movie }) => {
  const { data: genreData } = useMovieGenreQuery();
  const navigate = useNavigate();

  const handleCardClick = () => {
    console.log("Navigating to:", `/movieDetailPage/${movie.id}`);
    navigate(`/MovieDetailPage/${movie.id}`);
  };

  const showGenre = (genreIdList) => {
    if (!genreData) return [];
    const genreNameList = genreIdList.map((id) => {
      const genreObj = genreData.find((genre) => genre.id === id);
      return genreObj ? genreObj.name : "";
    });

    return genreNameList;
  };

  return (
    <div
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/w600_and_h900_bestv2${movie.poster_path})`,
      }}
      className="movie-card"
      onClick={handleCardClick}
    >
      <div className="overlay">
        <h1>{movie.title}</h1>
        {showGenre(movie.genre_ids).map((name, index) => (
          <Badge bg="danger" key={index}>
            {name}
          </Badge>
        ))}
        <div>
          <div>{movie.vote_average}</div>
          <div>{movie.popularity}</div>
          <div>{movie.adult ? "15세이상" : "12세이상 관람"}</div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
