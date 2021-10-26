import React from "react";
import ReactRating from "react-rating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";

import "./Feedback.css";

function Feedback({ feedbacks }) {
  return (
    <div className="feedback">
      <div className="title">Feedback</div>
      {feedbacks.map((item, index) => (
        <FeedbackItem key={item.providerName} feedback={item}></FeedbackItem>
      ))}
    </div>
  );
}

function FeedbackItem({ feedback }) {
  const { providerName, rating, content } = feedback;
  return (
    <div className="feedback-item">
      <div className="row">
        <div className="name">{providerName}</div>
        <div className="rating">
          <ReactRating
            initialRating={rating}
            readonly
            emptySymbol={
              <FontAwesomeIcon icon={faStar} className="font-icon star" />
            }
            fullSymbol={
              <FontAwesomeIcon icon={faStarSolid} className="font-icon star" />
            }
          />
        </div>
      </div>
      <div className="content">{content}</div>
    </div>
  );
}
export default Feedback;
