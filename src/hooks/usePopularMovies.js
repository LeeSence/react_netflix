import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchPopularMovies = () => {
  return api.get(`/movie/popular`, {
    params: {
      language: "ko-KR",
    },
  });
};

export const usePopularMoviesQuery = () => {
  return useQuery({
    queryKey: ["movie-popular-ko"],
    queryFn: fetchPopularMovies,
    select: (result) => result.data,
  });
};
