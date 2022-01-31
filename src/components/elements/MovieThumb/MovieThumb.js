import React from "react";
import { Link } from "react-router-dom";
import "./MovieThumb.css";

const LinkThumb = props => {
  return (
    <>
      <img src={props.image} alt="moviethumb" />
    </>
  );
};

const MovieThumb = props => {
  return (
    <div className="rmdb-moviethumb">
      {props.clickable ? (
        <Link
          to={{
            pathname: `/${props.movieId}`,
            movieName: `${props.movieName}`,
            imdb_user_rating: `${props.imdb_user_rating}`
          }}
        >
          {/* <img src={props.image} alt="moviethumb" /> */}
          <LinkThumb image={props.image} />
        </Link>
      ) : (
        <img src={props.image} alt="moviethumb" />
      )}
    </div>
  );
};

export default MovieThumb;
