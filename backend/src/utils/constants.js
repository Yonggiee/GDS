const BASE62 = 62;
const BASE62_ENCODING = 'qwert1yu5iopasdfg2hj7k3lzxcv84bnmQWER6TYUI9OPASDFGHJ0KLZXCVBNM';
const DB_NAME = process.env.DB_NAME;
const DB_HOST = process.env.DB_HOST;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_PORT = process.env.DB_PORT;
const DB_USER = process.env.DB_USER;
const SHORTY_URL = process.env.DNS;

module.exports = {
    BASE62,
    BASE62_ENCODING,
    DB_NAME,
    DB_HOST,
    DB_PASSWORD,
    DB_PORT,
    DB_USER,
    SHORTY_URL
}
