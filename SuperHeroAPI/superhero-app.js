//first we save our variables from the HTML document so we can later reference and append our content to it
let moviesContainer = document.getElementById("moviesContainer");
let movieDetails = document.getElementById("movieDetails");
let submitButton = document.getElementById("submitButton");

//now let's create a function that will display movies on the screen
function displayMovies() {
    let movieURL = "http://www.omdbapi.com/?s=batman&apikey=26993a44";

    //create our first request to the api to get the initial movie details
    let request = new XMLHttpRequest();
    request.open("GET", movieURL);
    request.send();

    //add an event handler so that when the data we want loads, we can append it to our html page so users can view it
    request.addEventListener('load', function() {
        // JSON.parse 'parses' a string, constructing it into a JS value or object, making it easier to retrieve the information. Here we save it in a variable to make it easier to iterate through the data
        let movies = JSON.parse(request.responseText);
        // next we'll map through the items since we now have an array, by iterating through the array we can return a template literal with the information we want from the original array
        let movieItems = movies.Search.map((movie) => {
            return `<div id="movieThumbnail">
                <h2 id="movieTitle">${movie.Title}</h2>
                <img src="${movie.Poster}" id="moviePoster">
                <p id="movieYear">Released in ${movie.Year}</p>
                <button onClick=displayDetails('${movie.imdbID}')>Click here for more details</button></div>`
                
    })
    //now we need to append this content to our div in index.html
    //.join("") removes all the commas from our array
    moviesContainer.innerHTML = movieItems.join("");
})
}
//create a function so that we can click a button on the page 'more info' and it will display more info from the api using the imdbID found in the initial list of all batman movies
displayMovies();

function displayDetails(imdbID) {
    let url = `http://www.omdbapi.com/?i=${imdbID}&apikey=26993a44`
    let request = new XMLHttpRequest();
    request.open("GET", url);
    request.send();

    request.addEventListener('load', function () {
        let detail = JSON.parse(request.responseText);
        let detailItem = 
                    `
                    <div class="addtlInfo">
                    <img src="${detail.Poster}" id="bigMoviePoster">
                    <h3>${detail.Title}</h3>
                    <p id="rated">Rating: ${detail.Rated}</p>
                    <p id="releaseDate">Release Date: ${detail.Released}</p>
                    <p id="director">Directed By: ${detail.Director}</p>
                    </div>
                    `
    movieDetails.innerHTML = detailItem;
    })
}