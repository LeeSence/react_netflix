import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchRecommendedMovies } from "../../../../utils/api";
import "./RecommendMovie.style.css";

const RecommendMovie = () => {
  const { id } = useParams();
  const [recommendedMovies, setRecommendedMovies] = useState([]);

  useEffect(() => {
    const loadRecommendedMovies = async () => {
      try {
        const recommendedData = await fetchRecommendedMovies(id);
        setRecommendedMovies(recommendedData);
      } catch (error) {
        console.error("Error loading recommended movies:", error);
      }
    };

    loadRecommendedMovies();
  }, [id]);

  return (
    <div className="recommended-movies">
      <h3>추천 영화</h3>
      {recommendedMovies.length === 0 ? (
        <p>추천 영화가 없습니다.</p>
      ) : (
        recommendedMovies.map((recMovie) => (
          <div key={recMovie.id} className="recommended-movie">
            <img
              src={`https://image.tmdb.org/t/p/w200${recMovie.poster_path}`}
              alt={recMovie.title}
              className="recommended-movie-poster"
            />
            <p>{recMovie.title}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default RecommendMovie;
