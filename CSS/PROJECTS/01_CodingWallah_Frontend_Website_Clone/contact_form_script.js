// JS and GSAP code for Contact Page and Form Animation and Visibility
function contact_form_visuality(){
    const contact_btn = document.getElementById("contact-btn");
    const contact_card = document.getElementsByClassName("contact-card")[0];
    const contact_form_container = document.getElementsByClassName("contact-us-form-container")[0];
    const contact_closeBtn = document.querySelector(".ri-close-large-line");

    contact_btn.addEventListener("click", ()=>{

        const tl = gsap.timeline();
        tl.to(contact_card, {
            z: -10,
            scale: 0.5,
            opacity: 0,
            onComplete: ()=>{
                contact_card.style.display = "none";
                contact_form_container.style.display = "block";
            }
        });
        tl.fromTo(contact_form_container, {z: -10, scale: 0.5, opacity: 0, delay: 1}, {z: 10, scale: 1, opacity: 1, clearProps: "transform"});

    });

    contact_closeBtn.addEventListener("click", ()=>{
        const tl = gsap.timeline();
        tl.to(contact_form_container, {
            z: -10,
            scale: 0.5,
            opacity: 0,
            onComplete: ()=>{
                contact_form_container.style.display = "none";
                contact_card.style.display = "block";
            }
        });
        tl.to(contact_card, {
            z: 10,
            scale: 1,
            opacity: 1
        });
    });
}

document.addEventListener("DOMContentLoaded",()=>{
    contact_form_visuality();
});