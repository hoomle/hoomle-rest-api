'use strict';

var photoFileHelpers    = require('../../../../src/validator/helpers/photoFile'),
    expect              = require('chai').expect,
    sinon               = require('sinon');

describe('validator / helpers / photoFile', function() {
    describe('validator / helpers / photoFile / isImage', function() {
        it('should valid', function(done) {
            var filepath = __dirname + '/fixtures/discover-682x626.jpg';

            photoFileHelpers.isImage(filepath)
                .then(function(resolved) {
                    expect(filepath)
                        .to.be.equals(resolved);

                    done();
                });
        });

        it('should not valid the file (file is not an image)', function(done) {
            var filepath = __dirname + '/fixtures/not_an_image.jpg';

            photoFileHelpers.isImage(filepath)
                .then(null, function(err) {
                    expect(err.value)
                        .to.be.equals(filepath);

                    expect(err.code)
                        .to.be.equals('photo.invalid');

                    expect(err.message)
                        .to.be.equals('This file is not a valid image.');

                    done();
                });
        });

        it('should not valid the file (file not found)', function(done) {
            var filepath = __dirname + '/fixtures/not_found.jpg';

            photoFileHelpers.isImage(filepath)
                .then(null, function(err) {
                    expect(err.value)
                        .to.be.equals(filepath);

                    expect(err.code)
                        .to.be.equals('photo.invalid');

                    expect(err.message)
                        .to.be.equals('This file is not a valid image.');

                    done();
                });
        });
    });

    describe('validator / helpers / photoFile / format', function() {
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
                    expect(err.value)
                        .to.be.equals(filepath);

                    expect(err.code)
                        .to.be.equals('photo.invalid_format');

                    expect(err.message)
                        .to.be.equals('The image format "jpeg" is not supported, we support "png" formats');

                    done();
                });
        });

        it('should not valid the format (with array as parameter)', function(done) {
            var filepath = __dirname + '/fixtures/discover-682x626.jpg';

            photoFileHelpers.format(filepath, ['png', 'gif'])
                .then(null, function(err) {
                    expect(err.value)
                        .to.be.equals(filepath);

                    expect(err.code)
                        .to.be.equals('photo.invalid_format');

                    expect(err.message)
                        .to.be.equals('The image format "jpeg" is not supported, we support "png,gif" formats');

                    done();
                });
        });

        it('should not valid the file (file not an image)', function(done) {
            var filepath = __dirname + '/fixtures/not_an_image.jpg';

            photoFileHelpers.format(filepath)
                .then(null, function(err) {
                    expect(err.value)
                        .to.be.equals(filepath);

                    expect(err.code)
                        .to.be.equals('photo.invalid');

                    expect(err.message)
                        .to.be.equals('This file is not a valid image.');

                    done();
                });
        });
    });

    describe('validator / helpers / photoFile / maxWidth', function() {
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
                    expect(err.value)
                        .to.be.equals(filepath);

                    expect(err.code)
                        .to.be.equals('photo.width_too_big');

                    expect(err.message)
                        .to.be.equals('The image width is too big (682px). Allowed maximum width is 600px.');

                    done();
                });
        });

        it('should not valid the file (file not an image)', function(done) {
            var filepath = __dirname + '/fixtures/not_an_image.jpg';

            photoFileHelpers.maxWidth(filepath, 600)
                .then(null, function(err) {
                    expect(err.value)
                        .to.be.equals(filepath);

                    expect(err.code)
                        .to.be.equals('photo.invalid');

                    expect(err.message)
                        .to.be.equals('This file is not a valid image.');

                    done();
                });
        });
    });

    describe('validator / helpers / photoFile / maxHeight', function() {
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
                    expect(err.value)
                        .to.be.equals(filepath);

                    expect(err.code)
                        .to.be.equals('photo.height_too_big');

                    expect(err.message)
                        .to.be.equals('The image height is too big (626px). Allowed maximum height is 600px.');

                    done();
                });
        });

        it('should not valid the file (file not an image)', function(done) {
            var filepath = __dirname + '/fixtures/not_an_image.jpg';

            photoFileHelpers.maxHeight(filepath, 600)
                .then(null, function(err) {
                    expect(err.value)
                        .to.be.equals(filepath);

                    expect(err.code)
                        .to.be.equals('photo.invalid');

                    expect(err.message)
                        .to.be.equals('This file is not a valid image.');

                    done();
                });
        });
    });

    describe('validator / helpers / photoFile / minHeight', function() {
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
                    expect(err.value)
                        .to.be.equals(filepath);

                    expect(err.code)
                        .to.be.equals('photo.height_too_small');

                    expect(err.message)
                        .to.be.equals('The image height is too small (626px). Minimum height expected is 700px.');

                    done();
                });
        });

        it('should not valid the file (file not an image)', function(done) {
            var filepath = __dirname + '/fixtures/not_an_image.jpg';

            photoFileHelpers.minHeight(filepath, 700)
                .then(null, function(err) {
                    expect(err.value)
                        .to.be.equals(filepath);

                    expect(err.code)
                        .to.be.equals('photo.invalid');

                    expect(err.message)
                        .to.be.equals('This file is not a valid image.');

                    done();
                });
        });
    });

    describe('validator / helpers / photoFile / minWidth', function() {
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
                    expect(err.value)
                        .to.be.equals(filepath);

                    expect(err.code)
                        .to.be.equals('photo.width_too_small');

                    expect(err.message)
                        .to.be.equals('The image width is too small (682px). Minimum width expected is 700px.');

                    done();
                });
        });

        it('should not valid the file (file not an image)', function(done) {
            var filepath = __dirname + '/fixtures/not_an_image.jpg';

            photoFileHelpers.minWidth(filepath, 700)
                .then(null, function(err) {
                    expect(err.value)
                        .to.be.equals(filepath);

                    expect(err.code)
                        .to.be.equals('photo.invalid');

                    expect(err.message)
                        .to.be.equals('This file is not a valid image.');

                    done();
                });
        });
    });

    describe('validator / helpers / photoFile / maxImageSize', function() {
        it('should valid the width and the height', function(done) {
            var filepath = __dirname + '/fixtures/discover-682x626.jpg';

            photoFileHelpers.maxImageSize(filepath, 700, 700)
                .then(function(resolved) {
                    expect(filepath)
                        .to.be.equals(resolved);

                    done();
                });
        });

        it('should not valid the width but valid the height', function(done) {
            var filepath = __dirname + '/fixtures/discover-682x626.jpg';

            photoFileHelpers.maxImageSize(filepath, 600, 700)
                .then(null, function(err) {
                    expect(err.value)
                        .to.be.equals(filepath);

                    expect(err.code)
                        .to.be.equals('photo.image_size_too_big');

                    expect(err.message)
                        .to.be.equals('The image size is too big (682x626). Maximum size expected is 600x700.');

                    done();
                });
        });

        it('should valid the width but not valid the height', function(done) {
            var filepath = __dirname + '/fixtures/discover-682x626.jpg';

            photoFileHelpers.maxImageSize(filepath, 700, 600)
                .then(null, function(err) {
                    expect(err.value)
                        .to.be.equals(filepath);

                    expect(err.code)
                        .to.be.equals('photo.image_size_too_big');

                    expect(err.message)
                        .to.be.equals('The image size is too big (682x626). Maximum size expected is 700x600.');

                    done();
                });
        });

        it('should not valid the file (file not an image)', function(done) {
            var filepath = __dirname + '/fixtures/not_an_image.jpg';

            photoFileHelpers.maxImageSize(filepath, 700, 700)
                .then(null, function(err) {
                    expect(err.value)
                        .to.be.equals(filepath);

                    expect(err.code)
                        .to.be.equals('photo.invalid');

                    expect(err.message)
                        .to.be.equals('This file is not a valid image.');

                    done();
                });
        });
    });

    describe('validator / helpers / photoFile / minImageSize', function() {
        it('should valid the width and the height', function(done) {
            var filepath = __dirname + '/fixtures/discover-682x626.jpg';

            photoFileHelpers.minImageSize(filepath, 600, 600)
                .then(function(resolved) {
                    expect(filepath)
                        .to.be.equals(resolved);

                    done();
                });
        });

        it('should not valid the width but valid the height', function(done) {
            var filepath = __dirname + '/fixtures/discover-682x626.jpg';

            photoFileHelpers.minImageSize(filepath, 700, 600)
                .then(null, function(err) {
                    expect(err.value)
                        .to.be.equals(filepath);

                    expect(err.code)
                        .to.be.equals('photo.image_size_too_small');

                    expect(err.message)
                        .to.be.equals('The image size is too small (682x626). Minimum size expected is 700x600.');

                    done();
                });
        });

        it('should valid the width but not valid the height', function(done) {
            var filepath = __dirname + '/fixtures/discover-682x626.jpg';

            photoFileHelpers.minImageSize(filepath, 600, 700)
                .then(null, function(err) {
                    expect(err.value)
                        .to.be.equals(filepath);

                    expect(err.code)
                        .to.be.equals('photo.image_size_too_small');

                    expect(err.message)
                        .to.be.equals('The image size is too small (682x626). Minimum size expected is 600x700.');

                    done();
                });
        });

        it('should not valid the file (file not an image)', function(done) {
            var filepath = __dirname + '/fixtures/not_an_image.jpg';

            photoFileHelpers.minImageSize(filepath, 700, 700)
                .then(null, function(err) {
                    expect(err.value)
                        .to.be.equals(filepath);

                    expect(err.code)
                        .to.be.equals('photo.invalid');

                    expect(err.message)
                        .to.be.equals('This file is not a valid image.');

                    done();
                });
        });
    });

    describe('validator / helpers / photoFile / maxSize', function() {
        it('should valid the size (< 120B)', function(done) {
            var filepath = __dirname + '/fixtures/discover-682x626.jpg';

            photoFileHelpers.maxSize(filepath, 120000)
                .then(function(resolved) {
                    expect(filepath)
                        .to.be.equals(resolved);

                    done();
                });
        });

        it('should not valid the size (> 100B)', function(done) {
            var filepath = __dirname + '/fixtures/discover-682x626.jpg';

            photoFileHelpers.maxSize(filepath, 100000)
                .then(null, function(err) {
                    expect(err.value)
                        .to.be.equals(filepath);

                    expect(err.code)
                        .to.be.equals('photo.size_too_big');

                    expect(err.message)
                        .to.be.equals('The file is too large (114610). Allowed maximum size is 100000.');

                    done();
                });
        });

        it('should not valid the file (file not an image)', function(done) {
            var filepath = __dirname + '/fixtures/not_an_image.jpg';

            photoFileHelpers.maxSize(filepath, 1000000)
                .then(null, function(err) {
                    expect(err.value)
                        .to.be.equals(filepath);

                    expect(err.code)
                        .to.be.equals('photo.invalid');

                    expect(err.message)
                        .to.be.equals('This file is not a valid image.');

                    done();
                });
        });
    });
});
