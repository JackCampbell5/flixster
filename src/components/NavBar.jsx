import React from "react";
import ReactDOM from "react-dom";
import './NavBar.css'
import PropTypes from 'prop-types';



function NavBar({data}) {
  return (
    // JSX code for rendering the component
    <div className="NavBar">
      <h3>NavBar</h3>
    </div>
  );
}

NavBar.propTypes = {
    data: PropTypes.array.isRequired,
};


export default NavBar;
