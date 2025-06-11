import { func } from "prop-types";

export async function fetchData(after,page){
    // TODO Make it get more than 1 page
    const apiKey = import.meta.env.VITE_APP_API_KEY;
    const results = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`, options)
    const data = await results.json();

    const genreResults = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`, options)
    const genreData = await genreResults.json();
    let genreDone = {}
    for(let a of genreData.genres){
        genreDone[a.id] = a.name;
    }

    const bye = await parseData(data,genreDone)
    after(bye)
}

const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: import.meta.env.VITE_APP_API_KEY
    }
};


async function parseData(data,genreData) {
    const apiKey = import.meta.env.VITE_APP_API_KEY;
    let retDict = [];

    for (let a of data.results) {
        // Get the extra details for runtime
        const detailResults = await fetch(`https://api.themoviedb.org/3/movie/${a.id}?api_key=${apiKey}&language=en-US`, options)
        const detailData = await detailResults.json();

        let trailer = await getTrailer(a.id)

        let dict = {};
        dict["id"] = a.id;
        dict["title"] = a.title;
        dict["poster"] = a.poster_path;
        dict["date"] = formatDate(a.release_date);
        dict["sortDate"] = a.release_date
        dict["overview"] = a.overview;
        dict["genre"] = parseGenreData(a,genreData);// Parse genre ids for text
        dict["rating"] = Math.floor(a.vote_average*10)/10;
        dict["runtime"] = detailData.runtime;
        dict["trailer"] = trailer;
        dict["backdrop"] = a.backdrop_path;
        dict["popularity"] = a.popularity;
        dict["liked"] = false;
        dict["watched"] = false;
        retDict.push(dict);
    }
    return retDict;
}

async function getTrailer(id) {
    const apiKey = import.meta.env.VITE_APP_API_KEY;
    // Get all the videos to get the trailer
    const trailerResults = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}&language=en-US&include_video_language=en`, options)
    const trailerData = await trailerResults.json();
    let trailer = "";
    if (!trailerData.results.length) {
        return trailer;
    }
    for(let b of trailerData.results) {
        if(b.type == "Trailer"&&b.site==="YouTube"){
            trailer = `https://www.youtube.com/embed/${b.key}`;
            if(b.name === "Official Trailer") {
                break;
            }
        }
    }
    // If trailer is not found, use the first video found
    if(!trailer) {
        trailer = `https://www.youtube.com/embed/${trailerData.results[0].key}`;
    }
    return trailer;
}


function parseGenreData(data,genreData) {
    let retStr = "";
    for(let a of data.genre_ids) {
        retStr += genreData[a] + ", ";
    }
    return retStr.substring(0,retStr.length-2);
}


function formatDate(date) {
    const myDateObj = new Date(date)
    return myDateObj.toLocaleDateString("en-US",
        {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric"
      })

}


export function sortData(data, sortType) {
    if(data!==null&&data.length>1){
      let order = Array.from({ length: data.length }, (_, i) => i);
      let assend = true

      // Check if assending
      if(sortType.substring(sortType.length-1)==='D'){
        assend = false;
      }

      sortType  =  sortType.substring(0,sortType.length-1);// Get sort type

      let namesOrigonal, namesToSort;
      let num = 0;

      // Get the new order
      switch(sortType){
        case "title":
          //Sort by title
          namesOrigonal = Array.from(data).map(element => element.title+(num++).toString());
          namesToSort = Array.from(namesOrigonal).sort();
          order = namesToSort.map(a => namesOrigonal.indexOf(a));
          break;
        case "release":
          // Sort by author
          namesOrigonal = Array.from(data).map(element =>element.sortDate+(num++).toString());
          namesToSort = Array.from(namesOrigonal).sort();
          order = namesToSort.map(a => namesOrigonal.indexOf(a));
          order.reverse();
          break;
        case "vote":
          //Sort by likes
          namesOrigonal = Array.from(data).map(element => parseFloat(element.rating)+(num++)/1000);
          namesToSort = Array.from(namesOrigonal).sort((a, b) => b-a);
          order = namesToSort.map(a => namesOrigonal.indexOf(a));
          break;
        default:
          namesOrigonal = Array.from(data).map(element => element.popularity+(num++).toString());
          namesToSort = Array.from(namesOrigonal).sort();
          order = namesToSort.map(a => namesOrigonal.indexOf(a));
          break;
      }

      // Reverse the resulting list if the list is decending
      if(!assend){
        order.reverse();
      }
      let help = Array.from({ length: data.length }, (_, i) => i);
        // Swap the tiles so they are in the given order
       for(const a in order){
        let b = help.indexOf(order[a]);
        // Swap them
        let c = data[a]
        data[a] = data[b]
        data[b] = c;

        //Swap the helper array
        let oneTemp = help[a];
        help[a] = help[b]
        help[b] = oneTemp
       }


    }

  }
