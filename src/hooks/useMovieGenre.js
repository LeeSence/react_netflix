import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchMovieGenre = () => {
  return api.get(`/genre/movie/list`, {
    params: {
      language: "ko-KR",
    },
  });
};

export const useMovieGenreQuery = () => {
  return useQuery({
    queryKey: ["movie-genre-ko"],
    queryFn: fetchMovieGenre,
    select: (result) => result.data.genres,
    staleTime: 300000, //5분
  });
};
