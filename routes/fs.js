var express = require('express'); 
var router = express.Router();
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
                        walk(tmpPath, floor, handleFile);  
                    } else {  
                        handleFile(tmpPath, floor);  
                    }  
                }  
            })  
        });  
    }  
});