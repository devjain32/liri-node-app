require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var requestFunction = process.argv[2];
var requestName = process.argv[3];

for (var i = 4; i < process.argv.length; i++) {
    requestName += " " + process.argv[i];
}

beginSearches(requestFunction, requestName);

function beginSearches(requestFunction, requestName) {

    if (requestFunction === "concert-this") {
        concert();
    }
    else if (requestFunction === "spotify-this-song") {
        spotifySong();
    }
    else if (requestFunction === "movie-this") {
        movie();
    }
    else if (requestFunction === "do-what-it-says") {
        doWhatItSays();
    }
}


function spotifySong() {
    if (!requestName) {
        requestName = "The Sign Ace of Base"
    }
    spotify.search({
        type: 'track',
        query: requestName,
        limit: 1
    }, function (err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        }
        console.log("Song name: " + data.tracks.items[0].name)
        console.log("Album name: " + data.tracks.items[0].album.name);
        console.log("Artist: " + data.tracks.items[0].artists[0].name);
        console.log("Release date: " + data.tracks.items[0].album.release_date);
        console.log("URL: " + data.tracks.items[0].external_urls.spotify);
    });
}

function concert() {
    var queryURL = "https://rest.bandsintown.com/artists/" + requestName + "/events?app_id=codingbootcamp";
    axios.get(queryURL).then(
        function (response) {
            var concerts = response.data;
            for (var i in concerts) {
                var venue = concerts[i].venue.name;
                var city = concerts[i].venue.city;
                var country = concerts[i].venue.country;
                var day = concerts[i].datetime;
                console.log(venue + " | " + city + ", " + country);
                console.log(moment(day).format("MM/DD/YYYY hh:mm a"));
                console.log("-----------------------")
            }
        }
    )
}

function movie() {
    if (!requestName) {
        requestName = "Mr. Nobody"
    }
    var queryURL = "https://omdbapi.com/?t=" + requestName + "&apikey=trilogy";
    axios.get(queryURL).then(
        function (response) {
            console.log("Movie name: " + response.data.Title);
            console.log("Release date: " + response.data.Released);
            console.log("IMDB Rating: " + response.data.imdbRating);
            console.log("Country: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
        })
}

function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        var arr = data.split(",");
        requestFunction = arr[0];
        requestName = arr[1];
        beginSearches(requestFunction, requestName);
    })
}