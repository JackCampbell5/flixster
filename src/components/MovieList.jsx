import React from "react";
import ReactDOM from "react-dom";
import {useState} from 'react';
import './MovieList.css'
import PropTypes from 'prop-types';
import Movie from './Movie'



function MovieList({data,searchTerm,viewType}) {
    let num = 0;
    const [isUpate, setIsUpdated] = useState("");

    const updateMovie = () => {
        let retStr = "Liked:"
        let retStr2 = "Watched  :"
        for(let a of data){
            if(a.liked === true){
                retStr += a.title + " <br />";
            }
            if(a.watched === true){
                retStr2 += a.title + " <br />";
            }
        }
        setIsUpdated(retStr+retStr2);
    }

    const [modelShown, setModelShown] = useState(false);
    const handleClose = () => setModelShown(false);
    const handleShow = () => setModelShown(true);

    const [activeMovie, setActiveMovie] = useState(data[0]);
  return (
    // JSX code for rendering the component
    <div className="MovieList">
      <button className="update" onClick={updateMovie}>Update</button>
      <p>{isUpate}</p>
      <div id="movies">
      {data.map(obj =>  {
        if(searchTerm === "" || obj.title.toLowerCase().includes(searchTerm.toLowerCase())){
            if(viewType==="all"||(viewType==="liked"&&obj.liked===true)||(viewType==="watched"&&obj.watched===true)){
          return(<Movie key={obj.id} movieDict={obj} modal={handleShow} setActiveMovie={setActiveMovie} modalShown={modelShown} closeModal={handleClose}/>)
      }}else{<p>{obj.id}</p>}
      })}
      </div>
    </div>
  );
}

MovieList.propTypes = {
    // data: PropTypes.array.isRequired,
};



export default MovieList;
