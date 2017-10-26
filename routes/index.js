var express = require('express');
var router = express.Router();

var gcm = require('node-gcm');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/pushNotification', function(req, res, next) {
    var message = new gcm.Message({
        notification: {
        }
    });
});

module.exports = router;
