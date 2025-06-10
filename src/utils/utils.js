import { func } from "prop-types";

export async function fetchData(after){
    // TODO Make it get more than 1 page
    const apiKey = import.meta.env.VITE_APP_API_KEY;
    const results = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`, options)
    const data = await results.json();

    const genreResults = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`, options)
    const genreData = await genreResults.json();

    const bye = parseData(data,genreData)
    after(bye)
}

const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: import.meta.env.VITE_APP_API_KEY
    }
};


function parseData(data,genreData) {
    let retDict = [];
    for (let a of data.results) {
        let dict = {};
        dict["title"] = a.title;
        dict["poster"] = a.poster_path
        dict["date"] = formatDate(a.release_date);//TODO parse data
        dict["overview"] = a.overview;
        dict["genre"] = parseGenreData(a,genreData);// Parse genre ids for text
        dict["rating"] = Math.floor(a.vote_average*10)/10;
        dict["liked"] = false;
        dict["watched"] = false;
        // dict[]
        retDict.push(dict);
    }
    return retDict;
}

function parseGenreData(data,genreData) {
    let allGenre = {}
    console.log(genreData)
    for(let a of genreData.genres){
        allGenre[a.id] = a.name;
    }

    let retStr = "";
    for(let a of data.genre_ids) {
        retStr += allGenre[a] + ", ";
    }
    return retStr.substring(0,retStr.length-2);
}


function formatDate(date) {
    const myDateObj = new Date(date)
    return myDateObj.toLocaleDateString("en-US",
        {
        weekday: "long",
        month: "long",
        day: "numeric"
      })

}
