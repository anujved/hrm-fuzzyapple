export default class HRMSError extends Error {
    constructor(params) {
      super(params);
  
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, HRMSError);
      }
  
      this.code = params.errorCode;
      this.message = params.errorMessage;
    }
  }