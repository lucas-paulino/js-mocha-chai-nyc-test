'use strict';

/**
 * Gets split name
 *
 * @param {string} name - full name
 * @returns {Object} - returns an object with first and last name
 */
function getSplitName(name) {
    let splittedName = {
        firstName: '',
        lastName: ''
    };

    if (!name) {
        return splittedName;
    }

    let nameArray = name.trim().split(' ');

    if (nameArray.length === 1) {
        splittedName.firstName = nameArray[0];
        return splittedName;
    }
    
    let firstNameArray = nameArray.splice(0, nameArray.length - 1);
    splittedName.firstName = firstNameArray.join(' ');
    splittedName.lastName = nameArray.join('');
    
    return splittedName;
}

/**
 * Checks if the address is an Po Box address
 *
 * @param {string} address - address
 * @returns {boolean} Returns true if address is PoBox Address otherwise false
 */
function isPoBoxAddress(address) {
    const expression = '\\b[p]*(ost)*\\.*\\s*[o|0]*(ffice)*\\.*\\s*b[o|0]x\\b';
    const regExp = new RegExp(expression, 'i');
    return regExp.test(address);
}

/**
 * Checks if the field have any emoji characters
 *
 * @param {string} field - field value to be validated
 * @returns {boolean} validation status
 */
function hasFieldEmojiCharacters(field) {
    const emojiCatchExpression =
        '(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])';
    const regExp = new RegExp(emojiCatchExpression, 'g');
    return regExp.test(field);
}

/**
 * Checks if the fields have any emoji characters
 *
 * @param {Object} fields - fields to be validated
 * @returns {Object} object with the validation status and problem field
 */
function haveAnyFieldsEmojiCharacters(fields) {
    for (let key in fields) {
        if (hasFieldEmojiCharacters(fields[key])) {
            return {
                value: true,
                field: key
            };
        }
    }

    return {
        value: false,
        field: ''
    };
}

module.exports = {
    getSplitName: getSplitName,
    isPoBoxAddress: isPoBoxAddress,
    hasFieldEmojiCharacters: hasFieldEmojiCharacters,
    haveAnyFieldsEmojiCharacters: haveAnyFieldsEmojiCharacters
}
