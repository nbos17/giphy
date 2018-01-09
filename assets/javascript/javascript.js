var searches = ["cat", "dog", "basketball", "football", "sports", "trump", "sad", "excited"];

      
function displayGif() {

  var search = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + search + "&limit=10&api_key=POujlkwdAc7kdBg5HO0uqTzEparcKo07";

  
  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response) {
    $('#gifs-view').empty();
    for (i = 0; i < response.data.length; i++) {
      var newDiv = $('<div>');
      newDiv.addClass('holder');
      var gifyAnimate = response.data[i].images["fixed_height"].url;
      var gifyStill = response.data[i].images["fixed_height_still"].url;
      var rating = response.data[i].rating;
      var pTag = $('<p>');
      pTag.text("Rating: " + rating);
      var image = $('<img>');
      image.attr('src', gifyStill);
      image.addClass('giphy');
      image.attr('data-state', 'still');
      image.attr('data-animate', gifyAnimate);
      image.attr('data-still', gifyStill);
      newDiv.append(image);
      newDiv.prepend(pTag);
      $('#gifs-view').append(newDiv);
    }

    $(".giphy").on("click", function() {
      
      var state = $(this).attr("data-state");
      console.log(state);
      
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });

  });

}


function renderButtons() {

  $("#buttons-view").empty();
  
  for (var i = 0; i < searches.length; i++) { 
    var a = $("<button>");
    a.addClass("gif");
    a.attr("data-name", searches[i]);
    a.text(searches[i]);
    $("#buttons-view").append(a);
  }
}

$("#add-search").on("click", function(event) {
  event.preventDefault();
  var choice = $("#input").val().trim();
  searches.push(choice);
  renderButtons();
});


$(document).on("click", ".gif", displayGif);


renderButtons();