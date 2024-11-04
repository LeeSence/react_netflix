import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY;

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
});

// 요청 인터셉터 추가하기
api.interceptors.request.use(
  function (config) {
    // 요청이 전달되기 전에 작업 수행
    return config;
  },
  function (error) {
    // 요청 오류가 있는 작업 수행
    return Promise.reject(error);
  }
);

// 응답 인터셉터 추가하기
api.interceptors.response.use(
  function (response) {
    // 2xx 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
    return response;
  },
  function (error) {
    // 2xx 외의 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
    return Promise.reject(error);
  }
);

// 한국어 영화 데이터 가져오기
export const fetchKoreanMovies = async () => {
  try {
    const [popularResponse, topRateResponse, upComingResponse] =
      await Promise.all([
        api.get("/movie/popular", { params: { language: "ko-KR" } }),
        api.get("/movie/top_rated", { params: { language: "ko-KR" } }),
        api.get("/movie/upcoming", { params: { language: "ko-KR" } }),
      ]);

    return {
      popularMovies: popularResponse.data,
      topRateMovies: topRateResponse.data,
      upComingMovies: upComingResponse.data,
    };
  } catch (error) {
    console.error("영화 데이터 가져오기 오류:", error);
    throw error;
  }
};

// 상세 영화 정보 가져오기
export const fetchMovieDetails = async (movieId) => {
  try {
    const response = await api.get(`/movie/${movieId}`, {
      params: {
        language: "ko-KR",
      },
    });
    return response.data;
  } catch (error) {
    console.error("상세 영화 정보 가져오기 오류:", error);
    throw error;
  }
};

// 영화 리뷰 가져오기 (영어 및 한국어 병합)
export const fetchMovieReviews = async (movieId) => {
  try {
    const [englishReviews, koreanReviews] = await Promise.all([
      api.get(`/movie/${movieId}/reviews`, { params: { language: "en-US" } }),
      api.get(`/movie/${movieId}/reviews`, { params: { language: "ko-KR" } }),
    ]);

    return [...koreanReviews.data.results, ...englishReviews.data.results];
  } catch (error) {
    console.error("영화 리뷰 가져오기 오류:", error);
    throw error;
  }
};

// 추천 영화 가져오기
export const fetchRecommendedMovies = async (movieId) => {
  try {
    const response = await api.get(`/movie/${movieId}/recommendations`, {
      params: {
        language: "ko-KR",
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("추천 영화 가져오기 오류:", error);
    throw error;
  }
};
export const fetchMovieTrailer = async (movieId) => {
  try {
    const response = await api.get(`/movie/${movieId}/videos`, {
      params: {
        language: "ko-KR",
      },
    });

    // YouTube 예고편 필터링
    const trailer = response.data.results.find(
      (video) => video.type === "Trailer" && video.site === "YouTube"
    );
    return trailer ? trailer.key : null;
  } catch (error) {
    console.error("예고편 불러오기 오류:", error);
    throw error;
  }
};
export default api;
