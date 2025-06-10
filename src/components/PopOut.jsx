import React from "react";
import {useEffect} from "react";
import ReactDOM from "react-dom";
import './PopOut.css'
import PropTypes from 'prop-types';



function PopOut({data}) {
    let title = data.title;
    let poster = data.poster;
    let date = data.date;
    let overview = data.overview;
    let gerne = data.gerne;
    let rating = data.rating;
    const handleOutsideClick = (e) => {
        if (e.target.className === 'modal') {
          closeModal();
        }
      };

    useEffect(() => {
       window.addEventListener('click', handleOutsideClick);
    })
    console.log(rating)
  return (
    // JSX code for rendering the component
    <div className="PopOut">
      <h3>PopOut</h3>
      <div id="myModal" className="modal">
            <div className="modal-content">
                <span className="close" id="model-close">&times;</span>
                <div id="movie-viewer">
                    <header id="pop-header">
                        <img className="poster-large" src={`https://image.tmdb.org/t/p/w780/${poster}`}/>
                        <div id="movie-info">
                            <p className="title">{title}</p>
                            <p className="date">{date}</p>
                            <p className="gerne">{gerne}</p>
                            <p className="rating">{rating}</p>
                        </div>
                    </header>
                    <p className="overview">{overview}</p>
                </div>
            </div>
        </div>
    </div>
  );
}

PopOut.propTypes = {
    data: PropTypes.object.isRequired,
};

// // When the user clicks on <span> (x), close the modal
// document.querySelector("#model-close").addEventListener('click', (e)=>{
//     modal.style.display = "none";
//     reset()
//   });

//   // When the user clicks anywhere outside of the modal, close it
//   window.addEventListener('click', (e)=>{
//     if (e.target == modal) {
//       modal.style.display = "none";
//     }
//   });


export default PopOut;
