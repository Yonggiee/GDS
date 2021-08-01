const { ADJUSTVALUE, BASE10, BASE62, BASE62ENCODING } = require('../utils/constants')

function convertStringToInt(str) {
    const len = str.length;
    let converted = 0;
    for (let i = 0; i < len; i++) {
        converted += ((str.charCodeAt(i) - ADJUSTVALUE) * (BASE10 ** i))
    }
    return converted;
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

function shorten(url) {
    const urlInInt = convertStringToInt(url);
    const urlInBase62 = convertIntToBase62(urlInInt);
    return urlInBase62;
}

module.exports = shorten
