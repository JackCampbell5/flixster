import React from "react";
import ReactDOM from "react-dom";
import {useState} from "react";
import LikeWatch from "./LikeWatch";
import PopOut from './PopOut'
import './Movie.css'
import PropTypes, { func } from 'prop-types';



function Movie({movieDict,modal,setActiveMovie,modalShown,closeModal}) {
    // Setup params
    let title = movieDict.title;
    let poster = movieDict.poster;
    let rating = movieDict.rating;

    const [isLiked, setIsLiked] = useState(movieDict.liked);
    const [isWactched, setIsWatched] = useState(movieDict.watched);

    const [thisModelShown, setThisModelShown] = useState(false);


    function clickMovie() {
        setActiveMovie(movieDict);
        if(!modalShown){
            modal();
            setThisModelShown(true);
        }
    }

    function closeThisModal(){
        closeModal();
        setThisModelShown(false);
    }


  return (
    // JSX code for rendering the component
    <div className="Movie" onClick={clickMovie}>
        <div className="moviePoster">
            <img className="poster" src={`https://image.tmdb.org/t/p/w342/${poster}`} alt={title + "Poster"}/>
        </div>
        <p className="title">{title}</p>
        <p className="Rating">Rating: {rating}</p>
        {movieDict.date}
        <LikeWatch movieDict={movieDict} isLiked={isLiked} setIsLiked={setIsLiked} isWactched={isWactched} setIsWatched={setIsWatched}/>
        <PopOut data={movieDict} modalShown={thisModelShown} closeModal={closeThisModal} isLiked={isLiked} setIsLiked={setIsLiked} isWactched={isWactched} setIsWatched={setIsWatched}/>
    </div>
  );
}

Movie.propTypes = {
    // data: PropTypes.array.isRequired,
};


export default Movie;
