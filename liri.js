require("").config();

//variables
let request = require("request");
let fs = require("fs");
let keys = require ("");
let Spotify = require('');
let Spotify = new Spotify();

let userOption = process.argv[2];
let inputParameter = process.argv[3];

userInputs(userOption, inputParameter);
