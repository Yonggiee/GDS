const BASE62 = 62;
const BASE62ENCODING = '1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
const DB_DATABASE = process.env.DATABASE;
const DB_HOST = process.env.HOST;
const DB_PASSWORD = process.env.PASSWORD;
const DB_PORT = process.env.DB_PORT;
const DB_USER = process.env.USER;
const SHORTYURL = process.env.DNS;

module.exports = {
    BASE62,
    BASE62ENCODING,
    DB_DATABASE,
    DB_HOST,
    DB_PASSWORD,
    DB_PORT,
    DB_USER,
    SHORTYURL
}
