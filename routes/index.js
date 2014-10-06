var express = require('express');
var router = express.Router();
var http = require('http');

var mongojs = require('mongojs');

var databaseUrl = "moo"; 
var collections = ['t_users'];
var db = mongojs.connect(databaseUrl, collections);

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'SeeExpress', appname: 'nodeJs' });
});

router.get('/getUsers', function (req, res) {
	res.header("Access-Control-Allow-Origin", "http://localhost");
	res.header("Access-Control-Allow-Methods", "GET, POST");
        	// The above 2 lines are required for Cross Domain Communication(Allowing the methods that come as Cross           // Domain Request
	db.t_users.find('', function(err, users) { // Query in MongoDB via Mongo JS Module
		if(err || !users) {
			console.log("No users found");
		}else {
			res.writeHead(200, {'Content-Type': 'application/json'}); // Sending data via json
			str='[';
			users.forEach( function(user) {
				str = str + '{ "name" : "' + user.username + '"},' +'\n';
			});
			str = str.trim();
			str = str.substring(0,str.length-1);
			str = str + ']';
			res.end( str);
	    // Prepared the jSon Array here
		}
  });
});

router.post('/insertUser', function (req, res){
  console.log("POST: ");
  res.header("Access-Control-Allow-Origin", "http://localhost");
  res.header("Access-Control-Allow-Methods", "GET, POST");
  // The above 2 lines are required for Cross Domain Communication(Allowing the methods that come as Cross 
  // Domain Request
  console.log(req.body);
  console.log(req.body.mydata);
  var jsonData = JSON.parse(req.body.mydata);
  db.t_users.save({username: jsonData.username, password: jsonData.password, email: jsonData.email },
	function(err, saved) { // Query in MongoDB via Mongo JS Module
		 if( err || !saved ) res.end( "User not saved");
		 else res.end( "User saved");
	});
});

module.exports = router;