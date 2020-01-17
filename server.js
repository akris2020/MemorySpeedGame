var fs = require("fs");
var path = require("path");
var express = require("express");
var ejs = require("ejs");
var app = express();

app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));
app.engine('html', ejs.renderFile);

app.get('/', function(req, res) {
	res.render('index.html');
});

app.get('/start', function(req, res) {
	fs.readFile("views/speedmem.html", "utf-8", function(err, tpl) {
		if (err)
		{
			console.error(err);
			process.exit(1);
		}

		var numlist = [];
		for (var i = 0; i < 25; i++)
			numlist[i] = i + 1;
		
		shuffleArray(numlist);
		var html = ejs.render(tpl, {data: numlist});
		res.json({status: "OK", html: html});
	});
});

/**
 * Randomize array element order in-place.
 * Using Durstenfeld shuffle algorithm.
 */
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

app.listen(3000, function() {
	console.log("Server listening on port 3000");
});