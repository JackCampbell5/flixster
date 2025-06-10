import { func } from "prop-types";

export async function fetchData(after){
    // TODO Make it get more than 1 page
    const apiKey = import.meta.env.VITE_APP_API_KEY;
    const results = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`, options)
    const data = await results.json();

    const genreResults = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`, options)
    const genreData = await genreResults.json();
    let genreDone = {}
    for(let a of genreData.genres){
        genreDone[a.id] = a.name;
    }

    const bye = await parseData(data,genreDone)
    console.log(bye)
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
        console.log(a);
        dict["id"] = a.id;
        dict["title"] = a.title;
        dict["poster"] = a.poster_path;
        dict["date"] = formatDate(a.release_date);//TODO parse data
        dict["overview"] = a.overview;
        dict["genre"] = parseGenreData(a,genreData);// Parse genre ids for text
        dict["rating"] = Math.floor(a.vote_average*10)/10;
        dict["runtime"] = detailData.runtime;
        dict["trailer"] = trailer;
        dict["backdrop"] = a.backdrop_path;
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
            trailer = `https://www.youtube.com/watch?v=${b.key}`;
            if(b.name === "Official Trailer") {
                break;
            }
        }
    }
    // If trailer is not found, use the first video found
    if(!trailer) {
        trailer = `https://www.youtube.com/watch?v=${trailerData.results[0].key}`;
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
        day: "numeric"
      })

}
