import React from "react";
import { usePopularMoviesQuery } from "../../../../hooks/usePopularMovies";
import Alert from "react-bootstrap/Alert";
import "./Banner.style.css";

const Banner = () => {
  const { data, isLoading, isError, error } = usePopularMoviesQuery();
  // console.log("ddd", data);
  if (isLoading) {
    <h1>Loading....</h1>;
  }
  if (isError) {
    <Alert variant="danger">{error.message}</Alert>;
  }

  if (data && data.results && data.results.length > 0) {
    return (
      <div
        style={{
          backgroundImage:
            "url(" +
            `https://media.themoviedb.org/t/p/w1066_and_h600_bestv2${data.results[0].poster_path}` +
            ")",
        }}
        className="banner"
      >
        <div className="text-white banner-text-area">
          <h1>{data?.results[0].title}</h1>
          <p>{data?.results[0].overview}</p>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default Banner;
