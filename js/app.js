
var inquirer = require("inquirer");
var chalk = require("chalk");
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
    .then(function(inquirerResponse) {
        artist2.push(inquirerResponse.bandName);
        song.push(inquirerResponse.songName);
        
        liriApp();
    });
var song = [];
var artist2 = [];
// if (process.argv.length === 4) {
//     song = [process.argv[3]];
//     artist2 = [process.argv[2]];
//     liriApp();
// };
// if (process.argv.length === 5) {

//     artist2.push(process.argv[2]);
//     artist2.push(process.argv[3]);
//     song.push(process.argv[4]);
//     console.log(artist2);
//     console.log(song);
//     liriApp();
// };

// if (process.argv.length === 6) {
//     artist2.push(process.argv[2]);
//     artist2.push(process.argv[3]);
//     song.push(process.argv[4]);
//     song.push(process.argv[5]);
//     console.log(artist2);
//     console.log(song);
//     liriApp();
// };
// for(var i = 4; i < process.argv.length; i++) {
//     artist2.push(process.argv[2]);
//     artist2.push(process.argv[3]);
//     song.push(process.argv[i]);
//     liriApp();
// };
// console.log(artist2);
// console.log(song);
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
                "Song name: " + chalk.red(songName) + "\n" +
                "Album: " + chalk.green(discName) + "\n" +
                "Song release date: " + chalk.yellow(trackNumber) + "\n" +
                "Song is explicit: " + chalk.keyword('purple')(rating) + "\n" + 
                "Preview this song! " + chalk.keyword('orange')(previewLink) + "\n" +
                "Checkout more by this artist: " + chalk.keyword('pink')(artistLink) + "\n"
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


