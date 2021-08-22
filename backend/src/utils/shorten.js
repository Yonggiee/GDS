const { BASE62, BASE62_ENCODING, SHORTY_URL } = require('./constants');

function shortenToTag(int) {
    const base62EncodingTag = convertIntToBase62(int);
    return base62EncodingTag;
}

function convertIntToBase62(val) {
    let converted = '';
    while(val > 0) {
        leastSignificant = val % BASE62;
        converted += BASE62_ENCODING[leastSignificant];
        val = Math.floor(val / BASE62);
    }
    return converted;
}

function extractTag(url) {
    if (!url.includes(SHORTY_URL)) {
        return '';
    }
    return url.substring(SHORTY_URL.length);
}

module.exports = {
    extractTag,
    shortenToTag
};
