import React from "react";
import {useState} from "react";
import ReactDOM from "react-dom";
import './LikeWatch.css'
import PropTypes, { func } from 'prop-types';


function LikeWatch({movieDict, isLiked, setIsLiked,isWactched, setIsWatched}) {

    const likeMovie = (e) => {
        e.stopPropagation();
        setIsLiked(!isLiked);
        movieDict.liked = !isLiked
    }

    const watchedMovie = (e) => {
        e.stopPropagation();
        setIsWatched(!isWactched);
        movieDict.watched = !isWactched
    }

  return (
    // JSX code for rendering the component
    <div className="LikeWatch">
    <button className="like" onClick={likeMovie}>Liked {isLiked.toString()}</button>
    <button className="watched" onClick={watchedMovie}>Watched {isWactched.toString()}</button>
    </div>
  );
}

LikeWatch.propTypes = {
    // data: PropTypes.array.isRequired,
};
export default LikeWatch;
