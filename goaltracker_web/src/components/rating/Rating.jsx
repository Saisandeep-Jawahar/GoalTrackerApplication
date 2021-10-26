import React from "react";
import ReactRating from "react-rating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";

function Rating({ value, onChange }) {
  return (
    <ReactRating
      emptySymbol={
        <FontAwesomeIcon icon={faStar} className="font-icon star" size="lg" />
      }
      fullSymbol={
        <FontAwesomeIcon
          icon={faStarSolid}
          className="font-icon star"
          size="lg"
        />
      }
      fractions={2}
      initialRating={value}
      onChange={onChange}
    />
  );
}

export default Rating;
