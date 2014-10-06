var express = require('express');
var session = require('express-session');
var mongojs = require('mongojs');
var crypto = require('crypto');

var router = express.Router();

var databaseUrl = "moo";
var collections = ['t_users'];
var db = mongojs.connect(databaseUrl, collections);

/* GET post listing. */
router.get('/', function(req, res) {

	//  if(req.session.islogin){
	// console.log('usesession:' + req.session.islogin);
	// res.locals.islogin = req.session.islogin;
	//  }
  res.render('login', { title: '登陆页面' });
  
});

router.post('/auth', function(req, res){
	res.header("Access-Control-Allow-Origin", "http://localhost");
	res.header("Access-Control-Allow-Methods", "GET, POST");
	var jsonData = JSON.parse(req.body.mdata);
	db.t_users.find({
		username : jsonData.username,
		password : jsonData.password
	}, function(err, doc){
		console.log(doc);
		if(doc.length > 0){
			returnJson = '{"code" : "1101", "msg" : "sucess" }';
			res.end(returnJson);
		}else{
			returnJson = '{"code" : "2022", "msg" : "failed, User not found!"}';
			res.end(returnJson);
		}
	});
	//res.redirect('/');
});

module.exports = router;
