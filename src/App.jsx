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

  // START Data Fetching Methods
  let localData = localStorage.getItem('data')? JSON.parse(localStorage.getItem('data')) : [];
  const starterPage = Math.ceil(localData.length/20)+1;
  const [loadMore, setLoadMore] = useState(starterPage);
  const [movieData, setMovieData] = useState(localData);
  // If there is no data in local storage, fetch data from the API and update the state
  useEffect((()=>{
    if(movieData.length===0){
    setLoading(true)
    fetchData(updateMovieData(true),loadMore,()=>setLoading(false))
    }else{
      updateMovieData(true,[])
    }
  }),[])

  // Update the movieData state with the new data
  function updateMovieData(update){return (dataToUpdateWith)=>{
    let oldIs = {}
    let temp = dataToUpdateWith
    if(update){
      temp = movieData.concat(dataToUpdateWith);
    }else{
    for(let a in movieData){
      oldIs[movieData[a].id] = a
     }
    }

    let arr = []
    let arr2=[]
    let num = 0;
    let hi = temp.length
    for(let a = 0; a<hi;a++){
      if(!update&&temp[a-(num)].id in oldIs&&!(arr.includes(temp[a-(num)].id))){
        arr2.push(movieData[oldIs[temp[a-(num)].id]])
        arr.push(temp[a-(num)].id)
        temp.splice(a-(num++),1)
      }else if(arr.includes(temp[a-(num)].id)){
        temp.splice(a-(num++),1)
      }else{
        arr.push(temp[a-(num)].id)
      }
    }//End of for loop
    temp = arr2.concat(temp)
    setMovieData(temp);
    saveSate(temp);
  }//End currying function
  }

  // Save the data to local storage
  function saveSate(data=[]){
    if(searchTerm===""){
      if(data.length===0){
        data = movieData;
      }
      localStorage.setItem('data', JSON.stringify(data));
    }
  }

  // Get another page of movies from the API
  const getMore = (after) => {
    setSortType("defaultA");
    setLoading(true)
    if(searchTerm!==""){
      fetchData(updateMovieData(true),loadMore+1,after,searchTerm);
    }else{
      fetchData(updateMovieData(true),loadMore+1,after);
    }
    setLoadMore(loadMore+1);
  }

  // Reset the data
  function reset(){
    localStorage.removeItem('data')
    setLoading(true)
    window.location.reload(true)
  }
  // END Data Fetching Methods

  // The term from the search bar
  const [searchTerm, setSearchTerm] = useState("");
  const saveSearchTerm = (newData) => {
    setSearchTerm(newData);
  }

  // The submit button status for the search bar
  function search(e){
    e.preventDefault(); // Prevents the default form submission
    if(searchTerm===""){
      // window.location.reload(true)
      console.log("No search term")
      let oldData = JSON.parse(localStorage.getItem('data'))
      console.log(oldData)
      for(let b of movieData){
        if(b.liked===true||b.watched===true){
          oldData.push(b)
        }
      }
      updateMovieData(false)(oldData)
    }else{
      // setSearchSubmit(searchTerm); // Set the searchSubmit state to the searchTerm state
      setLoading(true)
      updateMovieData(false)([])
      fetchData(updateMovieData(false),loadMore+1,()=>setLoading(false),searchTerm);
    }
  }

  // The sort type
  const [sortType, setSortType] = useState("defaultA");
  const saveSortType = (newData) => {
    setSortType(newData.target.value);
    sortData(movieData, newData.target.value);
  }

  // The view type
  const [viewType, setViewType] = useState("all");

  // Whether the site is loading more data
  const [loading, setLoading] = useState(false);

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
        <MovieList data={movieData} viewType={viewType} getMore={getMore}saveSate={saveSate} loading={loading} setLoading={setLoading}/>
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
