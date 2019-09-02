require("dotenv").config();
let keys = require("./keys.js");
let axios = require("axios");
let fs = require("fs");
let Spotify = require('node-spotify-api');
let spotify = new Spotify(keys.spotify);
// const moment = require("moment")

let searchTerm = process.argv[2];

switch(searchTerm) {
    case "concert-this":
        let artist = process.argv.slice(3).join(" ");
        let concertUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
        axios.get(concertUrl).then(function (response, err) {
        console.log("Venue Name: " + response.data[0].venue.name);
        console.log("City: " + response.data[0].venue.city);
        console.log("Time: " + response.data[0].datetime);
        
        
        //console.log("Time: " + moment(response.data[0].datetime).format("MM/DD/YYYY"));
        if (err) {
            console.log("Error: " + err)
        }
        })
      break;
    case "spotify-this-song":
        let query = process.argv.slice(3).join(" ");
        
        if (query === " ") {
            console.log("searching for The Sign")
        }
        spotify.search({
            type: "track",
            query: query
        }, function (err, data) {
            if (err) {
            return console.log("Error:" + err);
            }
            console.log("Artist(s): " + data.tracks.items[0].album.artists[0].name);
            console.log("Song Title: " + data.tracks.items[0].name);
            console.log("Album Name: " + data.tracks.items[0].album.name);
            console.log("Listen on Spotify: " + data.tracks.items[0].external_urls.spotify);
        });
      break;
    case "movie-this":
    //api search
    let movieQuery = process.argv.slice(3);
    if (!process.argv[3]) {
      movieQuery = "Mr. Nobody";
    }
    let movieUrl = "http://www.omdbapi.com/?t=" + movieQuery + "&apikey=trilogy";
    axios.get(movieUrl).then(function (response, err) {
      console.log("Title: " + response.data.Title);
      console.log("Year Released: " + response.data.Year);
      console.log("IMDB Rating: " + response.data.imdbRating);
      console.log("Rotten Tomatoes Rating: " + response.data.Ratings[0].Value);
      console.log("Movie Was Produced In: " + response.data.Country);
      console.log("Language(s): " + response.data.Language);
      console.log("Plot: " + response.data.Plot);
      console.log("Cast: " + response.data.Actors);

      if (err) {
        console.log("Error: " + err)
      }
    })
      
      break;
    case "do-what-it-says":
    fs.readFile("random.txt", 'utf8', function (error, data) {
      if (error) {
        console.log("Error: " + error);
        return;
      };
      let ranString = data.split(',');
      let ranQuery = ranString[1];

      spotify.search({
        type: "track",
        query: ranQuery,
      }, function (err, data) {
        if (err) {
          return console.log("Error:" + err);
        }

        console.log("Artist: " + data.tracks.items[0].album.artists[0].name);
        console.log("Song: " + data.tracks.items[0].name);
        console.log("Appears on: " + data.tracks.items[0].album.name);
        console.log("Listen on Spotify: " + data.tracks.items[0].preview_url);

      });
    });


      break;
    default:
    console.log("Please choose from concert-this, spotify-this-song, movie-this or do-what-it-says");
  }