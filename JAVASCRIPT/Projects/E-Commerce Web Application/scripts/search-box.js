
// getting html dom reference
const sortSelectElem = document.getElementById("sort-by-element");
const sortMenuElem = document.getElementById("sort-by-menu-options");


// attaching event listener
sortSelectElem.addEventListener('click', () => {
  const caretElem = document.querySelector(".sortBy-Caret");
  caretElem.classList.toggle("caretRotate");
  sortMenuElem.style.display = "block";

  setTimeout(() => sortMenuElem.classList.toggle("menuOpened"), 200);
  setTimeout(() => {
    if (!(sortMenuElem.classList.contains("menuOpened"))) {
      setTimeout(() => {
        sortMenuElem.style.display = "none";
      }, 500)
    }
  }, 200);
});

sortMenuElem.addEventListener('click', (e) => {
  // console.log(e);
  if (e.target.tagName === "LI") {
    if (e.target.hasAttribute("option-data-value")) {
      // first remove the classes form all li
      sortMenuElem.querySelectorAll("li")
        .forEach(li => {
          li.classList.remove("selected");
        });
      const attribute = e.target.getAttribute("option-data-value");
      const selectedElem = sortSelectElem.querySelector(".selected-item");
      try {
        if (selectedElem.nodeType === 1 && selectedElem instanceof Element) {
          selectedElem.innerText = attribute.replace(":", " -");
          e.target.classList.toggle("selected");
          sortMenuElem.classList.remove("menuOpened");
          document.querySelector(".sortBy-Caret").classList.remove("caretRotate");
        } else {
          throw new ReferenceError("We failed to get selectedElem!");
        }
      } catch (error) {
        console.error(`${error.name} -> ${error.message}`);
      }
    }

  }
});

// js for category element of search bar
const categoryElem = document.getElementById("category-element");
const categoryMenuOptions = document.getElementById("category-menu-options");



categoryElem.addEventListener('click', () => {
  const caretElem = document.querySelector(".categoryCaret");
  caretElem.classList.toggle("caretRotate");
  categoryMenuOptions.style.display = "block";
  categoryMenuOptions.style.zIndex = "999999";

  setTimeout(() => categoryMenuOptions.classList.toggle("menuOpened"), 200);
  setTimeout(() => {
    if (!(categoryMenuOptions.classList.contains("menuOpened"))) {
      setTimeout(() => {
        categoryMenuOptions.style.display = "none";
      }, 500)
    }
  }, 200);
});

categoryMenuOptions.addEventListener('click', (e) => {
  if (e.target.tagName === "LI") {
    if (e.target.hasAttribute("option-data-value")) {
      // first remove the classes form all li
      categoryMenuOptions.querySelectorAll("li")
        .forEach(li => {
          li.classList.remove("selected");
        });
      const attribute = e.target.getAttribute("option-data-value");
      const selectedElem = categoryElem.querySelector(".selected-item");
      try {
        if (selectedElem.nodeType === 1 && selectedElem instanceof Element) {
          selectedElem.innerText = attribute;
          e.target.classList.toggle("selected");
          categoryMenuOptions.classList.remove("menuOpened");
          document.querySelector(".categoryCaret").classList.remove("caretRotate");
        } else {
          throw new ReferenceError("We failed to get selectedElem!");
        }
      } catch (error) {
        console.error(`${error.name} -> ${error.message}`);
      }
    }
  }
});


// script for range input element
const rangeInput = document.getElementById("range-input");

rangeInput.addEventListener("input", (e) => {
  console.warn(e.target.min, e.target.max);

  if (e.target.min !== rangeInput.min) {
    const minValueElem = document.getElementById("price-range-min-value");
    minValueElem.value = e.target.min;
  }
  const maxValueElem = document.getElementById("price-range-max-value");

  maxValueElem.value = e.target.value;
})
