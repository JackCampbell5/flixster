import React from "react";
import ReactDOM from "react-dom";
import './SideBar.css'
import PropTypes from 'prop-types';



function SideBar({data,viewType, setViewType}) {
  return (
    // JSX code for rendering the component
    <div className="SideBar">
      <button className={viewType === "all"?"selected":"unselected"} onClick={()=>setViewType("all")}>Home</button>
      <button className={viewType === "liked"?"selected":"unselected"} onClick={()=>setViewType("liked")}>Liked</button>
      <button className={viewType === "watched"?"selected":"unselected"} onClick={()=>setViewType("watched")}>Watched</button>
    </div>
  );
}

SideBar.propTypes = {
    // data: PropTypes.array.isRequired,
};


export default SideBar;
