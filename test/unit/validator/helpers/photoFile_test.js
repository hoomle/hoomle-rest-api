'use strict';

var photoFileHelpers    = require('../../../../src/validator/helpers/photoFile'),
    expect              = require('chai').expect,
    sinon               = require('sinon');

describe('validator / helpers / photoFile', function() {
    describe('validator / helpers / photoFile / format()', function() {
        it('should valid the format', function(done) {
            var filepath = __dirname + '/fixtures/discover-682x626.jpg';

            photoFileHelpers.format(filepath, 'jpeg')
                .then(function(resolved) {
                    expect(filepath)
                        .to.be.equals(resolved);

                    done();
                });
        });

        it('should not valid the format', function(done) {
            var filepath = __dirname + '/fixtures/discover-682x626.jpg';

            photoFileHelpers.format(filepath, 'png')
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

            photoFileHelpers.format(filepath, 'png')
                .then(null, function(err) {
                    expect(err.filepath)
                        .to.be.equals(filepath);

                    expect(err.code)
                        .to.be.equals('format.not_supported');

                    done();
                });
        });
    });

    describe('validator / helpers / photoFile / maxWidth()', function() {
        it('should valid the width', function(done) {
            var filepath = __dirname + '/fixtures/discover-682x626.jpg';

            photoFileHelpers.maxWidth(filepath, 700)
                .then(function(resolved) {
                    expect(filepath)
                        .to.be.equals(resolved);

                    done();
                });
        });

        it('should not valid the width', function(done) {
            var filepath = __dirname + '/fixtures/discover-682x626.jpg';

            photoFileHelpers.maxWidth(filepath, 600)
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

            photoFileHelpers.maxWidth(filepath, 700)
                .then(null, function(err) {
                    expect(err.filepath)
                        .to.be.equals(filepath);

                    expect(err.code)
                        .to.be.equals('width.too_high');

                    done();
                });
        });
    });

    describe('validator / helpers / photoFile / maxHeight()', function() {
        it('should valid the height', function(done) {
            var filepath = __dirname + '/fixtures/discover-682x626.jpg';

            photoFileHelpers.maxHeight(filepath, 700)
                .then(function(resolved) {
                    expect(filepath)
                        .to.be.equals(resolved);

                    done();
                });
        });

        it('should not valid the height', function(done) {
            var filepath = __dirname + '/fixtures/discover-682x626.jpg';

            photoFileHelpers.maxHeight(filepath, 600)
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

            photoFileHelpers.maxHeight(filepath, 700)
                .then(null, function(err) {
                    expect(err.filepath)
                        .to.be.equals(filepath);

                    expect(err.code)
                        .to.be.equals('height.too_high');

                    done();
                });
        });
    });

    describe('validator / helpers / photoFile / minHeight()', function() {
        it('should valid the height', function(done) {
            var filepath = __dirname + '/fixtures/discover-682x626.jpg';

            photoFileHelpers.minHeight(filepath, 600)
                .then(function(resolved) {
                    expect(filepath)
                        .to.be.equals(resolved);

                    done();
                });
        });

        it('should not valid the height', function(done) {
            var filepath = __dirname + '/fixtures/discover-682x626.jpg';

            photoFileHelpers.minHeight(filepath, 700)
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

            photoFileHelpers.minHeight(filepath, 700)
                .then(null, function(err) {
                    expect(err.filepath)
                        .to.be.equals(filepath);

                    expect(err.code)
                        .to.be.equals('height.too_low');

                    done();
                });
        });
    });

    describe('validator / helpers / photoFile / minWidth()', function() {
        it('should valid the width', function(done) {
            var filepath = __dirname + '/fixtures/discover-682x626.jpg';

            photoFileHelpers.minWidth(filepath, 600)
                .then(function(resolved) {
                    expect(filepath)
                        .to.be.equals(resolved);

                    done();
                });
        });

        it('should not valid the width', function(done) {
            var filepath = __dirname + '/fixtures/discover-682x626.jpg';

            photoFileHelpers.minWidth(filepath, 700)
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

            photoFileHelpers.minWidth(filepath, 700)
                .then(null, function(err) {
                    expect(err.filepath)
                        .to.be.equals(filepath);

                    expect(err.code)
                        .to.be.equals('width.too_low');

                    done();
                });
        });
    });

    describe('validator / helpers / photoFile / maxSize()', function() {
        it('should valid the width and the height', function(done) {
            var filepath = __dirname + '/fixtures/discover-682x626.jpg';

            photoFileHelpers.maxSize(filepath, 700, 700)
                .then(function(resolved) {
                    expect(filepath)
                        .to.be.equals(resolved);

                    done();
                });
        });

        it('should not valid the width but valid the height', function(done) {
            var filepath = __dirname + '/fixtures/discover-682x626.jpg';

            photoFileHelpers.maxSize(filepath, 600, 700)
                .then(null, function(err) {
                    expect(err.filepath)
                        .to.be.equals(filepath);

                    expect(err.code)
                        .to.be.equals('size.too_high');

                    done();
                });
        });

        it('should valid the width but not valid the height', function(done) {
            var filepath = __dirname + '/fixtures/discover-682x626.jpg';

            photoFileHelpers.maxSize(filepath, 700, 600)
                .then(null, function(err) {
                    expect(err.filepath)
                        .to.be.equals(filepath);

                    expect(err.code)
                        .to.be.equals('size.too_high');

                    done();
                });
        });

        it('should not valid the width (file is not an image)', function(done) {
            var filepath = __dirname + '/fixtures/not_an_image.jpg';

            photoFileHelpers.maxSize(filepath, 700, 700)
                .then(null, function(err) {
                    expect(err.filepath)
                        .to.be.equals(filepath);

                    expect(err.code)
                        .to.be.equals('size.too_high');

                    done();
                });
        });
    });

    describe('validator / helpers / photoFile / minSize()', function() {
        it('should valid the width and the height', function(done) {
            var filepath = __dirname + '/fixtures/discover-682x626.jpg';

            photoFileHelpers.minSize(filepath, 600, 600)
                .then(function(resolved) {
                    expect(filepath)
                        .to.be.equals(resolved);

                    done();
                });
        });

        it('should not valid the width but valid the height', function(done) {
            var filepath = __dirname + '/fixtures/discover-682x626.jpg';

            photoFileHelpers.minSize(filepath, 700, 600)
                .then(null, function(err) {
                    expect(err.filepath)
                        .to.be.equals(filepath);

                    expect(err.code)
                        .to.be.equals('size.too_low');

                    done();
                });
        });

        it('should valid the width but not valid the height', function(done) {
            var filepath = __dirname + '/fixtures/discover-682x626.jpg';

            photoFileHelpers.minSize(filepath, 600, 700)
                .then(null, function(err) {
                    expect(err.filepath)
                        .to.be.equals(filepath);

                    expect(err.code)
                        .to.be.equals('size.too_low');

                    done();
                });
        });

        it('should not valid the width (file is not an image)', function(done) {
            var filepath = __dirname + '/fixtures/not_an_image.jpg';

            photoFileHelpers.minSize(filepath, 700, 700)
                .then(null, function(err) {
                    expect(err.filepath)
                        .to.be.equals(filepath);

                    expect(err.code)
                        .to.be.equals('size.too_low');

                    done();
                });
        });
    });
});
