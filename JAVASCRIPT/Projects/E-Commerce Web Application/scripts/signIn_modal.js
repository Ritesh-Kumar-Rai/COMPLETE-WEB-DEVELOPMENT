let guestBtn = null;
let go_to_LoginRegisterPage_linkElem = null;

// modal open/close logic starts
const showModal = () => {
  const modal = document.querySelector("dialog");
  document.querySelector('.modal-container').style.display = "block";
  HapticOn();
  modal.show();
  modal.classList.toggle("modalOpened");
  document.body.style.overflowY = "hidden";
  try {
    listenGuestBtn();
  } catch (error) {
    console.error(`${error.name} -> ${error.message}`);
  }
  try {
    listenGoToLinkBtn();
  } catch (error) {
    console.error(`${error.name} -> ${error.message}`);
  }
}

const closeModal = () => {
  const modal = document.querySelector("dialog");
  modal.classList.toggle("modalOpened");
  HapticOn();
  setTimeout(() => {
    modal.close();
    setTimeout(() => {
      document.querySelector(".modal-container").style.display = "none";
      document.body.style.overflowY = "scroll";
      try {
        removeGuestBtnListener();
        removeGoToLinkBtnListener();
      } catch (error) {
        console.error(`${error.name} -> ${error.message}`);
      }
    }, 400)
  }, 400)
}

const scaleUpModal = (e) => {
  if (e.target === e.currentTarget) {
    const modal = document.querySelector('dialog');
    modal.classList.toggle('scaleUpModal');
    setTimeout(() => {
      modal.classList.toggle('scaleUpModal');
    }, 300);
  }
}
// modal open/close logic ends here

// ------------------------------------------------------------------------

// guest button related script started
const handleGuestBtnClick = () => {
  const spinnerElem = guestBtn.querySelector("#spinner");
  spinnerElem.classList.add("animate-spinner");
  HapticOn();
  // console.warn(spinnerElem, spinnerElem.classList);
  setTimeout(() => {
    spinnerElem.classList.remove("animate-spinner");
    HapticOn();
  }, 4000)
}

function listenGuestBtn() {
  guestBtn = document.getElementById("im-a-guest-btn");
  if (guestBtn instanceof Element && guestBtn.nodeType === 1) {
    guestBtn.addEventListener("click", handleGuestBtnClick);
    return;
  }
  throw new ReferenceError("We didn't get guestBtn as DOM element! Kindly Check for issue.");
}

function removeGuestBtnListener() {
  console.warn("Guest Button Listener Removed");
  guestBtn.removeEventListener("click", handleGuestBtnClick);
}
// guest button related script ended

// ------------------------------------------------------------------------

// modal Go To Register/Login Page Button Logic Script started

const handleGoTo_RegisterLogin_btn_Clicked = (event) =>{
    event.preventDefault();
    console.log(go_to_LoginRegisterPage_linkElem.getAttribute('data-current-form'));
    const modal_title = document.getElementById('auth-form-title');
    // console.log(event.target.parentElement.previousElementSibling.firstElementChild);
    const modal_footer = event.target.closest(".modal-footer");
    if(modal_footer && modal_footer.nodeType === 1 && modal_footer instanceof Element){
        const modal_body = modal_footer?.previousElementSibling;
        if(!modal_body || modal_body.nodeType !== 1 || !(modal_body instanceof Element)){
          throw new ReferenceError("Oops! We are failed to access the modal-body element inside modal DOM.");
        }
        const form = modal_body.querySelector("form");
        if(!form || form.nodeType !== 1 || !(form instanceof Element)){
          throw new ReferenceError("Oops! We are failed to access the modal-form element inside modal-body of modal DOM.");
        }
        const form_type = form.getAttribute("data-form-type") ?? null;
        if(form_type === "login-form"){
          HapticOn();
          // render login form
          render_register_form(go_to_LoginRegisterPage_linkElem, modal_title, modal_body);
        }else if(form_type === "register-form"){
          HapticOn();
          // render Register form
          render_login_form(go_to_LoginRegisterPage_linkElem, modal_title, modal_body);
        }
        return;
    }
    throw new ReferenceError("Oops! We are failed to access the modal-footer element inside modal DOM.");
}

