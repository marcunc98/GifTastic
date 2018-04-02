

// alert("JavaScript connection is good!")

var searchSport = ["NBA", "Tennis", "NFL", "UNC"];


function renderButtons() {


    $("#sport-button").empty();

    // Loop through the array of sports indexes, then generate buttons for each sport/sport reference in the array

    for (var i = 0; i < searchSport.length; i++) {
        var button = $("<button>");
        button.addClass("sport-button");
        button.attr("data-type", searchSport[i]);
        button.text(searchSport[i]);
        $("#sport-button").append(button);
    }

}
renderButtons();

$(document).on("click", ".sport-button", function () {

    var type = $(this).data("type");
    // console.log(type);

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=WiCFO3n6n3STYQQWOrP4VgpPFAsbWjdF&limit=8";

    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (response) {
        console.log(response.data[0].rating);
        for (var j = 0; j < response.data.length; j++) {

            var searchDiv = $('<div class="search-item">');
            var rating = response.data[j].rating;
            // console.log(response.data[j].rating);
            var paragraphDiv = $("<p>").text('Rating: ' + rating);
            var animated = response.data[j].images.fixed_height.url;
            // console.log(response.data[0].images.fixed_height_still.url);
            var still = response.data[j].images.fixed_height_still.url;
            var image = $("<img>");


            image.attr("src", still);
            image.attr("data-still", still);
            image.attr("data-animated", animated);
            image.attr("data-state", "still");
            image.addClass("searchimage");
            searchDiv.append(paragraphDiv);
            searchDiv.append(image);
            $("#searches").prepend(searchDiv);
        }
    })
})



//**FUNCTION TO ANIMATE */
$(document).on("click", ".searchimage", function () {
    var state = $(this).attr("data-state");
    if (state == "still") {
        $(this).attr("src", $(this).data("animated"));
        $(this).attr("data-state", "animated");

    } else {
        $(this).attr("src", $(this).data("still"));
        $(this).attr("data-state", "still");
    }
})


//**FUNCTION THAT GRABS NEW INPUT TEXT AND PUSH TO OUR ARRAY, CREATES A NEW BUTTON */


// This function handles events where the add movie button is clicked
$("#add-sport").on("click", function (event) {
    // event.preventDefault() prevents submit button from trying to send a form.
    // Using a submit button instead of a regular button allows the user to hit
    // "Enter" instead of clicking the button if desired
    event.preventDefault();

    // Write code to grab the text the user types into the input field
    // Write code to add the new movie into the movies array
    var userText = $("#search-input").val().trim();
    console.log(userText);
    $("#search-input").val("");// in jQuery, if you don't pass a value to .val, the current value will be returned
    // if you pass a parameter into .val however, it sets that value. So here we set the value to an empty string

    if (!(searchSport.indexOf(userText) > -1)); // wants to know if the movie is not in the array. 
    //It's simply going in finding out if the index of typed in movie exist(! or does NOT exist) 
    searchSport.push(userText);
    console.log(searchSport);

    renderButtons();
    return false
});

var image = ['https://media1.tenor.com/images/a968b96478a66d992add54cec040ebcc/tenor.gif?itemid=9762828'];
$(".image-container").append(image);
$(".image-container").css("background-image", "url('" + image + "')");