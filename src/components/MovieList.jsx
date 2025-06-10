import React from "react";
import ReactDOM from "react-dom";
import {useState} from 'react';
import './MovieList.css'
import PopOut from './PopOut'
import PropTypes from 'prop-types';
import Movie from './Movie'



function MovieList({data}) {
    let num = 0;
    const [isUpate, setIsUpdated] = useState("");

    const updateMovie = () => {
        let retStr = "Saved:"
        let retStr2 = "Watched  :"
        for(let a of data){
            if(a.saved === true){
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



  return (
    // JSX code for rendering the component
    <div className="MovieList">
      <h3>MovieList</h3>
      <button className="update" onClick={updateMovie}>Update</button>
      <p>{isUpate}</p>
      <div id="movies">
      {data.map(obj => (
          <Movie key={num++} movieDict={obj} modal={handleShow}/>
      ))}
      </div>
      <PopOut data={data[0]} modalShown={modelShown} closeModal={handleClose}/>
    </div>
  );
}

MovieList.propTypes = {
    // data: PropTypes.array.isRequired,
};



export default MovieList;
