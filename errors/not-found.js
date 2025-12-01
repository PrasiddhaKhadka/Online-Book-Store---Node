const CustomApiError = require("./custom-api-error");

class NotFound extends CustomApiError{
     constructor(message){
          super(message)
          this.statusCode = StatusCodes.BAD_REQUEST
      }
}

module.exports = NotFound;