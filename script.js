var interval;
var is_on = false;
var loading_value = 0;
var new_progress = 0;
var paused = false;
var max = 25;
var minutes = 0;
var seconds = 0;

function beginTimer() {
	interval = setInterval(function(){
			loading_value++;
			new_progress = (loading_value * 100) / (max * 60);
			$('.progress-bar').attr('aria-valuenow', new_progress).css('width', new_progress + '%');
			$('.progress-bar').text(Math.round(new_progress) + '%');
			minutes = Math.floor(loading_value / 60);
			seconds = loading_value % 60;
			if (minutes < 10 && seconds < 10) {
				$('.timer').text('0' + Math.floor(loading_value / 60) + ':0' + loading_value % 60);
			} else if (minutes < 10) {
				$('.timer').text('0' + Math.floor(loading_value / 60) + ':' + loading_value % 60);
			} else if (seconds < 10) {
				$('.timer').text(Math.floor(loading_value / 60) + ':0' + loading_value % 60);
			} else {
				$('.timer').text(Math.floor(loading_value / 60) + ':' + loading_value % 60);
			}
			is_on = true;
			if (loading_value === max * 60) {
				clearInterval(interval);
				$('.fa-play').removeClass('playing');
				is_on = false;
				minutes = 0;
				seconds = 0;
				if (max === 25) {
					max = 5;
				} else {
					max = 25;
				}
			}
		}, 1000);
}

function createBootstrapAlert() {
	if (max === 25) {
		$('body').prepend('<div class="alert alert-success"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>Get to work! You launched a 25 minutes Pomodoro!</div>');
	} else {
		$('body').prepend('<div class="alert alert-danger"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>Time to rest for 5 minutes!</div>');
	}
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
		createBootstrapAlert();
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
	}, 70);
});

// Ends pomodoro, clears timer and loading bar
$('.fa-stop').click(function(event) {
	resetLayout();
	$(this).addClass('stoping');
	setTimeout(function() {
		$('.fa-stop').removeClass('stoping');	
	}, 70);
});
