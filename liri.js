require("dotenv").config();
var keys = require("./keys.js");

// includes the required packages and keys
var axios = require("axios");
var moment = require("moment");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

// establishes what command should be run
var command = process.argv[2];

if (command === "concert-this") {
    var nodeArgs = process.argv;
    var bands = "";

    for (var i = 3; i < nodeArgs.length; i++) {
        if (i > 3 && i < nodeArgs.length) {
          bands = bands + "+" + nodeArgs[i];
        } else {
          bands += nodeArgs[i];
        }
      }

    var queryURL = "https://rest.bandsintown.com/artists/" + bands + "/events?app_id=codingbootcamp";

    axios.get(queryURL).then(
        function(response) {
            for (i = 0; i < response.data.length; i++) {
                console.log("-------------------------");
                console.log("Venue Name: " + response.data[i].venue.name);
                console.log("Venue Location: " + response.data[i].venue.city + ", " + response.data[i].venue.country);
                var eventDate = response.data[i].datetime;
                console.log("Event Date: " + moment(eventDate).format("MMMM Do YYYY")
                );
            }
        })
    .catch(function(error) {
        if (error.response) {
            console.log("---------------Data---------------");
            console.log(error.response.data);
            console.log("---------------Status---------------");
            console.log(error.response.status);
            console.log("---------------Status---------------");
            console.log(error.response.headers);
        } else if (error.request) {
            console.log(error.request);
        } else {
            console.log("Error", error.message);
        }
        console.log(error.config);
    });
} else if (command === "spotify-this-song") {
    var nodeArgs = process.argv;
    var searchSong = "";

    for (var i = 3; i < nodeArgs.length; i++) {
        if (i > 3 && i < nodeArgs.length) {
            searchSong = searchSong + " " + nodeArgs[i];
        } else {
            searchSong += nodeArgs[i];
        }
      }
      
      if (searchSong === "") {
          spotify.search({
              type: 'track',
              query: "The+Sign",
              limit: 1
          }) .then(function(response) {
            console.log(response.tracks);
            // console.log(response.tracks.items[0].artists[0].name);
            // console.log(response.tracks.items[0].name);
            // console.log(response.tracks.items[0].external_urls.spotify);
            // console.log(response.tracks.items[0].album.name);
            for (i = 0; i < response.tracks.items.length; i++) {
                console.log("Artist(s): " + response.tracks.items[i].artists[i].name);
                console.log("Song Name: " + response.tracks.items[i].name);
                console.log("Preview Link: " + response.tracks.items[i].external_urls.spotify);
                console.log("Album Name: " + response.tracks.items[i].album.name);
            };
        })
        .catch(function(err) {
            console.log(err);
        });
      } else {
        spotify.search(
            { 
                type: 'track', 
                query: searchSong,
                limit: 5
    
            })
            .then(function(response) {
                // console.log(response.tracks.items[0].artists[0].name);
                // console.log(response.tracks.items[0].name);
                // console.log(response.tracks.items[0].external_urls.spotify);
                // console.log(response.tracks.items[0].album.name);
                for (i = 0; i < response.tracks.items.length; i++) {
                    console.log("-------------------------");
                    console.log("Artist(s): " + response.tracks.items[i].artists[0].name);
                    console.log("Song Name: " + response.tracks.items[i].name);
                    console.log("Preview Link: " + response.tracks.items[i].external_urls.spotify);
                    console.log("Album Name: " + response.tracks.items[i].album.name);
                };
            })
            .catch(function(err) {
                console.log(err);
            });
      }

      
} else if (command === "movie-this") {
    var nodeArgs = process.argv;
    var movieTitle = "";

    for (var i = 3; i < nodeArgs.length; i++) {
        if (i > 3 && i < nodeArgs.length) {
          movieTitle = movieTitle + "+" + nodeArgs[i];
        } else {
          movieTitle += nodeArgs[i];
        }
      }
    console.log(movieTitle);

    if (movieTitle === "") {
        var queryURL = "https://www.omdbapi.com/?t=Mr.Nobody&y=&plot=short&apikey=trilogy";
        console.log(queryURL);
        axios.get(queryURL).then(
            function(response) {
                console.log("Movie Title: " + response.data.Title);
                console.log("Release Year " + response.data.Year);
                console.log("IMDB Rating: " + response.data.imdbRating);
                console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
                console.log("Produced in: " + response.data.Country);
                console.log("Language: " + response.data.Language);
                console.log("Actors: " + response.data.Actors);
            })
            .catch(function(error) {
              if (error.response) {
                console.log("---------------Data---------------");
                console.log(error.response.data);
                console.log("---------------Status---------------");
                console.log(error.response.status);
                console.log("---------------Status---------------");
                console.log(error.response.headers);
              } else if (error.request) {
                console.log(error.request);
              } else {
                console.log("Error", error.message);
              }
            });
        } else {
            var queryURL = "http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=short&apikey=trilogy";

            axios.get(queryURL).then(
                function(response) {
                    console.log("Movie Title: " + response.data.Title);
                    console.log("Release Year " + response.data.Year);
                    console.log("IMDB Rating: " + response.data.imdbRating);
                    console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
                    console.log("Produced in: " + response.data.Country);
                    console.log("Language: " + response.data.Language);
                    console.log("Actors: " + response.data.Actors);
                })
                .catch(function(error) {
                if (error.response) {
                    console.log("---------------Data---------------");
                    console.log(error.response.data);
                    console.log("---------------Status---------------");
                    console.log(error.response.status);
                    console.log("---------------Status---------------");
                    console.log(error.response.headers);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log("Error", error.message);
                }
                });
    }
} else if (command === "do-what-it-says") {

}


// To retrieve the data that will power this app, you'll need to send requests using the axios package to the Bands in Town, Spotify and OMDB APIs. You'll find these Node packages crucial for your assignment.
    // Node-Spotify-API 
    // Axios
        // You'll use Axios to grab data from the OMDB API and the Bands In Town API
    // Moment
    // DotEnv
    // THESE HAVE ALL BEEN DOWNLOADED

// Make it so liri.js can take in one of the following commands:
// do-what-it-says
    // Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

    // It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.

    // Edit the text in random.txt to test out the feature for movie-this and concert-this.
