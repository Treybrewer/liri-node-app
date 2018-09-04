var inquirer = require("inquirer");
var chalk = require("chalk");
var request = require("request");
var moment = require("moment");
function start() {
    inquirer
        .prompt([
            {
                
                message: "Hello!  I am Liri.  How can I be of service?",
                type: "checkbox",
                choices: [
                    {name: 'Spotify this song'},
                    {name: 'Movie this'},
                    {name: 'Concert this'},
                    {name: 'Do what it says'}
                ],
                name: "app"
            }
        ])
        .then(function (inquirerResponse){
            
            if(inquirerResponse.app.length > 1) {
                console.log("I'm sorry I can only do one request at a time!\n I'm just one bot!");
                return;
            };
            if(inquirerResponse.app[0] === 'Spotify this song') {
                spotifyInquierer();
            };
            if(inquirerResponse.app[0] === 'Movie this') {
                omdbRequest();
            };
            if(inquirerResponse.app[0] === 'Concert this') {
                bandsInTown();
            };
            if(inquirerResponse.app[0] === 'Do what it says') {
                doWhatItSays();
            };
        });
};
start();
function spotifyInquierer() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "Which band are you searching for?\n",
                name: "bandName"
            },
            {
                type: "input",
                message: "which song are you searching for?\n",
                name: "songName"

            }
        ])
        .then(function (inquirerResponse) {
            artist2.push(inquirerResponse.bandName);
            song.push(inquirerResponse.songName);

            liriApp();
        });
};
function omdbRequest() {
    var movieName = [];
    var movie = movieName[0];
    inquirer
        .prompt([
            {
                type: "input",
                message: "Which movie would you like to search?",
                name: "movieName"
            },
        ])
        .then(function (inquirerResponse){
            
            movieName.push(inquirerResponse.movieName);
            request("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy", function(error, response, body) {
                if (!error && response.statusCode === 200) {
                var title = JSON.parse(body).Title;
                var year = JSON.parse(body).Year;
                var rating = JSON.parse(body).imdbRating;
                var country = JSON.parse(body).Country;
                var array = JSON.parse(body).Ratings[1];
                var rT = array.Value;
                var languages = JSON.parse(body).Language;
                var plot = JSON.parse(body).Plot;
                var actors = JSON.parse(body).Actors;
                console.log(
                    "Title: " + chalk.blue(title) + "\n",
                    "Year: " + chalk.blue(year) + "\n",
                    "Rating: " + chalk.blue(rating) + "\n",
                    "Country: " + chalk.blue(country) + "\n",
                    "Rotten Tomatoes Score: " + chalk.blue(rT) + "\n",
                    "Languages: " + chalk.blue(languages) + "\n",
                    "Plot: " + chalk.blue(plot) + "\n",
                    "Actors: " + chalk.blue(actors) + "\n"
                )
                }
              });
            
        });
   
};
function bandsInTown() {
    var artist = [];
    inquirer
        .prompt([
            {type: "input",
             message: "Which band would you like to know about?",
             name: "bandName"
        }
        ])
        .then(function(inquirerResponse) {
            artist.push(inquirerResponse.bandName);
            request("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp", function(error, response, body) {
                var venueBody = JSON.parse(body);
                var venue = venueBody[0].venue.name;
                var city = venueBody[0].venue.city;
                var state = venueBody[0].venue.region;
                var date = venueBody[0].datetime;
                var displayDate = moment(date).format('LLLL');
                console.log(
                            chalk.blue("Next Concert:") + "\n",
                    "Venue: " + chalk.blue(venue) + "\n",
                    "City: " + chalk.blue(city) + "\n",
                    "State: " + chalk.blue(state) + "\n",
                    "Date: " + chalk.blue(displayDate) + "\n"


                );
                
            });
        });
};
function doWhatItSays() {
    song.push('I want it that way');
    artist2.push('backstreet boys');
    liriApp();
};
var song = [];
var artist2 = [];
function liriApp() {

    var Spotify = require('node-spotify-api');

    var spotify = new Spotify({
        id: "2585db6d92ea4318925d5a721b665a76",
        secret: "32fb1903eb9647dcb738481643c3d475"
    });
    spotify
        // .request('https://api.spotify.com/v1/albums/{id}/tracks')
        .request('https://api.spotify.com/v1/search?q=track:' + song + '%20artist:' + artist2 + '&type=track&limit=1')
        .then(function (data) {
            // console.log(data.tracks.items);
            var object = data.tracks.items;
            var realObject = object[0].album;
            var bandName = realObject.artists[0].name;
            var releaseDate = realObject.release_date;
            var songName = object[0].name;
            var trackNumber = object[0].track_number;
            var artistObject = realObject.artists;
            var artistLink = artistObject[0].href
            var rating = object[0].explicit;
            var previewLink = object[0].preview_url;
            var discName = realObject.name;
            console.log(
                "Search results for: " + chalk.blue(bandName) + "\n" +
                "Song name: " + chalk.blue(songName) + "\n" +
                "Song release date: " + chalk.blue(releaseDate) + "\n" +
                "Song is explicit: " + chalk.blue(rating) + "\n" +
                "Album: " + chalk.blue(discName) + "\n" +
                "Album track number: " + chalk.blue(trackNumber) + "\n" +
                "Preview this song! " + chalk.blue(previewLink) + "\n" +
                "Checkout more by this artist: " + chalk.blue(artistLink) + "\n"
                // `
                // Search results for: ${bandName}\n
                // Song name: ${songName}\n
                // Album: ${discName}\n
                // Song release data: ${releaseDate}\n
                // Song track number: ${trackNumber}\n
                // Song is explicit: ${rating}\n
                // Preview this song!: ${previewLink}\n
                // Checkout more by this artist: ${artistLink}`
            );



        });

};


