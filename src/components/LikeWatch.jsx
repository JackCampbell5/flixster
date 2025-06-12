import React from "react";
import {useState} from "react";
import ReactDOM from "react-dom";
import './LikeWatch.css'
import PropTypes, { func } from 'prop-types';
import { IoHeartDislikeOutline,IoHeartSharp } from "react-icons/io5";
import { MdOutlineMovieCreation,MdMovie } from "react-icons/md";



function LikeWatch({movieDict, isLiked, setIsLiked,isWactched, setIsWatched,saveSate}) {

    const likeMovie = (e) => {
        e.stopPropagation();
        setIsLiked(!isLiked);
        movieDict.liked = !isLiked
        saveSate()
    }

    const watchedMovie = (e) => {
        e.stopPropagation();
        setIsWatched(!isWactched);
        movieDict.watched = !isWactched
        saveSate()
    }

  return (
    // JSX code for rendering the component
    <div className="LikeWatch">
    <button className="like" onClick={likeMovie}>{isLiked ? <IoHeartSharp className="icon"/> : <IoHeartDislikeOutline className="icon"/>}</button>
    <button className="watched" onClick={watchedMovie}>{isWactched ?<MdMovie className="icon"/> :<MdOutlineMovieCreation className="icon"/>    }</button>
    </div>
  );
}

LikeWatch.propTypes = {
    // data: PropTypes.array.isRequired,
};
export default LikeWatch;
