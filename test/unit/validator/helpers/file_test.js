'use strict';

var fileHelpers         = require('../../../../src/validator/helpers/file'),
    expect              = require('chai').expect,
    sinon               = require('sinon');

describe('validator / helpers / file / format()', function() {
    it('should valid the format', function(done) {
        var filepath = __dirname + '/fixtures/discover-682x626.jpg';

        fileHelpers.format(filepath, 'jpeg')
            .then(function(resolved) {
                expect(filepath)
                    .to.be.equals(resolved);

                done();
            });
    });

    it('should not valid the format', function(done) {
        var filepath = __dirname + '/fixtures/discover-682x626.jpg';

        fileHelpers.format(filepath, 'png')
            .then(null, function(err) {
                expect(err.filepath)
                    .to.be.equals(filepath);

                expect(err.code)
                    .to.be.equals('format.not_supported');

                done();
            });
    });

    it('should not valid the format (file is not an image)', function(done) {
        var filepath = __dirname + '/fixtures/not_an_image.jpg';

        fileHelpers.format(filepath, 'png')
            .then(null, function(err) {
                expect(err.filepath)
                    .to.be.equals(filepath);

                expect(err.code)
                    .to.be.equals('format.not_supported');

                done();
            });
    });
});

describe('validator / helpers / file / maxWidth()', function() {
    it('should valid the width', function(done) {
        var filepath = __dirname + '/fixtures/discover-682x626.jpg';

        fileHelpers.maxWidth(filepath, 700)
            .then(function(resolved) {
                expect(filepath)
                    .to.be.equals(resolved);

                done();
            });
    });

    it('should not valid the width', function(done) {
        var filepath = __dirname + '/fixtures/discover-682x626.jpg';

        fileHelpers.maxWidth(filepath, 600)
            .then(null, function(err) {
                expect(err.filepath)
                    .to.be.equals(filepath);

                expect(err.code)
                    .to.be.equals('width.too_high');

                done();
            });
    });

    it('should not valid the width (file is not an image)', function(done) {
        var filepath = __dirname + '/fixtures/not_an_image.jpg';

        fileHelpers.maxWidth(filepath, 700)
            .then(null, function(err) {
                expect(err.filepath)
                    .to.be.equals(filepath);

                expect(err.code)
                    .to.be.equals('width.too_high');

                done();
            });
    });
});

describe('validator / helpers / file / maxHeight()', function() {
    it('should valid the height', function(done) {
        var filepath = __dirname + '/fixtures/discover-682x626.jpg';

        fileHelpers.maxHeight(filepath, 700)
            .then(function(resolved) {
                expect(filepath)
                    .to.be.equals(resolved);

                done();
            });
    });

    it('should not valid the height', function(done) {
        var filepath = __dirname + '/fixtures/discover-682x626.jpg';

        fileHelpers.maxHeight(filepath, 600)
            .then(null, function(err) {
                expect(err.filepath)
                    .to.be.equals(filepath);

                expect(err.code)
                    .to.be.equals('height.too_high');

                done();
            });
    });

    it('should not valid the height (file is not an image)', function(done) {
        var filepath = __dirname + '/fixtures/not_an_image.jpg';

        fileHelpers.maxHeight(filepath, 700)
            .then(null, function(err) {
                expect(err.filepath)
                    .to.be.equals(filepath);

                expect(err.code)
                    .to.be.equals('height.too_high');

                done();
            });
    });
});

describe('validator / helpers / file / minHeight()', function() {
    it('should valid the height', function(done) {
        var filepath = __dirname + '/fixtures/discover-682x626.jpg';

        fileHelpers.minHeight(filepath, 600)
            .then(function(resolved) {
                expect(filepath)
                    .to.be.equals(resolved);

                done();
            });
    });

    it('should not valid the height', function(done) {
        var filepath = __dirname + '/fixtures/discover-682x626.jpg';

        fileHelpers.minHeight(filepath, 700)
            .then(null, function(err) {
                expect(err.filepath)
                    .to.be.equals(filepath);

                expect(err.code)
                    .to.be.equals('height.too_low');

                done();
            });
    });

    it('should not valid the height (file is not an image)', function(done) {
        var filepath = __dirname + '/fixtures/not_an_image.jpg';

        fileHelpers.minHeight(filepath, 700)
            .then(null, function(err) {
                expect(err.filepath)
                    .to.be.equals(filepath);

                expect(err.code)
                    .to.be.equals('height.too_low');

                done();
            });
    });
});

describe('validator / helpers / file / minWidth()', function() {
    it('should valid the width', function(done) {
        var filepath = __dirname + '/fixtures/discover-682x626.jpg';

        fileHelpers.minWidth(filepath, 600)
            .then(function(resolved) {
                expect(filepath)
                    .to.be.equals(resolved);

                done();
            });
    });

    it('should not valid the width', function(done) {
        var filepath = __dirname + '/fixtures/discover-682x626.jpg';

        fileHelpers.minWidth(filepath, 700)
            .then(null, function(err) {
                expect(err.filepath)
                    .to.be.equals(filepath);

                expect(err.code)
                    .to.be.equals('width.too_low');

                done();
            });
    });

    it('should not valid the width (file is not an image)', function(done) {
        var filepath = __dirname + '/fixtures/not_an_image.jpg';

        fileHelpers.minWidth(filepath, 700)
            .then(null, function(err) {
                expect(err.filepath)
                    .to.be.equals(filepath);

                expect(err.code)
                    .to.be.equals('width.too_low');

                done();
            });
    });
});
