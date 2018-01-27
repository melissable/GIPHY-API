var movieTitle = [`Moana`, `Harry Potter`, `Fifth Element`, `Big Lebowski`, `Star Wars`, `Lord of the Rings`, `Blues Brothers`, `Groundhog Day`, `Life Aquatic with Steve Zissou`];
var currentGif; var pausedGif; var animatedGif; var stillGif;

//creates buttons - having trouble w/the append: it's adding all the titles again with the new title at the end w/ each submit
function createButtons(){
	$('#TVButtons').empty();
	for(var i = 0; i < movieTitle.length; i++){
		var movieBtn = $('<button>').text(movieTitle[i]).addClass('movieBtn').attr({'data-name': movieTitle[i]});
		$('#movieButtons').append(movieBtn);
	}

	//displays gifs on click
	$('.movieBtn').on('click', function(){
		$('.display').empty();

		var thisMovie = $(this).data('name');
		var giphyURL = "https://api.giphy.com/v1/gifs/search?q=movie+" + thisMovie + "&limit=10&api_key=bPjTXMhHZiQieq7mGJ8FveboHuWdgI0L";
		$.ajax({url: giphyURL, method: 'GET'}).done(function(giphy){
			currentGif = giphy.data;
			$.each(currentGif, function(index,value){
				animatedGif= value.images.original.url;
				pausedGif = value.images.original_still.url;
				var thisRating = value.rating;
				//gives blank ratings 'unrated' text
				if(thisRating == ''){
					thisRating = 'unrated';
				}
				var rating = $('<h5>').html('Rated: '+thisRating).addClass('ratingStyle');
				stillGif= $('<img>').attr('data-animated', animatedGif).attr('data-paused', pausedGif).attr('src', pausedGif).addClass('playOnHover');
				var fullGifDisplay = $('<button>').append(rating, stillGif);
				$('.display').append(fullGifDisplay);
			});
		});
	});
}

//animates and pauses gif on hover
$(document).on('mouseover','.playOnHover', function(){
 	   	$(this).attr('src', $(this).data('animated'));
 });
 $(document).on('mouseleave','.playOnHover', function(){
 	   	$(this).attr('src', $(this).data('paused'));
 });

//sets a button from input
$('#addMovie').on('click', function(){
	var newMovie = $('#newMovieInput').val().trim();
	movieTitle.push(newMovie);
	createButtons();
	return false;
});

createButtons();

