const HTTP_STATUS_CODES = {
    // success 2xx
    'OK': 200,
    'NO_CONTENT': 204,

    // client 4xx
    'BAD_REQUEST': 400,
    'NOT_FOUND': 404,

    // server 5xx
    'INTERNAL_SERVER_ERROR': 500
};
module.exports = HTTP_STATUS_CODES;
