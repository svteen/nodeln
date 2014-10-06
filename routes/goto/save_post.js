var express = require('express');
var router = express.Router();

//mongodb require
var mongodb = require("mongodb");
var mongoose = require('mongoose');

var server = new mongodb.Server('127.0.0.1', 27017, {auto_reconnect:true});  
var db = new mongodb.Db("svp", server, {safe:false});

/* GET post listing. */
router.get('/', function(req, res) {
  var title =  req.param('title');
  var tags = req.param('tags');
  var content = req.param('content');
  var to_be_inserted = { title: title, content: content };
  db.open(function(err, db){
    if(!err){
        console.log('Connect Mongodb Success!');
        db.createCollection('users', {safe: false}, function(err, collection){
            if(err){
                console.log(err);
            }else{
                collection.insert(to_be_inserted, function(err, obj){
                    if(err) throw err;
                });
            }
        });
    }else{
        console.log(err);
    }
  });
  res.render('post_success', { title: title, tags: tags, content: content });
});

module.exports = router;