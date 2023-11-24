class ApiError extends Error {
    constructor(
        statusCode,
        messege = "Something went wrong",
        error =[],
        statck = ""
        ) {
        super(messege);
        this.statusCode = statusCode;
        this.data =null;
        this.message = messege;
        this.success = false
        this.error = error

        if(statck){
            this.statck = statck;
        }else{
            Error.captureStackTrace(this , this.constructor)
        }
        
    }
}

export {ApiError}