var express = require('express');
var router = express.Router();
var Notification = require('../app/notification.js');
var Message = require('../app/message.js');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.json("GET /");
});

/**
 * POST request to /pushNotification takes in the following data:
 * @param API_KEY the api key used to send request
 * @param ids an array of ids to send notification to
 * @param title the title of notification
 * @param body the body of notification
 * @param icon the icon to use for notification
 */
router.post('/pushNotification', function(req, res, next) {
    //res.send(req.body);
    var API_KEY = req.body.API_KEY;
    var ids = req.body.deviceIDs;
    ids = JSON.parse(req.body.deviceIDs);
    var data = !req.body.data ? {} : req.body.data;
    
    var notif = new Notification(API_KEY);

    notif.push(ids, data, new Message({
        title : req.body.title,
        body: req.body.body,
        icon: req.body.icon
    }),
    function(err, response) {
        res.json("finished");
    });
});

module.exports = router;
