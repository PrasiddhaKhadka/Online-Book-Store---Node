const CustomApiError = require("./custom-api-error");

class UnAuthorized extends CustomApiError{
     constructor(message,statusCode){
        super(message)
        this.statusCode = statusCode
    }
}

module.exports = UnAuthorized