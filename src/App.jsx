import { useState,useEffect } from 'react'
import './App.css'
import NavBar from './components/NavBar'
import SideBar from './components/SideBar'
import MovieList from './components/MovieList'
import Footer from './components/Footer'
import { fetchData, sortData} from './utils/utils'


const App = () => {

  const [loadMore, setLoadMore] = useState(1);
  const [movieData, setMovieData] = useState([]);
  useEffect((()=>{fetchData(updateMovieData,loadMore)}),[])
  function updateMovieData(dataToUpdateWith){
    setMovieData(movieData.concat(dataToUpdateWith));
  }


  const [searchTerm, setSearchTerm] = useState("");
  const [searchSubmit, setSearchSubmit] = useState("");
  const [sortType, setSortType] = useState("defaultA");
  const [viewType, setViewType] = useState("all");

  const getMore = () => {
    fetchData(updateMovieData,loadMore+1);
    setLoadMore(loadMore+1);
  }

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
      <div className='Side'>
        <SideBar setViewType={setViewType}/>
      </div>
      <main>
      <NavBar searchTerm={searchTerm} saveSearchTerm = {saveSearchTerm} search={search} sortType={sortType} saveSortType={saveSortType}/>
      <MovieList data={movieData} searchTerm={searchSubmit} viewType={viewType} getMore={getMore}/>
      <Footer />
      </main>
      </div>
    )
  }
}

export default App
