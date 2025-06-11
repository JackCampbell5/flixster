import { useState,useEffect } from 'react'
import './App.css'
import NavBar from './components/NavBar'
import SideBar from './components/SideBar'
import MovieList from './components/MovieList'
import Footer from './components/Footer'
import { fetchData, sortData} from './utils/utils'


const App = () => {

  const [movieData, setMovieData] = useState(null);
  useEffect((()=>{fetchData(setMovieData)}),[])


  const [searchTerm, setSearchTerm] = useState("");
  const [searchSubmit, setSearchSubmit] = useState("");
  const [sortType, setSortType] = useState("defaultA");

  const saveSortType = (newData) => {
    setSortType(newData.target.value);
    sortData(movieData, newData.target.value);
  }

  const saveSearchTerm = (newData) => {
    setSearchTerm(newData);
  }
  function search(e){
    e.preventDefault(); // Prevents the default form submission
    setSearchSubmit(searchTerm); // Set the searchSubmit state to the searchTerm state
  }



  if(movieData!==null){
    return (
      <div className="App">
      <NavBar searchTerm={searchTerm} saveSearchTerm = {saveSearchTerm} search={search} sortType={sortType} saveSortType={saveSortType}/>
      <SideBar />
      <MovieList data={movieData} searchTerm={searchSubmit}/>
      <Footer />
      </div>
    )
  }
}

export default App
