import React from "react";
import ReactDOM from "react-dom";
import './SideBar.css'
import PropTypes from 'prop-types';



function SideBar({viewType, setViewType,reset}) {
  return (
    // JSX code for rendering the component
    <div className="SideBar">
      <div className="menu">
        <button className={viewType === "all"?"selected":"unselected"} onClick={()=>setViewType("all")}>Home</button>
        <button className={viewType === "liked"?"selected":"unselected"} onClick={()=>setViewType("liked")}>Liked</button>
        <button className={viewType === "watched"?"selected":"unselected"} onClick={()=>setViewType("watched")}>Watched</button>
      </div>
      <button className={"reset"} onClick={reset}>Reset</button>
    </div>
  );
}

SideBar.propTypes = {
    // data: PropTypes.array.isRequired,
};


export default SideBar;
