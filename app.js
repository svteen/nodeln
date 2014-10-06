var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongojs = require('mongojs');

var routes = require('./routes/index');
// var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/ngtpl', express.static(__dirname + '/ngtpl'));

var databaseUrl = "moo";
var collections = [];
var db = mongojs.connect(databaseUrl, collections);

var index = require('./routes/index');
var login = require('./routes/goto/login');
var about = require('./routes/about');

app.use('/', routes);
// app.use('/users', users);

app.use('/index', index);
app.use('/goto/login', login);
app.use('/about', about);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers
var fs = require('fs');

var path = './public';

fs.readdir(path, function(err, files) {  
    if (err) {  
        console.log('read dir error');  
    } else {  
        files.forEach(function(item) {  
            var tmpPath = path + '/' + item;  
            fs.stat(tmpPath, function(err1, stats) {  
                if (err1) {  
                    console.log('stat error');  
                } else {  
                    if (stats.isDirectory()) {  
                        //walk(tmpPath, floor, handleFile);  
                        
                    } else {  
                        //handleFile(tmpPath, floor);  
                    }  
                }  
            })  
        });  
    }  
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
