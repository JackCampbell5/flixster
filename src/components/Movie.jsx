import React from "react";
import ReactDOM from "react-dom";
import {useState} from "react";
import './Movie.css'
import PropTypes, { func } from 'prop-types';



function Movie({movieDict,modal,setActiveMovie}) {
    // Setup params
    let title = movieDict.title;
    let poster = movieDict.poster;
    let rating = movieDict.rating;
    const [isSaved, setIsSaved] = useState(movieDict.saved);
    const [isWactched, setIsWatched] = useState(movieDict.watched);


    const saveMovie = () => {
        movieDict.saved = !isSaved;
        setIsSaved(!isSaved);
    }

    const watchedMovie = () => {
        movieDict.watched = !isWactched;
        setIsWatched(!isWactched);
    }
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
        <button className="save" onClick={saveMovie}>Saved {isSaved.toString()}</button>
        <button className="watched" onClick={watchedMovie}>Watched {isWactched.toString()}</button>
    </div>
  );
}

Movie.propTypes = {
    // data: PropTypes.array.isRequired,
};


export default Movie;
