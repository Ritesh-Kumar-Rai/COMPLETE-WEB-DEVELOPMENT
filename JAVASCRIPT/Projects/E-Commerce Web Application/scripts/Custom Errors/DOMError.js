// Custom Error for DOM related Errors

class DOMError extends Error{
  constructor(message, referenceError){
    super(message);
    this.name = "DOMError";
    this.referenceFrom = referenceError;
  }
}

export default DOMError;