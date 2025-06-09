import React from "react";
import ReactDOM from "react-dom";
import './PopOut.css'
import PropTypes from 'prop-types';



function PopOut({data}) {
  return (
    // JSX code for rendering the component
    <div className="PopOut">
      <h3>PopOut</h3>
    </div>
  );
}

PopOut.propTypes = {
    data: PropTypes.array.isRequired,
};


export default PopOut;
