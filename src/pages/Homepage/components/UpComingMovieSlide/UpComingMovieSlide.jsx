import React from "react";
import { Alert } from "bootstrap";
import { responsive } from "../../../../constants/responsive";
import MovieSlider from "../../../../common/MovieSlider/MovieSlider";
import { useUpComingMoviesQuery } from "../../../../hooks/useUpComingMovies";

const UpComingMovieSlide = () => {
  const { data, isLoading, isError, error } = useUpComingMoviesQuery();
  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }
  return (
    <div>
      <MovieSlider
        title="곧 개봉 예정 영화"
        movies={data.results}
        responsive={responsive}
      />
    </div>
  );
};

export default UpComingMovieSlide;
