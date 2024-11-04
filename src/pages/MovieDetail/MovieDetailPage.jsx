import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Spinner, Button, Modal } from "react-bootstrap";
import {
  fetchMovieDetails,
  fetchMovieReviews,
  fetchMovieTrailer,
} from "../../utils/api";
import Review from "../Homepage/components/Review/Review";
import RecommendMovie from "../Homepage/components/RecommendMovie/RecommendMovie";
import YouTube from "react-youtube";
import "./MovieDetailPage.style.css";

const MovieDetailPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [trailerKey, setTrailerKey] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMovieDetails = async () => {
      try {
        const data = await fetchMovieDetails(id);
        setMovie(data);

        const reviewData = await fetchMovieReviews(id);
        setReviews(reviewData);

        const trailerKey = await fetchMovieTrailer(id);
        setTrailerKey(trailerKey);
      } catch (error) {
        console.error("영화상세정보,리뷰,예고편 불러오는데 오류발생", error);
      } finally {
        setLoading(false);
      }
    };

    loadMovieDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="spinner-area">
        <Spinner animation="border" variant="danger" />
      </div>
    );
  }

  if (!movie) {
    return <p>영화 정보를 불러올 수 없습니다.</p>;
  }

  return (
    <Container className="movie-detail-container">
      <Row>
        <Col md={8}>
          <Row>
            <Col md={6} className="movie-poster-container">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="movie-poster"
              />
            </Col>
            <Col md={6} className="movie-info-container">
              <h2 className="movie-title">{movie.title}</h2>
              <div className="movie-info">
                <p>
                  <strong>평점:</strong> {movie.vote_average} / 10
                </p>
                <p>
                  <strong>개봉일:</strong> {movie.release_date}
                </p>
                <div className="genre-list">
                  {movie.genres.map((genre) => (
                    <span key={genre.id} className="genre-item">
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>
              {trailerKey && (
                <Button
                  variant="danger"
                  onClick={() => setShowTrailer(true)}
                  className="trailer-button"
                >
                  예고편 보기
                </Button>
              )}
            </Col>
          </Row>

          <Row className="movie-detail-below">
            <Col>
              <h4 className="synopsis-header">줄거리</h4>
              <p className="synopsis-text">{movie.overview}</p>
            </Col>
          </Row>

          <Row className="movie-detail-below">
            <Col>
              <h3>리뷰</h3>
              {reviews.length === 0 ? (
                <p>리뷰가 없습니다.</p>
              ) : (
                reviews.map((review) => (
                  <Review
                    key={review.id}
                    author={review.author}
                    content={review.content}
                  />
                ))
              )}
            </Col>
          </Row>
        </Col>

        <Col md={4}>
          <RecommendMovie />
        </Col>
      </Row>

      <Modal
        show={showTrailer}
        onHide={() => setShowTrailer(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{movie.title} 예고편</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <YouTube
            videoId={trailerKey}
            opts={{ width: "100%", height: "390" }}
          />
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default MovieDetailPage;
