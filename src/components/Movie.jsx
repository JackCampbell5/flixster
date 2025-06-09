import React from "react";
import ReactDOM from "react-dom";
import './Movie.css'
import PropTypes from 'prop-types';



function Movie({data}) {
  return (
    // JSX code for rendering the component
    <div className="Movie">
      <h3>Movie</h3>
    </div>
  );
}

Movie.propTypes = {
    data: PropTypes.array.isRequired,
};


export default Movie;
