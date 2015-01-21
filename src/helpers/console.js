'use strict';

var clc              = require('cli-color'),
    colorGreen       = clc.xterm(155),
    colorRed         = clc.xterm(160),
    colorHighlightOk = clc.xterm(15).bgXterm(22);

var banner = function() {
    console.log('');
    console.log(colorGreen('  _                    _                             _'));
    console.log(colorGreen(' | |__    ___    ___  | |  ___          __ _  _ __  (_)'));
    console.log(colorGreen(' | \'_ \\  / _ \\  / _ \\ | | / _ \\ _____  / _` || \'_ \\ | |'));
    console.log(colorGreen(' | | | || (_) || (_) || ||  __/|_____|| (_| || |_) || |'));
    console.log(colorGreen(' |_| |_| \\___/  \\___/ |_| \\___|        \\__,_|| .__/ |_|'));
    console.log('');
};

var ok = function(message) {
    console.log(colorGreen(message));
};

var error = function(message) {
    console.log(colorRed(message));
};

var line = function(message) {
    message = message || '';
    console.log(message);
};

module.exports = {
    banner: banner,
    ok: ok,
    error: error,
    line: line,
    colorGreen: colorGreen,
    colorRed: colorRed,
    colorHighlightOk: colorHighlightOk,
    colorOk: colorGreen
};
