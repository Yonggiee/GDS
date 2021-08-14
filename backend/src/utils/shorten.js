const { BASE62, BASE62ENCODING, SHORTYURL } = require('./constants');

function shorten(int) {
    const base62EncodingUrl = convertIntToBase62(int);
    return SHORTYURL + base62EncodingUrl;
}

function convertIntToBase62(val) {
    let converted = '';
    while(val > 0) {
        leftOver = val % BASE62;
        converted += BASE62ENCODING[leftOver];
        val = Math.floor(val / BASE62);
    }
    return converted;
}

module.exports = shorten;
