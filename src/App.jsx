import { useState } from 'react'
import './App.css'
import NavBar from './components/NavBar'
import SideBar from './components/SideBar'
import MovieList from './components/MovieList'
import PopOut from './components/PopOut'
import Footer from './components/Footer'

const App = () => {
  return (
    <div className="App">
    <NavBar />
    <SideBar />
    <MovieList />
    <PopOut />
    <Footer />
    </div>
  )
}

export default App
