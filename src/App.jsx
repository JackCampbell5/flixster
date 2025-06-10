import { useState,useEffect } from 'react'
import './App.css'
import NavBar from './components/NavBar'
import SideBar from './components/SideBar'
import MovieList from './components/MovieList'
import Footer from './components/Footer'
import { fetchData,parseData } from './utils/utils'
import {data} from './data/data.js'


const App = () => {
  const [movieData, setMovieData] = useState(null);
  useEffect((()=>{fetchData(setMovieData)}),[])
  if(movieData!==null){
    return (
      <div className="App">
      <NavBar />
      <SideBar />
      <MovieList data={movieData}/>
      <Footer />
      </div>
    )
  }
}

export default App
