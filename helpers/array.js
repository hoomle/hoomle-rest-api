/**
 * Push object to property of an object.
 * If the property doesn't exist, the property will be created.
 *
 * @param {Object} object
 * @param property
 * @param item
 */
var pushToPropertyUnknow = function(object, property, item) {
    if (!object.hasOwnProperty(property)) {
        object[property] = [];
    }
    object[property].push(item);
};

module.exports.pushToPropertyUnknow = pushToPropertyUnknow;