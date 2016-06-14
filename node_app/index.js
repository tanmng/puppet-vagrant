//Lets require/import the HTTP module
var http = require('http');

// Create a dispatcher
var dispatcher = require('httpdispatcher');

//Lets define a port we want to listen to
const PORT=8080; 


// Connect to Mysql database
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'REQUIRED',
  user     : 'REQUIRED',
  password : 'REQUIRED',
  database : 'REQUIRED',
});

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + connection.threadId);
});

//Lets use our dispatcher
function handleRequest(request, response){
    try {
        //log the request on console
        console.log(request.url);
        //Disptach
        dispatcher.dispatch(request, response);
    } catch(err) {
        console.log(err);
    }
}

//Create a server
var server = http.createServer(handleRequest);


//Lets start our server
server.listen(PORT, function(){
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", PORT);
});


// Get the sum of last 10 vote submit
dispatcher.onGet('/sumlast10', function(req, res) {
    // Query the database - stupid way
    connection.query('SELECT SUM(vote_value) AS sum FROM votes ORDER BY date_added DESC LIMIT 10;', function(err, rows, fields) {
        if (err) throw err;

        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('The solution is: ' + rows[0].sum);
    });
});

// Add a vote
dispatcher.onPost("/submit_vote", function(req, res) {
    function IsNumeric(input)
    {
        return (input - 0) == input && (''+input).trim().length > 0;
    }

    // Parse the value
    if (req.params.value != undefined && IsNumeric(req.params.value))
    {
        vote_value = req.params.value;

        // Save to DB
        connection.query('INSERT INTO votes (vote_value, date_added) VALUES (' + vote_value + ', NOW());', function(err, rows, fields) {
            if (err) throw err;

            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('Saved your vote: ' + vote_value);
        });
    }
    else
    {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('Incorrect parameter');
    }
});
