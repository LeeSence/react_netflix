import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchTopRatedMovies = () => {
  return api.get(`/movie/top_rated`, {
    params: {
      language: "ko-KR",
    },
  });
};

export const useTopRatedMoviesQuery = () => {
  return useQuery({
    queryKey: ["movie-top_rated-ko"],
    queryFn: fetchTopRatedMovies,
    select: (result) => result.data,
  });
};
