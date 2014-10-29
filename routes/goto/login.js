var express = require('express');
var session = require('express-session');
var crypto = require('crypto');
var mysql  = require('mysql');

var router = express.Router();

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

/* GET post listing. */
router.get('/', function(req, res) {
   res.render('login', { title: '欢迎' });
});

router.post('/auth', function(req, res){
	res.header("Access-Control-Allow-Origin", "http://localhost");
	res.header("Access-Control-Allow-Methods", "GET, POST");
	var jsonData = JSON.parse(req.body.mdata);
	sqlTxt = "SELECT * FROM tbl_user WHERE username = '" + jsonData.username +"' LIMIT 1";
	connection.query(sqlTxt, function(err, rows, fields){
		if(err){
        console.log('[query] - :'+err);
        return;
     	}
      if(rows[0] === undefined){
        console.log('The tbl_user is: ', rows[0]); 
      }else{
        console.log(rows[0]);
        returnJson = '{"code" : "1101", "msg" : "sucess" }';
        res.end(returnJson);
      }
	});
});

module.exports = router;
