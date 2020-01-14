exports.baseResponse = function (code, message, payload, responseObject) {
    responseObject.status(code).json({
        code: code,
        message: message,
        payload: payload
    });
};