const render_register_form = (linkElement, modalHeaderTitle, modalBody) =>{
  if((!linkElement || linkElement.nodeType !== 1 || !(linkElement instanceof Element))){
      throw new ReferenceError("We didn't got 'linkAttribute' as parameter or it none of the type DOM Element");
  }else if(!modalHeaderTitle || modalHeaderTitle.nodeType !== 1 || !(modalHeaderTitle instanceof Element)){
      throw new ReferenceError("We didn't got 'modalHeaderTitle' as parameter or it none of the type DOM Element");
  }else if(!modalBody || modalBody.nodeType !== 1 || !(modalBody instanceof Element)){
      throw new ReferenceError("We didn't got 'modalBody' as parameter or it none of the type DOM Element");
  }

  if(linkElement.getAttribute("data-current-form") === "login-page"){
      linkElement.textContent = "Go to Login Page";
      linkElement.setAttribute("data-current-form", "register-page");
      if(modalHeaderTitle.innerText.trim() === "Sign In"){
        modalHeaderTitle.innerText = "Register Now";
        modalBody.innerHTML = ""; // clearing the all existing HTML elements
        const formTag = document.createElement('form');
        formTag.setAttribute("action","#");
        formTag.setAttribute("data-form-type","register-form");
        formTag.setAttribute("method","post");
        formTag.innerHTML = `
        <div class="form-control">
              <label for="register-username-input">Username</label>
              <input type="text" name="register-username" id="register-username-input" placeholder="your name..">
        </div>
        <div class="form-control">
              <label for="register-email-input">Email Address</label>
              <input type="email" name="register-email" id="register-email-input" placeholder="your email id..">
              <small>We'll never share your email with anyone else.</small>
        </div>
        <div class="form-control">
              <label for="register-password-input">Password</label>
              <input type="password" name="register-password" id="register-password-input" placeholder="your password..">
        </div>
        <div class="form-control">
              <label for="register-cpassword-input">Confirm Password</label>
              <input type="password" name="register-confirm-password" id="register-cpassword-input" placeholder="confirm your password..">
        </div>
        <input type="submit" value="Register">
        `;
        // console.info(formTag);
        modalBody.appendChild(formTag);
        removeGuestBtnListener();
        return;
      }
      throw new TypeError("We regret! 'Modal Header Title' doesn't have appropriate login text data.");
      return;
  }

  throw new TypeError("We regret! 'link' doesn't have appropriate login attribute data.");
}

const render_login_form = (linkElement, modalHeaderTitle, modalBody) =>{
  if((!linkElement || linkElement.nodeType !== 1 || !(linkElement instanceof Element))){
      throw new ReferenceError("We didn't got 'linkAttribute' as parameter or it none of the type DOM Element");
  }else if(!modalHeaderTitle || modalHeaderTitle.nodeType !== 1 || !(modalHeaderTitle instanceof Element)){
      throw new ReferenceError("We didn't got 'modalHeaderTitle' as parameter or it none of the type DOM Element");
  }else if(!modalBody || modalBody.nodeType !== 1 || !(modalBody instanceof Element)){
      throw new ReferenceError("We didn't got 'modalBody' as parameter or it none of the type DOM Element");
  }

  if(linkElement.getAttribute("data-current-form") === "register-page"){
      linkElement.textContent = "Haven't created an a ccount, Click here to CREATE ACCOUNT";
      linkElement.setAttribute("data-current-form", "login-page");
      if(modalHeaderTitle.innerText.trim() === "Register Now"){
        modalHeaderTitle.innerText = "Sign In";
        modalBody.innerHTML = ""; // clearing the all existing HTML elements
        const formTag = document.createElement('form');
        formTag.setAttribute("action","#");
        formTag.setAttribute("data-form-type","login-form");
        formTag.setAttribute("method","post");
        formTag.innerHTML = `
        <div class="form-control">
              <label for="sign-in-email-input">Email Address</label>
              <input type="email" name="" id="sign-in-email-input">
              <small>We'll never share your email with anyone else.</small>
        </div>
        <div class="form-control">
              <label for="sign-in-password-input">Password</label>
              <input type="password" name="" id="sign-in-password-input">
        </div>
        <div>
              <input type="checkbox" name="remember" id="remember-me">
              <label for="remember-me">Remember Me</label>
        </div>
        <input type="submit" value="Log In">
        <button type="button" id="im-a-guest-btn"><span id="spinner"></span>I'm a Guest</button>
        `;
        modalBody.appendChild(formTag);
        listenGuestBtn();
        return;
      }
      throw new TypeError("We regret! 'Modal Header Title' doesn't have appropriate register text data.");
      return;
  }

  throw new TypeError("We regret! 'link' doesn't have appropriate register attribute data.");
}

function listenGoToLinkBtn(){
    go_to_LoginRegisterPage_linkElem = document.getElementById("go-to-auth-modal-page");
    if(!(go_to_LoginRegisterPage_linkElem instanceof Element) && go_to_LoginRegisterPage_linkElem.nodeType !== 1){
        throw new ReferenceError("We didn't get go_to_LoginRegisterPage link Element! Kindly check for issue.");
    }
    try {
      go_to_LoginRegisterPage_linkElem.addEventListener('click', handleGoTo_RegisterLogin_btn_Clicked);
    } catch (error) {
      console.error(`${error.name} -> ${error.message}`);
    }
}
function removeGoToLinkBtnListener(){
  go_to_LoginRegisterPage_linkElem.removeEventListener('click', handleGoTo_RegisterLogin_btn_Clicked);
  console.error("Go to Link Register/Login Button Listener have been removed!");
}
// modal Go To Register/Login Page Button Logic Script ended




// Attaching Event Listeners to Modal Open/Close Buttons and Backface 
document.getElementById('sign-in-btn').addEventListener('click', showModal);
document.getElementById("modal-close-btn").addEventListener('click', closeModal);
document.querySelector(".modal-container").addEventListener('click', scaleUpModal);
