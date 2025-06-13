
/**
 * Get the movie data from the API and parse it into a format that can be used by the app
 * @param {Function} after - The function to call after the data is fetched and place the results in
 * @param {number} page - The page to fetch the movies from
 */
const apiKey = import.meta.env.VITE_APP_API_KEY;

function getApiRequest(category,params){
    return `https://api.themoviedb.org/3/${category}movie${params}api_key=${apiKey}`
}


export async function fetchData(after,page,after2=()=>{null}){
    // TODO Make it get more than 1 page
    const results = await fetch(getApiRequest("discover/", `?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&`), options)
    const data = await results.json();
    const genreResults = await fetch(getApiRequest("genre/","/list?"), options)
    const genreData = await genreResults.json();

    // Parse the genre data into a more readable dictionary
    let genreDone = {}
    for(let a of genreData.genres){
        genreDone[a.id] = a.name;
    }

    const bye = await parseData(data,genreDone)
    after(bye)
    console.log("Done")
    after2();
}

// Options for the fetch
const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: import.meta.env.VITE_APP_API_KEY
    }
};

/**
 * Parses the data from the API into a dictionary that can be used by the app
 * @param {Object} data - The data to parse
 * @param {Object} genreData - A dictionary of genre ids to names
 * @returns The dictionary of parsed data
 */
async function parseData(data,genreData) {
    let retDict = [];

    for (let a of data.results) {
        // Get the extra details for runtime
        const detailResults = await fetch(getApiRequest("",`/${a.id}?language=en-US&`), options)
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

/**
 * Find the trailer for a movie by fetching all videos and looking for a trailer
 * @param {number} id - The id to get the trailer for
 * @returns The YouTube link to the trailer
 */
async function getTrailer(id) {
    // Get all the videos to get the trailer
    let youTubeStarter = "https://www.youtube.com/embed/"
    const trailerResults = await fetch(getApiRequest("",`/${id}/videos?&language=en-US&include_video_language=en&`), options)
    const trailerData = await trailerResults.json();
    let trailer = "";
    if (!trailerData.results.length) {
        return trailer;
    }
    for(let b of trailerData.results) {
        if(b.type == "Trailer"&&b.site==="YouTube"){
            trailer = youTubeStarter+b.key;
            if(b.name === "Official Trailer") {
                break;
            }
        }
    }
    // If trailer is not found, use the first video found
    if(!trailer) {
        trailer = youTubeStarter+trailerData.results[0].key;
    }
    return trailer;
}

/**
 * Takes a data array and a dictionary of genre ids to names and parses the genre ids into a string
 * @param {Array} data - An array of genre ids to parse
 * @param {*} genreData - A dictionary of genre ids to names
 * @returns The string of genre names
 */
function parseGenreData(data,genreData) {
    let retStr = "";
    for(let a of data.genre_ids) {
        retStr += genreData[a] + ", ";
    }
    return retStr.substring(0,retStr.length-2);
}

/**
 * Formats a date into a string
 * @param {string} date - date to format
 * @returns The string of the formatted date
 */
function formatDate(date) {
    const myDateObj = new Date(date)
    return myDateObj.toLocaleDateString("en-US",
        {
        weekday: "long",
        month: "long",
        day: "numeric",
        })

}
