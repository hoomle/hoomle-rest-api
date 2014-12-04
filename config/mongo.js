var configuration   = require('../config/configuration'),
    mongoose        = require('mongoose');

var conn = mongoose.createConnection(configuration.mongodb);

module.exports = {
    connection: conn,
    mongoose: mongoose
};