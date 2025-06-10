import { useState,useEffect } from 'react'
import './App.css'
import NavBar from './components/NavBar'
import SideBar from './components/SideBar'
import MovieList from './components/MovieList'
import Footer from './components/Footer'
import { fetchData } from './utils/utils'
import {data} from './data/data.js'


const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchSubmit, setSearchSubmit] = useState("");


  const saveSearchTerm = (newData) => {
    setSearchTerm(newData);
  }
  function search(e){
    e.preventDefault(); // Prevents the default form submission
    setSearchSubmit(searchTerm); // Set the searchSubmit state to the searchTerm state
  }

  const [movieData, setMovieData] = useState(null);
  useEffect((()=>{fetchData(setMovieData)}),[])
  if(movieData!==null){
    return (
      <div className="App">
      <NavBar searchTerm={searchTerm} saveSearchTerm = {saveSearchTerm} search={search}/>
      <SideBar />
      <MovieList data={movieData} searchTerm={searchSubmit}/>
      <Footer />
      </div>
    )
  }
}

export default App
