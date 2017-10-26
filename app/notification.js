var gcm = require('node-gcm');

/**
 * Notification class to handle pushing notifications from server to client
 * @param API_KEY api key from google or whatever
 */

function Notification(API_KEY) {
    this._sender = new gcm.Sender(API_KEY);
}


/**
 * Method to push notification to device ids
 * @param registerIds device ids to send notifications to
 * @param data the json object containing data
 * @param messageObj an object of type Message which contains contents of notifs
 * @param callback the callback function
 */

Notification.prototype.push = function(registerIds, data, messageObj, callback) {
    var message = new gcm.Message({
        priority: 'high',
        delayWhileIdle: true,
        contentAvailable: true,
        data: data,
        notification: messageObj.toJSON()
    });

    this._sender.send(message, {
        registrationTokens: registerIds
    }, function(err, res) {
        if(err)
            throw err;
        else
            console.log("push successful");

        callback(err, res);
    });
};

module.exports = Notification;
