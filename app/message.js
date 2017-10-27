/**
 * Message class to encapsulate contents of notification
 *
 * @param jsonObj the JSON object containing message details. The JSON object
 * should contain fields title, icon, body to populate the notification.
 */
function Message(jsonObj) {

    this._title = jsonObj.title;
    this._icon = jsonObj.icon;
    this._body = jsonObj.body;
}

/**
 * convert fields to JSON
 * if icon does not exist, don't include in JSON
 */
Message.prototype.toJSON = function() {
    return {
        title : this._title,
        icon: this._icon ? this._icon : undefined,
        body: this._body
    };
};


module.exports = Message;
