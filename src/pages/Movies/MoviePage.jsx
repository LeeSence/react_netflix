import React, { useState } from "react";
import { useSearchMovieQuery } from "../../hooks/useSearchMovie";
import { useSearchParams } from "react-router-dom";
import { Spinner, Alert, Container, Row, Col, Form } from "react-bootstrap";
import MovieCard from "../../common/MovieCard/MovieCard";
import ReactPaginate from "react-paginate";

const MoviePage = () => {
  const [query] = useSearchParams();
  const keyword = query.get("q") || ""; // URL에 `q` 파라미터가 없으면 빈 문자열로 설정
  const [page, setPage] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState(""); // 장르 상태 추가

  const { data, isLoading, isError, error } = useSearchMovieQuery(
    keyword,
    page,
    selectedGenre
  );

  const handlePageClick = ({ selected }) => setPage(selected + 1);

  const handleFilterChange = (e) => {
    const genre = e.target.value;
    setSelectedGenre(genre); // 장르 필터 업데이트
    setPage(1); // 필터가 변경되면 페이지를 1로 초기화
  };

  console.log("현재 검색 키워드:", keyword); // 검색 키워드 확인
  console.log("현재 선택된 장르:", selectedGenre); // 선택된 장르 확인
  console.log("응답 데이터:", data); // API 응답 데이터 확인

  if (isLoading) {
    return (
      <div className="spinner-area">
        <Spinner
          animation="border"
          variant="danger"
          style={{ width: "5rem", height: "5rem" }}
        />
      </div>
    );
  }

  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  return (
    <Container>
      <Row>
        <Col lg={4} xs={12}>
          <h5>장르 필터</h5>
          <Form.Select value={selectedGenre} onChange={handleFilterChange}>
            <option value="">모두</option>
            <option value="28">액션</option>
            <option value="35">코미디</option>
            <option value="18">드라마</option>
          </Form.Select>
        </Col>
        <Col lg={8} xs={12}>
          <Row>
            {data?.results.map((movie, index) => (
              <Col key={index} lg={4} xs={12}>
                <MovieCard movie={movie} />
              </Col>
            ))}
          </Row>
          <ReactPaginate
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={data?.total_pages}
            previousLabel="< previous"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
            renderOnZeroPageCount={null}
            forcePage={page - 1}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default MoviePage;
