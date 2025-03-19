 // JS for Navbar Menu Bar Handling
 const navElem = document.querySelector("nav");
 const togglerOpenBtn = document.getElementById("menu-toggler-open-btn");
 const togglerCloseBtn = document.getElementById("menu-toggler-close-btn");


 // attaching event listener to togglerOpenBtn
 togglerOpenBtn.addEventListener('click',()=>{
   navElem.style.display = "block";
   setTimeout(()=>{
     navElem.style.left = "0%";
     navElem.style.opacity = "1";
   },200)
 });

 togglerCloseBtn.addEventListener('click', ()=>{
   navElem.style.left = "-100%";
   navElem.style.opacity = ".5";
   // setTimeout(()=> navElem.style.display = "none",200);
 });