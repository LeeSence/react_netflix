import "./App.css";
import AppLayout from "./layout/AppLayout";
import MoviePage from "./pages/Movies/MoviePage";
import MovieDetailPage from "./pages/MovieDetail/MovieDetailPage";
import NotFoundPage from "./pages/NotFoundpage/NotFoundPage";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";

import Homepage from "./pages/Homepage/Homepage";

//홈페이지
// 영화 전체보여주는 페이지(서치)
// 영화 디테일 페이지
// 추천 영화 /movies/:id/recommandation
// 리뷰 /movies/:id/reviews

function App() {
  return (
    <Routes style="bg-black">
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Homepage />} />
        <Route path="/movieDetailPage/:id" element={<MovieDetailPage />} />
        <Route path="movies">
          <Route index element={<MoviePage />} />
          {/* <Route path=":id" element={<MovieDetailPage />} /> */}
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
