'use strict';

var sinon               = require('sinon'),
    when                = require('when'),
    expect              = require('chai').expect,
    Bim                 = require('../../../src/bim/bim'),
    errors              = require('../../../src/validator/errors'),
    validator           = require('../../../src/validator').PhotoHooms,
    schema              = require('../../../src/validator/joi/schema'),
    photoFileHelpers    = require('../../../src/validator/helpers/photoFile'),
    userDao             = require('../../../src/manager/dao').User,
    photoManager        = require('../../../src/helper/photoManager'),
    tools               = require('../../tools');

describe('validator / photoHooms / validate()', function() {
    var photoManagerStub;

    before(function() {
        photoManagerStub = sinon.stub(photoManager, 'resolvePathFromUploadFolder');
        photoManagerStub.returns('');
    });

    after(function(){
        photoManagerStub.restore();
    });

    it('should validate the photo', function(done) {
        var photo = {
            name: 'kevin.jpg',
            size: 145000
        };

        var formatStub = sinon.stub(photoFileHelpers, 'format');
        formatStub.returns(when.resolve());

        var minImageSizeStub = sinon.stub(photoFileHelpers, 'minImageSize');
        minImageSizeStub.returns(when.resolve());

        var maxSizeStub = sinon.stub(photoFileHelpers, 'maxSize');
        maxSizeStub.returns(when.resolve());

        validator.validate(photo, 'profile')
            .then(function(resolved) {
                expect(resolved.value)
                    .to.be.deep.equals(photo);

                expect(resolved.bim)
                    .to.be.an.instanceOf(Bim);

                expect(resolved.bim.isValid())
                    .to.be.true;

                formatStub.restore();
                minImageSizeStub.restore();
                maxSizeStub.restore();

                done();
            });
    });

    it('should not validate the photo because its format is not supported', function(done) {
        var photo = {
            name: 'kevin.jpg',
            size: 145000
        };

        var formatStub = sinon.stub(photoFileHelpers, 'format');
        formatStub.returns(when.reject({
            code: 'invalid_format',
            message: 'invalid_format'
        }));

        var minImageSizeStub = sinon.stub(photoFileHelpers, 'minImageSize');
        minImageSizeStub.returns(when.resolve());

        var maxSizeStub = sinon.stub(photoFileHelpers, 'maxSize');
        maxSizeStub.returns(when.resolve());

        validator.validate(photo, 'profile')
            .then(null, function(resolved) {
                expect(resolved.value)
                    .to.be.deep.equals(photo);

                expect(resolved.bim)
                    .to.be.an.instanceOf(Bim);

                expect(resolved.bim.isValid())
                    .to.be.false;

                expect(resolved.bim.hasErrorWithPath('photo'))
                    .to.be.true;

                expect(tools.hasError(resolved.bim.errors, 'invalid_format', 'photo'))
                    .to.be.true;

                formatStub.restore();
                minImageSizeStub.restore();
                maxSizeStub.restore();

                done();
            });
    });

    it('should not validate the photo because its dimensions is invalid', function(done) {
        var photo = {
            name: 'kevin.jpg',
            size: 145000
        };

        var formatStub = sinon.stub(photoFileHelpers, 'format');
        formatStub.returns(when.resolve());

        var minImageSizeStub = sinon.stub(photoFileHelpers, 'minImageSize');
        minImageSizeStub.returns(when.reject({
            code: 'invalid_image_size',
            message: 'invalid_image_size'
        }));

        var maxSizeStub = sinon.stub(photoFileHelpers, 'maxSize');
        maxSizeStub.returns(when.resolve());

        validator.validate(photo, 'profile')
            .then(null, function(resolved) {
                expect(resolved.value)
                    .to.be.deep.equals(photo);

                expect(resolved.bim)
                    .to.be.an.instanceOf(Bim);

                expect(resolved.bim.isValid())
                    .to.be.false;

                expect(resolved.bim.hasErrorWithPath('photo'))
                    .to.be.true;

                expect(tools.hasError(resolved.bim.errors, 'invalid_image_size', 'photo'))
                    .to.be.true;

                formatStub.restore();
                minImageSizeStub.restore();
                maxSizeStub.restore();

                done();
            });
    });

    it('should not validate the photo because its size is invalid', function(done) {
        var photo = {
            name: 'kevin.jpg',
            size: 145000
        };

        var formatStub = sinon.stub(photoFileHelpers, 'format');
        formatStub.returns(when.resolve());

        var minImageSizeStub = sinon.stub(photoFileHelpers, 'minImageSize');
        minImageSizeStub.returns(when.resolve());

        var maxSizeStub = sinon.stub(photoFileHelpers, 'maxSize');
        maxSizeStub.returns(when.reject({
            code: 'invalid_size',
            message: 'invalid_size'
        }));

        validator.validate(photo, 'profile')
            .then(null, function(resolved) {
                expect(resolved.value)
                    .to.be.deep.equals(photo);

                expect(resolved.bim)
                    .to.be.an.instanceOf(Bim);

                expect(resolved.bim.isValid())
                    .to.be.false;

                expect(resolved.bim.hasErrorWithPath('photo'))
                    .to.be.true;

                expect(tools.hasError(resolved.bim.errors, 'invalid_size', 'photo'))
                    .to.be.true;

                formatStub.restore();
                minImageSizeStub.restore();
                maxSizeStub.restore();

                done();
            });
    });

    it('should not validate the photo because the object are null', function(done) {
        var formatStub = sinon.stub(photoFileHelpers, 'format');
        formatStub.returns(when.resolve());

        var minImageSizeStub = sinon.stub(photoFileHelpers, 'minImageSize');
        minImageSizeStub.returns(when.resolve());

        var maxSizeStub = sinon.stub(photoFileHelpers, 'maxSize');
        maxSizeStub.returns(when.resolve());

        validator.validate(null, 'profile')
            .then(null, function(resolved) {
                expect(resolved.value)
                    .to.be.null;

                expect(resolved.bim)
                    .to.be.an.instanceOf(Bim);

                expect(resolved.bim.isValid())
                    .to.be.false;

                expect(resolved.bim.hasErrorWithPath('photo'))
                    .to.be.true;

                expect(tools.hasError(resolved.bim.errors, 'object.base', 'photo'))
                    .to.be.true;

                formatStub.restore();
                minImageSizeStub.restore();
                maxSizeStub.restore();

                done();
            });
    });
});
