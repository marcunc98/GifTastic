// $(document).ready(function() {

// alert("I am working!")

var searchArray = ["NBA", "Tennis", "NFL", "UNC"];

function renderButtons(searchArray, classToAdd, areaToAddTo) {
    $(areaToAddTo).empty;
    for (var i = 0; i < searchArray.length; i++) {
        var newButton = $("<button>");
        newButton.addClass(classToAdd);
        newButton.attr("data-type", searchArray[i]);
        newButton.text(searchArray[i]);
        $(areaToAddTo).append(newButton);
    }
}

renderButtons(searchArray, "searchButton", "#sport-button");

$(document).on("click", ".searchButton", function () {

    var type = $(this).data("type");
    // console.log(type);

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=WiCFO3n6n3STYQQWOrP4VgpPFAsbWjdF&limit=8";

    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (response) {
        console.log(response.data[0].rating);
        for (var j = 0; j < response.data.length; j++);
        var searchDiv = $('<div class="search-item">');
        var rating = response.data[j].rating;
        // console.log(response.data[j].rating);
        var paragraphDiv = $("<p>").text('Rating: ' + rating);
        var animated = response.data[j].images.fixed_height.url;
        var image = $("<img>");
        image.attr("src",still);
        image.attr("data-still",still);
        image.attr("data-animated",animated);
        image.attr("data-state","still");
        image.addClass("searchimage");
        searchDiv.append(paragraphDiv);
        searchDiv.append(image);
        $("sport-button").append(searchDiv);
        
    })
})


