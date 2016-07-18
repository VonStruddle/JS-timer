var interval;
var loading_value = 0;
var new_progress = 0;

// Begin pomodoro with animation of both timer and loading bar
$('.fa-play').click(function(event) {
	$(this).addClass('playing');
	interval = setInterval(function(){
		loading_value++;
		new_progress = loading_value * 100 / 25;
		$('.progress-bar').attr('aria-valuenow', new_progress).css('width', new_progress + '%');
		$('.timer').text(loading_value);
		if (loading_value === 25) {
			clearInterval(interval);
		} 
	}, 1000)
});

// Pause pomodoro, and restart timer and loading at same level
$('.fa-pause').click(function(event) {
	clearInterval(interval);
	$(this).addClass('pausing');
	setTimeout(function() {
		$('.fa-pause').removeClass('pausing');	
	}, 50);
});

// Ends pomodoro, clears timer and loading bar
$('.fa-stop').click(function(event) {
	clearInterval(interval);
	$(this).addClass('stoping');
	$('.fa-play').removeClass('playing');
	$('.progress-bar').attr('aria-valuenow', 0).css('width', '0%');
	$('.timer').text('00');
	loading_value = 0;
	new_progress = 0;
	setTimeout(function() {
		$('.fa-stop').removeClass('stoping');	
	}, 50);
});
