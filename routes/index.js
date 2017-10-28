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
    //var ids = req.body.deviceIDs;
    var ids = JSON.parse(req.body.deviceIDs);
    var topic = req.body.topic;
    var data = !req.body.data ? {} : req.body.data;
    
    var notif = new Notification(API_KEY);

    notif.pushRequest(topic, new Message({
        title : req.body.title,
        body: req.body.body,
        icon: req.body.icon
    }),
    function(error, response, body) {
        console.log(body);
        console.log(response);
        res.json(response);
    });

    //notif.pushSubscribe(topic,  data, new Message({
        //title : req.body.title,
        //body: req.body.body,
        //icon: req.body.icon
    //}),
    //function(response) {
        //console.log(response);
        //res.json(response);
    //});
});

module.exports = router;
