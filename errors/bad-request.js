const CustomApiError = require("./custom-api-error");

class BadRequest extends CustomApiError{
    constructor(message,statusCode){
        super(message)
        this.statusCode = statusCode
    }
}


module.exports = BadRequest