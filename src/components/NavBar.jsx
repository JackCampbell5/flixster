import React from "react";
import {useState} from "react";
import ReactDOM from "react-dom";
import './NavBar.css'
import PropTypes, { func } from 'prop-types';


let searchQuary = "";
function NavBar({data, searchTerm,saveSearchTerm,search}) {
  function clearSearch() {
  searchTerm = "";
  saveSearchTerm("")
  }
  function submitSearch(newData){
    saveSearchTerm(newData.target.value);
  }
  // const [searchQuary, updateSearchQuary] = useState("");
  return (
    // JSX code for rendering the component
    <div className="NavBar">
      <h1>Movie Night</h1>
      <form onSubmit={search}>
        <input id="search-box" name="dataInput" value={searchTerm} onChange={submitSearch} placeholder="Movie Titles"/>
        <button type="submit" id="submit-button">Search</button>
        <button className="search-button" id="clear-button" onClick={clearSearch}>Clear</button>
      </form>
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
