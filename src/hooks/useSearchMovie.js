import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchSearchMovie = (keyword, page, genre) => {
  const params = {
    page,
    language: "ko-KR",
    with_genres: genre || undefined,
  };

  if (keyword) {
    params.query = keyword;
    return api.get(`/search/movie`, { params });
  }

  return api.get(`/discover/movie`, { params }); // 장르 필터가 있는 경우 디스커버 엔드포인트 사용
};

export const useSearchMovieQuery = (keyword, page, genre) => {
  return useQuery({
    queryKey: ["movie-search", keyword, page, genre], // queryKey 구성 업데이트
    queryFn: () => fetchSearchMovie(keyword, page, genre),
    select: (result) => result.data,
    enabled: !!page, // 페이지가 설정된 경우에만 요청
  });
};
