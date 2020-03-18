var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET home page. */
router.get('/landing/wait', function(req, res, next) {
    // res.render('test', { title: 'Express' });
    res.sendfile('public/wait.html');
    // res.render('wait', { title: 'Express' });

});


module.exports = router;
