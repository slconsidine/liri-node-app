// includes the required packages and keys
require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var moment = require("moment");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

// establishes variables for command inputted as well as query inputted by user
var command = process.argv[2];
var nodeArgs = process.argv;
var userInput = "";

// turns user input into query that can be searched
for (var i=3; i < nodeArgs.length; i++) {
    if (i > 3 && i < nodeArgs.length) {
        userInput = userInput + "+" + nodeArgs[i];
    } else {
        userInput += nodeArgs[i];
    }
};

// concert-this function
var concertSearch = function(userInput) {
    var queryURL = "https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp";

    axios.get(queryURL).then(
        function(response) {
            for(i = 0; i < response.data.length; i++) {
                console.log("------------------------");
                console.log("Venue Name: " + response.data[i].venue.name);
                console.log("Venue Location: " + response.data[i].venue.city + ", " + response.data[i].venue.country);
                var eventDate = response.data[i].dateTime;
                console.log("Event Date: " + moment(eventDate).format("MMMM Do YYYY"));
            };
        })
    .catch(function(error) {
        if (error.response) {
            console.log("---------Data-----------");
            console.log(error.response.data);
            console.log("---------Status----------");
            console.log(error.response.status);
            console.log("---------Status----------");
            console.log(error.response.headers);
        } else if (error.request) {
            console.log(error.request);
        } else {
            console.log("Error: ", error.message);
        }
        console.log(error.config);
    });
};

// spotify-this-song function
var spotifySearch = function(userInput) {
    if (userInput === "") {
        spotify.search({
            type: 'track',
            query: "The+Sign",
            limit: 1
        }).then(function(response) {
            for(i = 0; i < response.tracks.items.length; i++) {
                console.log("------------------------");
                console.log("Artist(s): " + response.tracks.items[i].artists[0].name);
                console.log("Song Name: " + response.tracks.items[i].name);
                console.log("Preview Link: " + response.tracks.items[i].external_urls.spotify);
                console.log("Album Name: " + response.tracks.items[i].album.name);
            };
        }).catch(function(err) {
            console.log(err);
        });
    } else {
        spotify.search({
            type: 'track',
            query: userInput,
            limit: 5
        }).then(function(response) {
            for (i=0; i < response.tracks.items.length; i++) {
                console.log("------------------------");
                console.log("Artist(s): " + response.tracks.items[i].artists[0].name);
                console.log("Song Name: " + response.tracks.items[i].name);
                console.log("Preview Link: " + response.tracks.items[i].external_urls.spotify);
                console.log("Album Name: " + response.tracks.items[i].album.name);
            };
        }).catch(function(err) {
            console.log(err);
        });
    };
};

// movie-this function
var movieSearch = function(userInput) {
    if (userInput === "") {
        var queryURL = "https://www.omdbapi.com/?t=Mr.Nobody&y=&plot=short&apikey=trilogy";

        axios.get(queryURL).then(
            function(response) {
                console.log("------------------------");
                console.log("Movie Title: " + response.data.Title);
                console.log("Release Year: " + response.data.Year);
                console.log("IMDB Rating: " + response.data.imdbRating);
                console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
                console.log("Produced in: " + response.data.Country);
                console.log("Language: " + response.data.Language);
                console.log("Plot: " + response.data.Plot);
                console.log("Actors: " + response.data.Actors);
            }
        )
        .catch(function(error) {
            if (error.response) {
                console.log("---------Data-----------");
                console.log(error.response.data);
                console.log("---------Status----------");
                console.log(error.response.status);
                console.log("---------Status----------");
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log("Error: ", error.message);
            }
            console.log(error.config);
            }
        );
    } else {
        var queryURL = "http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy";

        axios.get(queryURL).then(
            function(response) {
                console.log("------------------------");
                console.log("Movie Title: " + response.data.Title);
                console.log("Release Year: " + response.data.Year);
                console.log("IMDB Rating: " + response.data.imdbRating);
                console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
                console.log("Produced in: " + response.data.Country);
                console.log("Language: " + response.data.Language);
                console.log("Plot: " + response.data.Plot);
                console.log("Actors: " + response.data.Actors);
            }
        )
        .catch(function(error) {
            if (error.response) {
                console.log("---------Data-----------");
                console.log(error.response.data);
                console.log("---------Status----------");
                console.log(error.response.status);
                console.log("---------Status----------");
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log("Error: ", error.message);
            }
            console.log(error.config);
            }
        );
    };
};

// do-what-it-says function
var readRandom = function(argv2, argv3) {
    if (argv2 === "concert-this") {
        concertSearch(argv3);
    } else if (argv2 === "spotify-this-song") {
        spotifySearch(argv3);
    } else if (argv2 === "movie-this") {
        movieSearch(argv3);
    };
};

// reads the user inputted command and calls the appropriate function
if (command === "concert-this") {
    concertSearch(userInput);
} else if (command === "spotify-this-song") {
    spotifySearch(userInput);
} else if (command === "movie-this") {
    movieSearch(userInput);
} else if(command === "do-what-it-says") {
    var fs = require("fs");

    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
            return console.log(error);
        } else {
            var dataArr = data.split(",");
            var argv2 = dataArr[0];
            var argv3 = dataArr[1];
            console.log(argv3);
            readRandom(argv2, argv3);
        };
    });
} else if (command === "help") {
    console.log("LIRI Bot can take in this commands: ");
    console.log("- concert-this");
    console.log("- spotify-this-song");
    console.log("- movie-this");
    console.log("- do-what-it-says");
};