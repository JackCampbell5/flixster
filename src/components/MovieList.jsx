import React from "react";
import ReactDOM from "react-dom";
import {useState} from 'react';
import './MovieList.css'
import PropTypes from 'prop-types';
import Movie from './Movie'



function MovieList({data,searchTerm,viewType,getMore}) {
    let num = 0;

    const [modelShown, setModelShown] = useState(false);
    const handleClose = () => setModelShown(false);
    const handleShow = () => setModelShown(true);

    const [activeMovie, setActiveMovie] = useState(data[0]);
  return (
    // JSX code for rendering the component
    <div className="MovieList">
      <div id="movies">
      {data.map(obj =>  {
        if(searchTerm === "" || obj.title.toLowerCase().includes(searchTerm.toLowerCase())){
            if(viewType==="all"||(viewType==="liked"&&obj.liked===true)||(viewType==="watched"&&obj.watched===true)){
          return(<Movie key={obj.id} movieDict={obj} modal={handleShow} setActiveMovie={setActiveMovie} modalShown={modelShown} closeModal={handleClose}/>)
      }}else{<p>{obj.id}</p>}
      })}
      </div>
     { viewType==="all" ?
      <button className="update" onClick={getMore}>Load More</button>:<p>No More Movies Selected</p>}
    </div>
  );
}

MovieList.propTypes = {
    // data: PropTypes.array.isRequired,
};



export default MovieList;
