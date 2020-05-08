'use strict';

const crypto = require('crypto');

/**
 * @param ipn your ipn data from PayKickStart IPN request
 * @param secretKey Secret key defined into your campaign (INTEGRATIONS section), by default it's the env var PAYKICKSTART_SECRET_KEY
 */
module.exports = function (ipn, secretKey = process.env.PAYKICKSTART_SECRET_KEY) {
	if (typeof ipn !== 'object' || !secretKey) {
		throw new Error('IPN data and secretKey are required!');
	}

	const ipnHash = ipn.hash;    // Hash received

    // Sorting the keys alphabetically
    const sortedData = [];
    Object.keys(ipn).sort().forEach(function(key) {
        // Trim and ommit falsies values
        if (key !== 'hash' && key !== 'verification_code' && ipn[key] && ipn[key] !== '0') {
            sortedData.push(ipn[key].trim());
        }
    });

    // Generate the hash using the string and secret key
    const hash = getHash(sortedData.join('|'), secretKey);

    return hash == ipnHash;
}

/**
 * Builds the hash from string
 * @param {*} string 
 */
function getHash (string, secretKey) {
    var hmac = crypto.createHmac('sha1', secretKey);
    return hmac.update(string).digest('hex');
}
