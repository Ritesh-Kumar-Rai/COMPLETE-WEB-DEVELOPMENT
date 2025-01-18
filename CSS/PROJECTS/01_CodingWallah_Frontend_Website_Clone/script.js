// Hare Krsna


// The JS and GSAP code for page 3 cursor pointer follower and icons animation
const page3 = document.getElementById("page3");
const cursor = document.querySelector(".cursor-pointer-circle");
const icons = document.querySelectorAll(".--icon--3");

function detectCollision(){

    // check for collision with icons
         const cursorRect = cursor.getBoundingClientRect(); 
       icons.forEach(eachicon =>{
             const iconRect = eachicon.getBoundingClientRect();
             console.log(cursorRect, iconRect)
             if (cursorRect.left < iconRect.right && 
             cursorRect.right > iconRect.left && 
             cursorRect.top < iconRect.bottom && 
             cursorRect.bottom > iconRect.top){
                 // collision detected, scale the icon
                 gsap.to(eachicon, {scale: 2, duration: 0.3})
             }else{
                 // No collision, reset the icon scale
                 gsap.to(eachicon, {scale: 1, duration: 0.3});
             }
         });
}

page3.addEventListener("mousemove", (e)=>{
    gsap.to(cursor, {
        left:e.x,
        top:e.y
    });
    detectCollision();
});

page3.addEventListener("mouseleave", (e)=>{
    gsap.to(cursor, {
        scale: 0.1,
        opacity: 0
    });
});

page3.addEventListener("mouseenter", (e)=>{
    gsap.to(cursor, {
        scale: 1,
        opacity: 1
    });
});


// JS code for  scrollToTop_btn_functionality
document.addEventListener('DOMContentLoaded', (event) => {
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    const sections = document.querySelectorAll("main section");

    // Intersection Observer to detect when page 2 is in view
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                scrollTopBtn.style.display = 'flex';
            } else {
                scrollTopBtn.style.display = 'none';
            }
        });
    }, {threshold: 0});

    sections.forEach(section => observer.observe(section));

    // Scroll to top on button click
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});