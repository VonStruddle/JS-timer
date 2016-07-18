var interval;
var is_on = false;
var loading_value = 0;
var new_progress = 0;
var paused = false;

function beginTimer() {
	interval = setInterval(function(){
			loading_value++;
			new_progress = loading_value * 100 / 25;
			$('.progress-bar').attr('aria-valuenow', new_progress).css('width', new_progress + '%');
			$('.progress-bar').text(new_progress + '%');
			$('.timer').text(loading_value);
			is_on = true;
			if (loading_value === 25) {
				clearInterval(interval);
				$('.fa-play').removeClass('playing');
				is_on = false;
			}
		}, 1000);
}

function resetLayout() {
	clearInterval(interval);
	is_on = false;
	$('.fa-play').removeClass('playing');
	$('.progress-bar').attr('aria-valuenow', 0).css('width', '0%');
	$('.progress-bar').text('0%');
	$('.timer').text('00');
	loading_value = 0;
	new_progress = 0;
}

// Begin pomodoro with animation of both timer and loading bar
$('.fa-play').click(function(event) {
	if (is_on === false) {
		resetLayout();
		$(this).addClass('playing');
		beginTimer();
	} else if (paused === true) {
		$(this).addClass('playing');
		beginTimer();
		paused = false;
	}
});

// Pause pomodoro, and restart timer and loading at same level
$('.fa-pause').click(function(event) {
	clearInterval(interval);
	$(this).addClass('pausing');
	paused = true;
	$('.fa-play').removeClass('playing');
	setTimeout(function() {
		$('.fa-pause').removeClass('pausing');	
	}, 50);
});

// Ends pomodoro, clears timer and loading bar
$('.fa-stop').click(function(event) {
	resetLayout();
	$(this).addClass('stoping');
	setTimeout(function() {
		$('.fa-stop').removeClass('stoping');	
	}, 50);
});
