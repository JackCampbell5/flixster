import React from "react";
import ReactDOM from "react-dom";
import './SideBar.css'
import PropTypes from 'prop-types';



function SideBar({data,setViewType}) {
  return (
    // JSX code for rendering the component
    <div className="SideBar">
      <h3>View</h3>
      <button onClick={()=>setViewType("all")}>All</button>
      <button onClick={()=>setViewType("liked")}>Liked</button>
      <button onClick={()=>setViewType("watched")}>Watched</button>
    </div>
  );
}

SideBar.propTypes = {
    // data: PropTypes.array.isRequired,
};


export default SideBar;
