// Class for product Cards event controller like "DOM Manipulation"
import DOMError from "../Custom Errors/DOMError.js";

class eventController{
  constructor(targettedDOMElement, name_for_identification){
    this.targettedDOMElement = targettedDOMElement;
    this.identity_name = name_for_identification;

    if(!targettedDOMElement){
      throw new DOMError("Target Element Parameter is expected", "eventController Class");
    }else if(!(targettedDOMElement instanceof Element) || targettedDOMElement.nodeType !== 1 ){
      throw new DOMError("The parameter [which is targeted DOM] is must be an HTML DOM element", "eventController");
    }

    console.warn("eventController is Running\n", `Target Element is ${this.targettedDOMElement} for event listener\n`, "Identity Name: "+this.identity_name);

    this.#initEventListener();
  }

  #initEventListener(){
    console.log('initializing event listener...');

    this.targettedDOMElement.addEventListener("click", (e)=>{
      e.preventDefault()
      console.log(e.target, e);
      // we can use e.target.tagName or e.target.matches();
    });
  }


}

export default eventController;