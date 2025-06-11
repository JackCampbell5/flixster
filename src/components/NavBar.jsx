import React from "react";
import {useState} from "react";
import ReactDOM from "react-dom";
import './NavBar.css'
import PropTypes, { func } from 'prop-types';


let searchQuary = "";
function NavBar({data, searchTerm,saveSearchTerm,search,sortType,saveSortType}) {
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
      <div className="navContents">
        <div className="search">
          <form onSubmit={search}>
              <input id="search-box" name="dataInput" value={searchTerm} onChange={submitSearch} placeholder="Movie Titles"/>
              <button type="submit" id="submit-button">Search</button>
              <button className="search-button" id="clear-button" onClick={clearSearch}>Clear</button>
          </form>
        </div>
        <p className="nav-text" id="sort-text">Sort:</p>
        <select className="nav-input" id="sort-playlists" value={sortType} onChange={saveSortType}>
            <option value="defaultA">Default</option>
            <option value="titleA">Title</option>
            <option value="titleD">Title &#40;Decending&#41;</option>
            <option value="releaseA">Release Date &#40;Accending&#41;</option>
            <option value="releaseD">Release Date &#40;Decending&#41;</option>
            <option value="voteA">Vote Average &#40;Accending&#41;</option>
            <option value="voteD">Vote Average &#40;Decending&#41;</option>
        </select>
      </div>
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
