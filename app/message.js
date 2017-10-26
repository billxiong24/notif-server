/**
 * Message class to encapsulate contents of notification
 *
 * @param title the title of notification
 * @param body the body of notification
 * @param icon icon to show in notification
 */
function Message(title, body, icon) {
    this._title = title;
    this._icon = icon;
    this._body = body;
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
