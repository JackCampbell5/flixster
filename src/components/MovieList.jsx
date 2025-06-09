import React from "react";
import ReactDOM from "react-dom";
import './MovieList.css'
import PropTypes from 'prop-types';



function MovieList({data}) {
  return (
    // JSX code for rendering the component
    <div className="MovieList">
      <h3>MovieList</h3>
    </div>
  );
}

MovieList.propTypes = {
    data: PropTypes.array.isRequired,
};


export default MovieList;
