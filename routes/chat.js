var express = require('express');
var router = express.Router();

/* GET chat listing. */
router.get('/', function(req, res) {
  res.render('chat', { title: 'nodeJs 聊天室', roomID: '1' });
});

module.exports = router;
