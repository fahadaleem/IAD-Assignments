// on scroll event
document.addEventListener("scroll", ()=>{
        const mainNav = document.querySelector(".main-nav");
    if(scrollY>65)
    {
        mainNav.classList.add("fixed-top");
    }
    else 
    {
        mainNav.classList.remove("fixed-top");
    }
})


