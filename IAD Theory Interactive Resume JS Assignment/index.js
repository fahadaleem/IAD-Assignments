const contactSelector = document.querySelector("#contact-heading");
const contactInfo = document.querySelector("#contact-info");
const skillSelector = document.querySelector("#skill-heading");
const skillsInfo = document.querySelector("#skills");
const educationSelector = document.querySelector("#education-heading");
const educationInfo = document.querySelector("#education");
const experienceSelector = document.querySelector("#experience-heading")
const experienceInfo = document.querySelector("#experience-info")
const certificationSelector = document.querySelector("#certification-heading");
const certificationInfo = document.querySelector("#certificates")

const toggleDiv = (selector, icon) => {
  const checkForDisplay = selector.style.display;
  console.log(icon)

  if (checkForDisplay === "none") {
    selector.style.display = "block";
  document.querySelector(icon).classList.add("icon")
    
  } else {
    selector.style.display = "none";
  document.querySelector(icon).classList.remove("icon")

  }
};

contactSelector.addEventListener("click", (e) => {
  toggleDiv(contactInfo, `#contact-heading i`);
});

skillSelector.addEventListener("click", () => {
  toggleDiv(skillsInfo, '#skill-heading i');
});

educationSelector.addEventListener("click", () => {
  toggleDiv(educationInfo, '#education-heading i');
});

experienceSelector.addEventListener("click", ()=>{
    toggleDiv(experienceInfo, '#experience-heading i')
})

certificationSelector.addEventListener("click", ()=>{
    toggleDiv(certificationInfo, '#certification-heading i')
})


const animationPatterns = document.querySelector(".patterns");
const container = document.querySelector(".container")

setTimeout(()=>{
    animationPatterns.style.display="none"
    container.style.display="flex"
}, 3000)