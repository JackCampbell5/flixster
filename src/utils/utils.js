import { func } from "prop-types";

export function parseData(data) {

    let retDict = [];
    for (let a of data.results) {
        // console.log(a);
    let dict = {};
    dict["title"] = a.title;
    dict["poster"] = a.poster_path
    dict["date"] = formatDate(a.release_date);//TODO parse data
    dict["overview"] = a.overview;
    dict["gerne"] = a.genre_ids;// Parse genre ids for text
    dict["rating"] = Math.floor(a.vote_average*10)/10;
    dict["saved"] = false;
    dict["watched"] = false;
    // dict[]
    retDict.push(dict);
    }
    return retDict;
}

async function getGenres(ids) {
    const apiKey = import.meta.env.VITE_APP_API_KEY;
    const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      const genres = data.genres;

      // Log the genres (for demonstration)
      console.log(genres);

      return genres; // Or use the genres array as needed in your application
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
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


const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: import.meta.env.VITE_APP_API_KEY
  }
};

export async function fetchData(after){
    console.log(import.meta.env.VITE_APP_API_KEY)
    // TODO Make it get more than 1 page
    const results = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_APP_API_KEY}&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`, options)
    const data = await results.json();
    const bye = parseData(data)
    console.log(bye)
    after(bye)
}
