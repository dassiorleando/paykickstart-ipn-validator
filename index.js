'use strict';

/**
 * PayKickStart IPN validator
 * @author dassiorleando
 */
const crypto = require('crypto');

/**
 * @param {Object} ipn Your ipn data from PayKickStart IPN request
 * @param {string} secretKey The secret key defined into your campaign (INTEGRATIONS section), by default it's the env var PAYKICKSTART_SECRET_KEY
 * @returns {boolean} True if the IPN is correct, else false
 */
module.exports = function (ipn, secretKey = process.env.PAYKICKSTART_SECRET_KEY) {
    if (typeof ipn !== 'object' || !secretKey) {
        throw new Error('IPN data and secretKey are required!');
    }

    const ipnHash = ipn.hash;

    // Sorting the keys alphabetically then picking the good values
    const sortedData = [];
    Object.keys(ipn).sort().forEach(function(key) {
        if (key !== 'hash' && key !== 'verification_code' && ipn[key] && ipn[key] !== '0') {
            sortedData.push(ipn[key].trim());
        }
    });

    const hash = getHash(sortedData.join('|'), secretKey);
    return hash == ipnHash;
}

/**
 * Builds the hash
 * @param {string} string The string to get the hash from
 * @param {string} secretKey The secret to use
 * @returns {string} The hashed string
 */
function getHash (string, secretKey) {
    var hmac = crypto.createHmac('sha1', secretKey);
    return hmac.update(string).digest('hex');
}
