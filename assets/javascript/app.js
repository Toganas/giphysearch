var apikey = "6Iw6Cta0oCIkkg1qd9wk9LjmDN5tfZM4"

// List of Video Games to go up top

var games = ["Assassin's Creed", "God of War", "Destiny 2", "Apex Legends", "Super Mario Bros.", "Final Fantasy", "World of Warcraft", "HALO", "Forza Motorsports", "Sonic the Hedgehog"]
// Creating buttons to put up top
function makeButtons(){ 
    
    $("#buttons").empty();
for (var i = 0; i < games.length; i++) {
    var btn = $("<button>")
    btn.text(games[i]);
    btn.attr("data-game", games[i]);
    btn.addClass("display")
    $("#buttons").append(btn);
}}
// making a button for a new game

$("#makeButton").on("click", function(event){
    event.preventDefault();
    // grabbing the new game name from the search box
    var newGame = $("#search").val().trim()
    games.push(newGame);
    makeButtons();
})

makeButtons();

// on click

$(document).on("click",".display", function () {
    // q = grabbed from text input box.
    // limit = number of images to grab


    var videoGame = $(this).attr("data-game");
    console.log(videoGame);
    // query URL

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + videoGame + "&api_key=" + apikey + "&limit=10";


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
            // attaching the attributes to the img tag
            gameImage.attr("src", results[i].images.fixed_height_still.url);
            gameImage.attr("data-still", results[i].images.fixed_height_still.url);
            gameImage.attr("data-move", results[i].images.fixed_height.url)
            // setting the Data-state
            gameImage.attr("data-state", "still")
            // giving the images a class
            gameImage.addClass("gif")
            // putting the div together
            gameDiv.append(rating);
            gameDiv.append(gameImage);

            // putting the Images on the page
            $("#image").prepend(gameDiv);

        }
    })

})

// clicking images to make them move
$(document).on("click", ".gif", function () {
    // making data-state a variable
    var state = $(this).attr("data-state");
    // checking the data-state and reversing it
    if (state === "still") {
        // make it animate if still
        $(this).attr("src", $(this).attr("data-move"));
        $(this).attr("data-state", "move");
    }
    // make it still if animated
    else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
    console.log(this);
});