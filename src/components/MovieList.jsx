import React from "react";
import ReactDOM from "react-dom";
import {useState} from 'react';
import './MovieList.css'
import PropTypes from 'prop-types';
import Movie from './Movie'



function MovieList({data,searchTerm,viewType,getMore,saveSate, loading, setLoading}) {
    // Handel loading of new movies to effect loading text and so we are only loading one at a time
    function loadMore() {
      if(!loading){
      setLoading(true);
      getMore(()=>setLoading(false));
      }
    }

    const [modelShown, setModelShown] = useState(false);
    const handleClose = () => setModelShown(false);
    const handleShow = () => setModelShown(true);
    let num =0;

  return (
    // JSX code for rendering the component
    <div className="MovieList">
      <div id="movies">
      {data.map(obj =>  {
        if(searchTerm === "" || obj.title.toLowerCase().includes(searchTerm.toLowerCase())){
            if(viewType==="all"||(viewType==="liked"&&obj.liked===true)||(viewType==="watched"&&obj.watched===true)){ num++;
          return(<Movie key={obj.id} movieDict={obj} modal={handleShow} modalShown={modelShown} closeModal={handleClose} saveSate={saveSate}/>)
      }}else{<p>{obj.id}</p>}
      })}
      </div>
      <div id="movieTotal">
        <p id="movieTotalNum">{num} </p>
        <p id="movieTotalLabel"> Movies Displayed</p>
      </div>
     { viewType==="all" ?
      <button className="update" id={"loading"+loading.toString()} onClick={loadMore}>{loading ?
            <div className="loadingInside">Loading
              <p className="loading__letter">.</p>
              <p className="loading__letter">.</p>
              <p className="loading__letter">.</p>
              <p className="loading__letter">.</p>
              </div>: "Load More"}</button>:null}
    </div>
  );
}

MovieList.propTypes = {
    // data: PropTypes.array.isRequired,
};



export default MovieList;
