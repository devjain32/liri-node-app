require("dotenv").config();
var keys = require("./keys.js");
var spotifyKey = new Spotify(keys.spotify);
//Client ID da9e2ec7a22545079278eae1423a9c24
//Client Secret 00fca226feab47da9a5d8c6ec63f30ee

var Spotify = require('node-spotify-api');

var spotify = new Spotify({
    id: "da9e2ec7a22545079278eae1423a9c24",
    secret: "00fca226feab47da9a5d8c6ec63f30ee"
});

spotify.search({ type: 'track', query: 'All the Small Things' }, function (err, data) {
    if (err) {
        return console.log('Error occurred: ' + err);
    }

    console.log(data);
});