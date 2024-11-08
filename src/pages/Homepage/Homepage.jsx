import React from "react";
import Banner from "./components/Banner/Banner";
import PopularMovieSlide from "./components/PopularMovieSlide/PopularMovieSlide";
import TopRatedMovieSlide from "./components/TopRatedMovieSlide/TopRatedMovieSlide";
import UpComingMovieSlide from "./components/UpComingMovieSlide/UpComingMovieSlide";
import "./Homepage.style.css";
// 1. 배너 => popular 영화를 들고와서 첫번쨰 아이템을 보여주자
// 2. popular movie
// 3. top rated movie
// 4. upcoming movie
const Homepage = () => {
  return (
    <div className="homepage-container">
      <Banner />
      <PopularMovieSlide />
      <TopRatedMovieSlide />
      <UpComingMovieSlide />
    </div>
  );
};

export default Homepage;
