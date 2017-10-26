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
 */

Notification.prototype.push = function(registerIds, data, messageObj) {
    var message = new gcm.Message({
        priority: 'high',
        delayWhileIdle: true,
        contentAvailable: true,
        data: data,
        notification: messageObj.toJSON()
    });
};


module.exports = Notification;
