var gcm = require('fcm-node');

/**
 * Notification class to handle pushing notifications from server to client
 * @param API_KEY api key from google or whatever
 */

function Notification(API_KEY) {
    this._sender = new gcm(API_KEY);
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
    send.call(this, {
        to : subscribeName
    }, data, messageObj, callback);
};

function send(obj, data, messageObj, callback) {
    var message = {
        registration_ids: obj,
        data: data
    };

    this._sender.send(message, {
        obj
    }, function(err, res) {
        if(err)
            throw err;
        else
            console.log("push successful");

        callback(err, res);
    });
}

module.exports = Notification;
