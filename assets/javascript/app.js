
var topics = ["forest", "lake", "mountain", "rain", "canyon", "desert", "sunset", "waves", "fog"];

    // function trying to fix bug
    function resetDiv () {
    	if ($(".gif").hasClass("animate")) {
    		$(".gif").removeClass("animate");
    	}
    }
    // button creation
    function renderButtons() {
    	$("#button-container").empty();

    	for (i=0; i<topics.length; i++) {
    		var x = $("<button>");
    		x.addClass("topic btn btn-lg")
    		.attr("data-name", topics[i])
    		.text(topics[i]);
    		$("#button-container").append(x);
    	}
     }
    // adding new button
    $("#add-button").on("click", function(event) {
	  	event.preventDefault();
	  	var topic = $("#topic-input").val().trim();
	  	topics.push(topic);
	  	renderButtons();

    })

      renderButtons();
      resetDiv();

  // pushing gifs and ratings to page upon button click (triggered at bottom of page)
  function appearGif() {

		var topic = $(this).attr("data-name");
		var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=KgeeIdguXEHsO0CX11g7rQe4H7NdFZ0Q&q=" + topic + "&limit=10&offset=0&lang=en_s.gif";

	  $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
       
      var results = response.data;
        for (i=0; i<results.length; i++) {
          var gifDiv = $("<div class='gif-div'>");

         	var rating = results[i].rating;
         	var p = $("<p>").text("Rating: " + rating);
       
        	var gifImage = $("<img class='gif'>");
 								
          	gifImage.attr("data-state", "still");
          	gifImage.attr("src", results[i].images.fixed_height_still.url);

          gifDiv.prepend(p).prepend(gifImage);
          $("#gifs-on-screen").prepend(gifDiv);
   			}          
  	});

    function emptyDiv () {
    	$(gifDiv).clear();
      
    }

    emptyDiv();
    
 }

 	  //if else statement to pause and play
$(document).on('click', '.gif', function() {
  var src = $(this).attr("src");

	if ($(this).hasClass("animate")){
	//pause
	  $(this).attr("src", src.replace(/\.gif/i, "_s.gif"))
	  $(this).removeClass("animate");
	  console.log("pause");
	  return("pause");

	} else {
	//play
	 $(this).addClass("animate");
	 $(this).attr("src", src.replace(/\_s.gif/i, ".gif"))
	 console.log("play");
	 return("pause");
	}
 });

   $(document).on("click", ".topic", resetDiv);
   $(document).on("click", ".topic", appearGif);
 