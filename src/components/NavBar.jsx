import React from "react";
import {useState} from "react";
import ReactDOM from "react-dom";
import './NavBar.css'
import PropTypes, { func } from 'prop-types';


let searchQuary = "";
function NavBar({data}) {
  // const [searchQuary, updateSearchQuary] = useState("");
  return (
    // JSX code for rendering the component
    <div className="NavBar">
      <h1>Movie Night</h1>
      {/* <input type="text" value={searchQuary} onChange={handleSearchChange} placeholder="Search" /> */}
      <button className="search-button" id="submit-button">Search</button>
      <button className="search-button" id="clear-button">Clear</button>
    </div>
  );
}

NavBar.propTypes = {
    // data: PropTypes.array.isRequired,
};

// function updateSearchQuary(event) {
//     console.log(event.target.value);
// }

export default NavBar;
