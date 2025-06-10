import React from "react";
import ReactDOM from "react-dom";
import {useState} from "react";
import LikeWatch from "./LikeWatch";
import './Movie.css'
import PropTypes, { func } from 'prop-types';



function Movie({movieDict,modal,setActiveMovie}) {
    // Setup params
    let title = movieDict.title;
    let poster = movieDict.poster;
    let rating = movieDict.rating;
    //TOOD make it one variable for like and watch for both the pop up and it

    function clickMovie() {
        setActiveMovie(movieDict);
        modal();
    }

  return (
    // JSX code for rendering the component
    <div className="Movie" onClick={clickMovie}>
        <img className="poster" src={`https://image.tmdb.org/t/p/w342/${poster}`}/>
        <p className="title">{title}</p>
        <p className="Rating">Rating: {rating}</p>
        <LikeWatch movieDict={movieDict}/>
    </div>
  );
}

Movie.propTypes = {
    // data: PropTypes.array.isRequired,
};


export default Movie;
