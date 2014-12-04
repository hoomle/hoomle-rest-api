#!/usr/bin/env node

var CommandAsker        = require('command-asker'),
    cli                 = require('../../helpers/console'),
    Status              = require('../../models/index').Status,
    userService         = require('../../services/index').User,
    projectService      = require('../../services/index').Project,
    userValidator       = require('../../validator/index').User,
    projectValidator    = require('../../validator/index').Project;

cli.banner();
cli.ok("Interactive command to add new status");
cli.line();

var a = new CommandAsker([
    { key: 'content',   ask: 'content',         validators: [] },
    { key: 'owner',     ask: 'user (email)',    validators: [userValidator.email, userValidator.emailExist] },
    { key: 'project',   ask: 'project (slug)',  validators: [projectValidator.slug, projectValidator.slugExist], optional: true }
]);

a.ask(function(response) {
    userService.findOneReadOnlyByEmail(response.owner)
    .then(function(user) {
        response.owner = user._id;
        if (response.project && response.project.length > 0) {
            return projectService.findOneReadOnlyBySlug(response.project)
                .then(function(project) {
                    response.project = project._id;
                    return Status.create(response);
                });
        } else {
            response.project = null;
        }
        return Status.create(response);
    })
    .then(function (createdStatus) {
        cli.line();
        cli.line(
            cli.colorOk('The status "') + cli.colorHighlightOk(createdStatus.content) + cli.colorOk('" has been created.')
        );
        cli.ok("Thanks.");
        a.close();
    }, function() {
        cli.line();
        cli.error("An error occured during saving ...");
        a.close(1);
    }); 
});
