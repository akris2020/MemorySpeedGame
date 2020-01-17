var timer;
var prevNum;
var secondsCounter, minutesCounter;

$(document).on('click', '#restart', function() {
	prevNum = 0;
    secondsCounter = 0;
	minutesCounter = 0;
	$.ajax({
		url: "/start",
		success: function(rsp) {
			$('#main').html(rsp.html);
            $("#seconds").html(('00' + secondsCounter).substr(-2, 2));
   	    	$("#minutes").html(('00' + minutesCounter).substr(-2, 2));
   	    	clearTimeout(timer);
		}
	});
});

$(document).on('click', 'td', function() {
	event.preventDefault();
	var num = parseInt($(this).text());
	if (num == 1)
	{
    	$("#seconds").html(('00' + ++secondsCounter).substr(-2, 2));
    	timer = setInterval(function() {
    	    secondsCounter++;
    	    if (secondsCounter < 60)
    	    {
    	    	$("#seconds").html(('00' + secondsCounter).substr(-2, 2));
    	    }
    	    else
    	    {
    	    	secondsCounter = 0;
    	    	minutesCounter++
    	    	$("#seconds").html(('00' + secondsCounter).substr(-2, 2));
    	    	$("#minutes").html(('00' + minutesCounter).substr(-2, 2));
    	    }
    	}, 1000);
    }

    if (num - prevNum == 1)
	{
		prevNum = num;
		$(this).animate({"opacity": 0}, 300);

	    if (num >= 25)
	    {
	    	clearTimeout(timer);
	    }
	}
});

$("#restart").trigger("click");