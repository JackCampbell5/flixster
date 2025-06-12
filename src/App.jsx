import { useState,useEffect } from 'react'
import './App.css'
import NavBar from './components/NavBar'
import SideBar from './components/SideBar'
import MovieList from './components/MovieList'
import Footer from './components/Footer'
import {fetchData} from './utils/dataParsing'
import {sortData} from './utils/sortData'
import { func } from 'prop-types'


const App = () => {
  const temp = localStorage.getItem('data')? JSON.parse(localStorage.getItem('data')) : [];
  const [loadMore, setLoadMore] = useState(Math.ceil(temp.length/20)+1);
  const [movieData, setMovieData] = useState(temp);
  useEffect((()=>{
    if(movieData.length===0){
    setLoading(true)
    fetchData(updateMovieData,loadMore,()=>setLoading(false))
    }else{
      updateMovieData([])
    }
  }),[])
  function updateMovieData(dataToUpdateWith){
    let temp = movieData.concat(dataToUpdateWith);
    const arr = []
    let num = 0;
    let hi = temp.length
    for(let a = 0; a<hi;a++){
      if(arr.includes(temp[a-(num)].id)){
        temp.splice(a-(num++),1)
      }else{
        arr.push(temp[a-(num)].id)
      }
    }//End of for loop
    setMovieData(temp);
    saveSate(temp);

  }
  function saveSate(data=[]){
    if(data.length===0){
      data = movieData;
    }
    localStorage.setItem('data', JSON.stringify(data));
  }

  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchSubmit, setSearchSubmit] = useState("");
  const [sortType, setSortType] = useState("defaultA");
  const [viewType, setViewType] = useState("all");

  const getMore = (after) => {
    setSortType("defaultA");
    setLoading(true)
    fetchData(updateMovieData,loadMore+1,after);
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

  function reset(){
    localStorage.removeItem('data')
    setLoading(true)
    window.location.reload(true)
  }



  if(movieData!==null){
    return (
      <div className="App">
      <section>
      <header>
        <NavBar searchTerm={searchTerm} saveSearchTerm = {saveSearchTerm} search={search} sortType={sortType} saveSortType={saveSortType}/>
      </header>
      <section>
      <nav>
        <SideBar viewType={viewType} setViewType={setViewType} reset={reset}/>
      </nav>
      <main>
        <MovieList data={movieData} searchTerm={searchSubmit} viewType={viewType} getMore={getMore}saveSate={saveSate} loading={loading} setLoading={setLoading}/>
      </main>
      </section>
      <footer>
        <Footer />
      </footer>
      </section>
      </div>
    )
  }
}

export default App
