$(document).ready(function(){


    // Array that holds giphs.
    var topics = ["DJ", "Party", "Dancers", "Hand Shake", "Camera", "City Lights", "Drone", "Rave", "Music Video", "New York", "Night Life", "Money", "Hollywood", "Miami", "Shots", "Downtown", "Red Carpet", "Las Vegas", "Shopping"];

    // Retrieve giphs for selected topic.
    function displayImg(){

        
        $("#display-images").empty();
        var input = $(this).attr("data-name");
        // Query giphy API retrieving 10 giphs.
        var limit = 10;
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + input + "&limit=" + limit + "&api_key=dc6zaTOxFJmzC";   

        // Create AJAX call for the specific topic.
        $.ajax({
            url: queryURL, 
            method: "GET"
        }).done(function(response) {

            for(var j = 0; j < limit; j++) {    

                var displayDiv = $("<div>");
                displayDiv.addClass("holder");
            
                var image = $("<img>");
                image.attr("src", response.data[j].images.original_still.url);
                image.attr("data-still", response.data[j].images.original_still.url);
                image.attr("data-animate", response.data[j].images.original.url);
                image.attr("data-state", "still");
                image.attr("class", "gif");
                displayDiv.append(image);

                // Store the rating data for a giph.
                var rating = response.data[j].rating;
                console.log(response);
                // Create an element to store the rating info.
                var pRating = $("<p>").text("Rating: " + rating);
                // Display rating.
                displayDiv.append(pRating)

                $("#display-images").append(displayDiv);
            }
        });
    }

    // Render buttons for each topic in topics array.
    function renderButtons(){ 

        $("#display-buttons").empty();

        // Loop through the array of topics
        for (var i = 0; i < topics.length; i++){

              // Dynamically generate buttons for each topic in the array.
            var newButton = $("<button>") 
            newButton.attr("class", "btn btn-default");
            newButton.attr("id", "input")  
              // Add a data-attribute needed for giph search.
            newButton.attr("data-name", topics[i]); 
            // Provides button text.
            newButton.text(topics[i]); 
            $("#display-buttons").append(newButton); 
        }
    }

    function imageChangeState() {          

        // Set the value of "data-state" attribute.
        var state = $(this).attr("data-state");
        var animateImage = $(this).attr("data-animate");
        var stillImage = $(this).attr("data-still");

        // If the clicked image's state is still, update its src attribute to animateImage
        // Then, set the image's data-state to animate.
        // Else if set src to the stillImage value.
        // Then, set the image's data-state to still.
        if(state == "still") {
            $(this).attr("src", animateImage);
            $(this).attr("data-state", "animate");
        }

        else if(state == "animate") {
            $(this).attr("src", stillImage);
            $(this).attr("data-state", "still");
        }   
   
   
    }

    // Add click event listener
    $("#submitPress").on("click", function(){

        // Create new topics from user-input value.
        // Push topic to topics array.
        // Render buttons.
        var input = $("#user-input").val().trim();
        form.reset();
        topics.push(input);
                
        renderButtons();

        return false;
    })

    renderButtons();

    // Add click event listeners
    $(document).on("click", "#input", displayImg);
    $(document).on("click", ".gif", imageChangeState);
});