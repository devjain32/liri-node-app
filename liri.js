require("dotenv").config();
var keys = require("./keys.js");
//var spotifyKey = new Spotify(keys.spotify);
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var requestFunction = process.argv[2];
var requestName;

var spotify = new Spotify(keys.spotify);

for (var i = 3 ; i < process.argv.length ; i++) {
    requestName +=process.argv[i];
}


if (requestFunction === "concert-this") {
    concert();
}
else if (requestFunction === "spotify-this-song") {
    spotify();
}
else if (requestFunction === "movie-this") {
    movie();
}
else if (requestFunction === "do-what-it-says") {
    doWhatItSays();
}



var getSpotify = function(songName) {
    spotify.search({ 
        type: 'track', 
        query: songName
    }, function (err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        }
    
        console.log(data.tracks.items);
    });
}

getSpotify("despacito");
