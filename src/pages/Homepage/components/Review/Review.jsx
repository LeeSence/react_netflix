import React, { useState } from "react";
import { Button } from "react-bootstrap";
import "./Review.style.css";

const Review = ({ author, content }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => setExpanded(!expanded);

  const truncateText = (text, length) => {
    if (text.length <= length) return text;
    return `${text.slice(0, length)}...`;
  };

  return (
    <div className="review">
      <h5>{author}</h5>
      <p>{expanded ? content : truncateText(content, 100)}</p>
      <Button variant="link" onClick={toggleExpanded}>
        {expanded ? "접기" : "더보기"}
      </Button>
      <hr />
    </div>
  );
};

export default Review;
