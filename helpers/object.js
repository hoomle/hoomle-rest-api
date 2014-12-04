/**
 * Remove property from object
 *
 * @param {Array} properties - Property to remove
 * @param {Object} object
 */
var removeProperties = function(properties, object) {
    // @TODO See to use node callback
    if (!Array.isArray(properties)) {
        throw new Error('properties is not an array');
    }
    var length = properties.length;
    for (var i=0; i < length; i++) {
        if (!object.hasOwnProperty(properties[i])) {
            continue;
        }
        object[properties[i]] = undefined;
    }
    return object;
};

/**
 * Test if 2 objects are equal
 * See: http://stackoverflow.com/questions/201183/how-do-you-determine-equality-for-two-javascript-objects/16788517#16788517
 *
 * @param {Object} x
 * @param {Object} y
 * @param {Boolean}
 */
var areEqual = function(x, y) {

    // if both are function
    if (x instanceof Function) {
        if (y instanceof Function) {
            return x.toString() === y.toString();
        }
        return false;
    }
    if (x === null || x === undefined || y === null || y === undefined) { return x === y; }
    if (x === y || x.valueOf() === y.valueOf()) { return true; }

    // if one of them is date, they must had equal valueOf
    if (x instanceof Date) { return false; }
    if (y instanceof Date) { return false; }

    // if they are not function or strictly equal, they both need to be Objects
    if (!(x instanceof Object)) { return false; }
    if (!(y instanceof Object)) { return false; }

    var p = Object.keys(x);
    return Object.keys(y).every(function (i) { return p.indexOf(i) !== -1; }) ?
        p.every(function (i) { return areEqual(x[i], y[i]); }) : false;
};

module.exports = {
    removeProperties: removeProperties,
    areEqual: areEqual
};