// gsap code for about text
gsap.to(".about-text", {
    scale: 0.7,
    opacity: 0,
    scrollTrigger: {
        trigger: ".about-text",
        start: "top 50%",
        end: "bottom 50%",
        scrub: true,
    }
});

// gsap code for meet text 
gsap.to(".meet-text", {
    scale: 0.7,
    opacity: 0,
    scrollTrigger: {
        trigger: ".meet-text",
        start: "top 50%",
        end: "bottom 50%",
        scrub: true
    }
});

// gsap code for disc of page 1 about info.
gsap.to(".disc", {
    rotate: 360,
    // repeat: -1,
    scrollTrigger: {
        trigger: ".about-last-container",
        start: "top 70%",
        end : "top top",
        scrub: true
    }
});

gsap.to("#about-info-line", {
    width: "100%",
    duration: 2,
    scrollTrigger: {
        trigger: ".about-last-container",
        start: "top 45%",
        end : "top 10%",
        scrub: true
    }
});

function gsapForImage(each_img ,isOver = true){
    if(!each_img){
        console.error("image dom element is never passed!");
        return false;
    }
    gsap.to(each_img, {
        scale: 1.1,
        boxShadow: `${isOver ? "20px 20px 90px black" : "10px 10px 50px black"} `,
        x: `${isOver ? 10 : -10}`,
        y: `${isOver ? 10 : -10}`
    });
}

document.querySelectorAll(".awards-showcase img").forEach((each_img)=>{
    each_img.addEventListener("mouseover", ()=>{
        gsapForImage(each_img, true);
    });
    each_img.addEventListener("mouseleave", ()=>{
        gsapForImage(each_img, false);
    });
})