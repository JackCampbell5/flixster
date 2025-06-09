import React from "react";
import ReactDOM from "react-dom";
import './SideBar.css'
import PropTypes from 'prop-types';



function SideBar({data}) {
  return (
    // JSX code for rendering the component
    <div className="SideBar">
      <h3>SideBar</h3>
    </div>
  );
}

SideBar.propTypes = {
    data: PropTypes.array.isRequired,
};


export default SideBar;
