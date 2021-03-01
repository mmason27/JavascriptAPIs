//first we save our variables from the HTML document so we can later reference and append our content to it
let moviesContainer = document.getElementById("moviesContainer");
let userTextBox = document.getElementById("userTextBox");
let submitButton = document.getElementById("submitButton");
let movieURL = "http://www.omdbapi.com/?s=batman&apikey=26993a44";

//now let's create a function that will display movies on the screen
function displayMovies() {

    //create our first request to the api to get the initial movie details
    let request = new XMLHttpRequest();
    request.open("GET", movieURL);
    request.send();

    //add an event handler so that when the data we want loads, we can append it to our html page so users can view it
    request.addEventListener('load', function() {
        //JSON.parse 'parses' a string, constructing it into a JS value or object, making it easier to retrieve the information. Here we save it in a variable to make it easier to iterate through the data
        let movies = JSON.parse(request.responseText);
        let movieItems = movies.Search.map((movie) => {
            return ` 
                <img src="${movie.Poster}" id="moviePoster">
                <h2 id="movieTitle">${movie.Title}</h2>
                <p id="movieYear">${movie.Year}</p>
                <button onClick=displayDetails('${movie.imdbID}')>Click here for more details</button>`
                
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
        console.log(detail)

    let movieContent = 
    })
}