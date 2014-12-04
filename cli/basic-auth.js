#!/usr/bin/env node

var CommandAsker    = require('command-asker'),
    cli             = require('../helpers/console'),
    testTools       = require('../test/tools');

cli.banner();
cli.ok("Interactive command to generate basic auth from credential");
cli.line();

var a = new CommandAsker([
    { key: 'login',     ask: 'login' },
    { key: 'password',  ask: 'password' }
]);

a.ask(function(response) {
    cli.line();
    cli.line(
        cli.colorOk("BasicAuth: ") + cli.colorHighlightOk(testTools.buildBasicAuthorization(response.login, response.password))
    );
    a.close(0);
});
