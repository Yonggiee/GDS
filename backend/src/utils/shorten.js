const { BASE62, BASE62_ENCODING, SHORTY_URL } = require('./constants');

function shorten(int) {
    const base62EncodingUrl = convertIntToBase62(int);
    return SHORTY_URL + base62EncodingUrl;
}

function convertIntToBase62(val) {
    let converted = '';
    while(val > 0) {
        leftOver = val % BASE62;
        converted += BASE62_ENCODING[leftOver];
        val = Math.floor(val / BASE62);
    }
    return converted;
}

module.exports = shorten;
