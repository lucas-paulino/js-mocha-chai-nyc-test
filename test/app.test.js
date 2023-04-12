const assert = require('assert');
const {expect} = require('chai');
const app = require('../src/app');

describe('Get split name', function () {
    it('Expect return an object with first and last name', function () {
        const result = app.getSplitName(' Lucas Paulino ');
        expect(result).to.deep.eq({
            firstName: 'Lucas',
            lastName: 'Paulino'
        });
    });

    it('Expect return an object with first and last name', function () {
        const result = app.getSplitName(' Lucas Da Silva ');
        expect(result).to.deep.eq({
            firstName: 'Lucas Da',
            lastName: 'Silva'
        });
    });

    it('Expect return an object with first and last name', function () {
        const result = app.getSplitName(' Lucas ');
        expect(result).to.deep.eq({
            firstName: 'Lucas',
            lastName: ''
        });
    });

    it('Expect return an object with first and last name empty', function () {
        const result = app.getSplitName('');
        expect(result).to.deep.eq({
            firstName: '',
            lastName: ''
        });
    });

    it('Expect return an object with first and last name empty', function () {
        const result = app.getSplitName();
        expect(result).to.deep.eq({
            firstName: '',
            lastName: ''
        });
    });
});

describe('Is PO Box Address', function () {
    it('Expect true for entries that represent a PO Box', function () {
        const matches = [
            "Box 123", 
            "Box-122", 
            "PO Box 125",
            "PO Box-125",
            "P.O. Box 125",
            "P.O. Box-125",
            "HC73 PO Box 217",
            "HC73 PO Box-217",
            "HC73 P.O. Box 217",
            "HC73 P.O. Box-217", 
            "Post Box 123", 
            "Post Office Box",
            "Post Office Box 123"
        ];

        const result = matches.map(match => app.isPoBoxAddress(match)).every(item => item);
        expect(result).to.be.true;
    });

    it('Expect false for entries that do not represent a PO Box', function () {
        const matches = [
            "12356", 
            "aaaaaaaa", 
            true,
            false,
            12345,
            [],
            null,
            -1
        ];

        const result = matches.map(match => app.isPoBoxAddress(match)).every(item => item);
        expect(result).to.be.false;
    });
});

describe('Have any fields emoji characters', function () {
    it('Expect true for entries that represent a PO Box', function () {
        const matches = {
            att1: "Test here",
            att2: "Test_here",
            att3: "Test ❤ here",
            att4: "Test here"
        };
        const result = app.haveAnyFieldsEmojiCharacters(matches);
        expect(result).to.be.an('object');
        expect(result).to.have.all.keys(['value', 'field']);
        expect(result).to.have.property('value', true);
        expect(result).to.have.property('field', 'att3');
    });

    it('Expect false for entries that do not represent a PO Box', function () {
        const matches = {
            att1: "Test here <3",
            att2: "Test here #",
            att3: "Test here :)",
            att4: null
        };
        const result = app.haveAnyFieldsEmojiCharacters(matches);
        expect(result).to.be.an('object');
        expect(result).to.have.all.keys(['value', 'field']);
        expect(result).to.have.property('value', false);
        expect(result).to.have.property('field', '');
    });
});
