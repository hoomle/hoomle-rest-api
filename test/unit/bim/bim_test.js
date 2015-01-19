'use strict';

var Bim             = require('../../../bim/bim'),
    BimError        = require('../../../bim/bimError'),
    expect          = require('chai').expect;

describe('bim / Bim', function() {
    it('constructor', function() {
        var bim = new Bim();

        expect(bim)
            .to.have.property('errors')
            .to.be.deep.equals([]);

        expect(bim)
            .to.have.property('status')
            .to.be.equals(400);
    });

    it('add() - Bad error passed as parameter', function() {
        var bim = new Bim();

        bim.add(1);
        bim.add(undefined);
        bim.add(null);
        bim.add({});
        bim.add({isBim: false});

        expect(bim)
            .to.have.property('errors')
            .to.be.deep.equals([]);
    });

    it('add() - with good BimError', function() {
        var bim = new Bim();

        var bimErrorAdded = new BimError('code', 'my.path', 'my message');

        bim.add(bimErrorAdded);

        expect(bim)
            .to.have.property('errors')
            .to.be.deep.equals([bimErrorAdded]);
    });

    it('hasErrorWithPath() - Error valid and unknow error', function() {
        var bim = new Bim();
        var bimErrorAdded = new BimError('code', 'my.path', 'my message');
        bim.add(bimErrorAdded);

        expect(bim.hasErrorWithPath('my.path')).to.be.true();
        expect(bim.hasErrorWithPath('bad_path')).to.be.false();
    });

    it('hasErrorWithPath() - Empty', function() {
        var bim = new Bim();
        expect(bim.hasErrorWithPath('bad_path')).to.be.false();
    });

    it('isValid()', function() {
        var bim = new Bim();
        expect(bim.isValid()).to.be.true();

        var bimErrorAdded = new BimError('code', 'my.path', 'my message');
        bim.add(bimErrorAdded);

        expect(bim.isValid()).to.be.false();
    });

    it('render()', function() {
        var bim = new Bim();

        var bimErrorAdded = new BimError('code', 'my.path', 'my message');
        bim.add(bimErrorAdded);

        // TODO Compare render data with raw data
        // expect(bim.render('json')).to.be.deep.equals({errors:[{code:'code',path:'my.path',message:'my message'}]});
    });

    it('isBim', function() {
        var bim = new Bim();
        expect(bim.isBim).to.be.true();
    });
});
