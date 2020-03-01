require("dotenv").config();
var keys = require("./keys.js");

// includes the axios package
var axios = require("axios");

// establishes what command should be run
var command = process.argv[2];

if (command = "concert-this") {
    // store all of the arguments in an array
    var nodeArgs = process.argv;

    // store band name for query URL
    var bands = "";

    // loop through all the words in the node argument to create full band name
    for (var i = 3; i < nodeArgs.length; i++) {
        if (i > 3 && i < nodeArgs.length) {
          bands = bands + "+" + nodeArgs[i];
        } else {
          bands += nodeArgs[i];
        }
      }

    // create queryURL using band name
    var queryURL = "https://rest.bandsintown.com/artists/" + bands + "/events?app_id=codingbootcamp";

    // use axios to call the Bands-In-Town API
    axios.get(queryURL).then(
        function(response) {
            for (i = 0; i < response.data.length; i++) {
                console.log("Venue Name: " + response.data[i].venue.name);
                console.log("Venue Location: " + response.data[i].venue.city + ", " + response.data[i].venue.country);
                console.log("Event Date: " + response.data[i].datetime);
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
};



// access keys information from keys document like so: 
// var spotify = new Spotify(keys.spotify);

// To retrieve the data that will power this app, you'll need to send requests using the axios package to the Bands in Town, Spotify and OMDB APIs. You'll find these Node packages crucial for your assignment.
    // Node-Spotify-API 
    // Axios
        // You'll use Axios to grab data from the OMDB API and the Bands In Town API
    // Moment
    // DotEnv
    // THESE HAVE ALL BEEN DOWNLOADED

// Make it so liri.js can take in one of the following commands:
// concert-this
    // This will search the Bands in Town Artist Events API ("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp") for an artist and render the following information about each event to the terminal:
        // Name of the venue
        // Venue location
        // Date of the Event (use moment to format this as "MM/DD/YYYY")
    
// spotify-this-song
    // This will show the following information about the song in your terminal/bash window
        // Artist(s)
        // The song's name
        // A preview link of the song from Spotify
        // The album that the song is from
        // If no song is provided then your program will default to "The Sign" by Ace of Base.

    // You will utilize the node-spotify-api package in order to retrieve song information from the Spotify API.
    
    // The Spotify API requires you sign up as a developer to generate the necessary credentials. You can follow these steps in order to generate a client id and client secret:
        // Step One: Visit https://developer.spotify.com/my-applications/#!/
        // Step Two: Either login to your existing Spotify account or create a new one (a free account is fine) and log in.
        // Step Three: Once logged in, navigate to https://developer.spotify.com/my-applications/#!/applications/create to register a new application to be used with the Spotify API. You can fill in whatever you'd like for these fields. When finished, click the "complete" button.
        // Step Four: On the next screen, scroll down to where you see your client id and client secret. Copy these values down somewhere, you'll need them to use the Spotify API and the node-spotify-api package.

// movie-this
    // This will output the following information to your terminal/bash window:
        //   * Title of the movie.
        //   * Year the movie came out.
        //   * IMDB Rating of the movie.
        //   * Rotten Tomatoes Rating of the movie.
        //   * Country where the movie was produced.
        //   * Language of the movie.
        //   * Plot of the movie.
        //   * Actors in the movie.

    // If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'

    // You'll use the axios package to retrieve data from the OMDB API. Like all of the in-class activities, the OMDB API requires an API key. You may use trilogy.

// do-what-it-says
    // Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

    // It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.

    // Edit the text in random.txt to test out the feature for movie-this and concert-this.
