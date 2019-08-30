// require("").config();

//variables
let request = require("request");
let fs = require("fs");
// let keys = require ("./keys");
let moment = require("moment");
axios = require("axios");
// let Spotify = require('node-spotify-api');
// let spotify = new Spotify(keys.spotify);

function findBand(band){
    var queryString: "https://bandsintownurl" + band + ".com";
    axios.
}



function takeQuery(arg1, arg2) {
    //Switch case
    switch (arg1) {
        case  "band":
        findBand(arg2)
            break;

        case  "spotify" :
        findSong(arg2)
            break;
        case  "movies": 
        findMovie(arg2)
            break;

        case value: ""

            break;

        default:
            console.log("sorry i can not help you with that")
            break;
    }
}

takeQuery(process.argv[2], process.argv[3]);