var apikey = "6Iw6Cta0oCIkkg1qd9wk9LjmDN5tfZM4"

// List of Video Games to go up top

var games = ["Assassin's Creed", "God of War", "Destiny 2", "Apex Legends", "Super Mario Bros.", "Final Fantasy", "World of Warcraft", "HALO", "Forza Motorsports", "Sonic the Hedgehog"]
// Creating buttons to put up top
for (var i = 0; i < games.length; i++) {
    var btn = $("<button>")
    btn.text(games[i]);
    btn.attr("data-game", games[i]);
    $("#buttons").append(btn);
}


// on click

$("button").on("click", function () {
    // q = grabbed from text input box.
    // limit = number of images to grab


    var videoGame = $(this).attr("data-game");
    console.log(videoGame);
    // query URL

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + videoGame + "&api_key=" + apikey + "&limit=5";


    // AJAX query

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        console.log(queryURL);
        console.log(response);

        var results = response.data;
        // for loop going through results
        for (var i = 0; i < results.length; i++) {
            // div tag
            var gameDiv = $("<div>");
            // variable for the rating of the gif
            var rating = $("<p>").text("Rating: " + results[i].rating);
            // img tag creation
            var gameImage = $("<img>");
            // attaching the src to the img tag
            gameImage.attr("src", results[i].images.fixed_height_still.url);
            // putting the div together
            gameDiv.append(rating);
            gameDiv.append(gameImage);
            // putting the Images on the page
            $("#image").prepend(gameDiv);
        }
    })

})