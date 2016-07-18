// Begin pomodoro with animation of both timer and loading bar
$('.fa-play').click(function(event) {
	$(this).toggleClass('playing');
	var loading_value = 0;
	var new_progress = 0;
	var interval = setInterval(function(){
		loading_value++;
		new_progress = loading_value * 100 / 25;
		$('.progress-bar').attr('aria-valuenow', new_progress).css('width', new_progress + '%');
		$('.timer').text(loading_value);
		if (loading_value === 25) {
			clearInterval(interval);
		} 
	}, 1000)
});

// Ends pomodoro, clears timer and loading bar
$('.fa-stop').click(function(event) {
	clearInterval(interval);
});
