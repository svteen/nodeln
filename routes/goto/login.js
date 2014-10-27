var express = require('express');
var session = require('express-session');
//var mongojs = require('mongojs');
var crypto = require('crypto');
var mysql  = require('mysql');

var router = express.Router();

//var databaseUrl = "moo";
//var collections = ['t_users'];
//var db = mongojs.connect(databaseUrl, collections);

//创建一个connection
var connection = mysql.createConnection({     
  host     : 'localhost',
  user     : 'root',
  password : '1111',
  port: '3306',
  database: 'vpster',
}); 
//创建一个connection
connection.connect(function(err){
    if(err){        
      	console.log('[query] - :'+err);
        return;
    }
      console.log('[connection connect]  succeed!');
});  
//执行SQL语句
connection.query('SELECT * from tbl_user', function(err, rows, fields) { 
     if(err){
            console.log('[query] - :'+err);
        return;
     }
     console.log('The tbl_user is: ', rows[0]);  
});

/* GET post listing. */
router.get('/', function(req, res) {
  res.render('login', { title: '登陆页面' });
});

router.post('/auth', function(req, res){
	res.header("Access-Control-Allow-Origin", "http://localhost");
	res.header("Access-Control-Allow-Methods", "GET, POST");
	var jsonData = JSON.parse(req.body.mdata);

	/*db.t_users.find({
		username : jsonData.username,
		password : jsonData.password
	}, function(err, doc){
		console.log(doc);
	});*/
	//res.redirect('/');
});

module.exports = router;

