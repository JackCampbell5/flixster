import React from "react";
import {useEffect} from "react";
import ReactDOM from "react-dom";
import './PopOut.css'
import PropTypes from 'prop-types';
import LikeWatch from "./LikeWatch";



function PopOut({data,modalShown,closeModal,isLiked, setIsLiked,isWactched, setIsWatched}) {
    let title = data.title;
    let poster = data.poster;
    let date = data.date;
    let overview = data.overview;
    let genre = data.genre;
    let rating = data.rating;
    let trailer = data.trailer;
    let runtime = data.runtime;
    let backdrop = data.backdrop;
    const handleOutsideClick = (e) => {
        if (e.target.className === 'modal') {
            closeModal();
        }
      };

    useEffect(() => {
       window.addEventListener('click', handleOutsideClick);
    })
  return (
    // JSX code for rendering the component
    <div className="PopOut">
        <div className={modalShown? 'modalVisible' : 'modalHidden'} >
            <h3>PopOut</h3>
            <div id="myModal" className="modal">
                <div className="modal-content">
                    <span className="close" id="model-close" onClick={closeModal}>&times;</span>
                    <div id="movie-viewer">
                        <header id="pop-header">
                            <img className="poster-large" src={`https://image.tmdb.org/t/p/w780/${poster}`}/>
                            <div id="movie-info">
                                <p className="title">{title}</p>
                                <p className="date">Release Date: {date}</p>
                                <p className="gerne">Genre: {genre}</p>
                                <p className="rating">Rating: {rating}</p>
                                <p className="runtime">Runtime: {runtime} Minutes</p>
                            <LikeWatch movieDict={data} isLiked={isLiked} setIsLiked={setIsLiked} isWactched={isWactched} setIsWatched={setIsWatched}/>
                            </div>
                        </header>
                        <p className="overview">{overview}</p>
                        <div className="trailer">
                            <h2>Trailer</h2>
                            {trailer === "" ? <p>No Trailer Available</p> :
                            <iframe width="420" height="315"
                            src={trailer}>
                            </iframe>}
                        </div>
                            {/* <a href={trailer}> <img id ="backdrop" src={`https://image.tmdb.org/t/p/w342/${backdrop}`}/></a> */}
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

PopOut.propTypes = {
    data: PropTypes.object.isRequired,
};


export default PopOut;
