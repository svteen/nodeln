var express = require('express');
var router = express.Router();

/* GET post listing. */
router.get('/', function(req, res) {
  var name = req.params.name;
  res.render('post', { title: '发布文章' });
});

module.exports = router;