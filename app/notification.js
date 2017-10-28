var gcm = require('fcm-node');
var request = require('request');

/**
 * Notification class to handle pushing notifications from server to client
 * @param API_KEY api key from google or whatever
 */

function Notification(API_KEY) {
    this._API_KEY = API_KEY;
    this._sender = new gcm(API_KEY);
    this._FCM = require('fcm-push');
}


/**
 * Method to push notification to device ids
 * @param registerIds device ids to send notifications to
 * @param data the json object containing data
 * @param messageObj an object of type Message which contains contents of notifs
 * @param callback the callback function
 */

Notification.prototype.push = function(registerIds, data, messageObj, callback) {
    data = {
        ar_message: "test message"
    };

    send.call(this, registerIds, data, messageObj, callback);
};

Notification.prototype.pushSubscribe = function(subscribeName, data, messageObj, callback) {
    var message = {
        to: subscribeName, 
        data: {
            key1: 'key1'
        }, 
        notification: messageObj
    };

    this._FCM.send(message).then(function(response) {
        callback(response);
    })
    .catch(function(err) {
        console.error(err);
    });
};


Notification.prototype.pushRequest = function(topic, messageObj, callback) {
    var apikey = this._API_KEY;
    request({
        url: 'https://fcm.googleapis.com/fcm/send',
        method: 'POST',
        headers: {
            'Content-Type' :' application/json',
            'Authorization': 'key='+apikey
        },
        body: JSON.stringify({
            notification: messageObj,
            to : topic
        })
    }, function(error, response, body) {
        if (error) { 
            console.error(error); 
            throw error;
        }

        callback(error, response, body);
    }); 
};

function send(obj, data, messageObj, callback) {
    var message = {
        registration_ids: obj,
        data: data
    };

    this._sender.send(message, function(err, res) {
        if(err)
            throw err;
        else
            console.log("push successful");

        callback(err, res);
    });
}

module.exports = Notification;
