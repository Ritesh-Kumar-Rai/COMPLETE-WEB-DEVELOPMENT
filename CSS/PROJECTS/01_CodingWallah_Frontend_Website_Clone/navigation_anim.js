//  script for navigation bar animation 

document.addEventListener("DOMContentLoaded",function(){

    let isOpen = false;
    const burgerBefore = CSSRulePlugin.getRule("#burger::before");
    const burgerAfter = CSSRulePlugin.getRule("#burger::after");

            // Register the plugin 
            gsap.registerPlugin(CSSRulePlugin);
            // Get the CSS rule for the ::after pseudo-element 
            const afterRule = CSSRulePlugin.getRule("header::after");

            const tl = gsap.timeline({paused: true});

            gsap.set([burgerBefore, burgerAfter], {background: "#141412"});
            gsap.set(".company-name",{display: "none"});

            tl.to(afterRule, {
                duration: 2,
                height: "100vh",
                zIndex: "90",
                ease: "power4.inOut"
            })
    
            tl.to(".toggleBtn",{
                zIndex: 99
            }, "<0.5");
            
            tl.to([burgerBefore,burgerAfter],{
                background: "white"
            },"<0.5");

            tl.to("header > nav",{
                right: 0
            });

            tl.to("header > nav > ul > li > a",{
                opacity: 1,
                stagger: 0.1
            });

            tl.to("header > .user-auth-log-container",{
                right: 0
            });
            tl.to(".company-name",{
                zIndex: 99,
                display: "inline-block"
            })
            tl.to(".company-name-word",{
                zIndex: 99,
                opacity: 1,
                color: "white",
                stagger: 0.05
            });
    
    const burger_btn = document.querySelector("#burger");
    
    burger_btn.onclick = function(){

        burger_btn.classList.toggle("active");
        if(isOpen){
            tl.reverse();
            }else{
                tl.play();
            }
            isOpen = !isOpen;
    };
});