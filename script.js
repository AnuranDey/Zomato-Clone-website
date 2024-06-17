document.addEventListener("DOMContentLoaded", function () {
  const logo = document.querySelector(".bars i");
  const sideNav = document.querySelector(".side-nav");
  const foodTypeWrapper = document.querySelector(".navigation-wrapper1");
  const popBrandsWrapper = document.querySelector(".navigation-wrapper2");
  const scrollStep = 300; // Adjust this value to change the scrolling speed

  function openSideNav() {
    sideNav.style.left = "0"; // Move the side navigation to the left to show it
  }

  function closeSideNav() {
    sideNav.style.left = "-100%"; // Move the side navigation to the left to hide it
  }

  logo.addEventListener("click", openSideNav);

  // Add a click event listener to the document to close the side navigation when clicking anywhere on the screen
  document.addEventListener("click", function (event) {
    const targetElement = event.target;
    if (!sideNav.contains(targetElement) && !logo.contains(targetElement)) {
      closeSideNav();
    }
  });

  function scrollLeft(element) {
    const currentScroll = element.scrollLeft;
    const targetScroll = currentScroll - scrollStep;
    smoothScrollTo(element, targetScroll);
  }

  function scrollRight(element) {
    const currentScroll = element.scrollLeft;
    const targetScroll = currentScroll + scrollStep;
    smoothScrollTo(element, targetScroll);
  }

  function smoothScrollTo(element, targetScroll) {
    const startScroll = element.scrollLeft;
    const scrollDifference = targetScroll - startScroll;
    const duration = 280; // Adjust the duration (in milliseconds) as needed

    let startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      const easePercentage = easeOutQuad(percentage);
      const scrollToValue = startScroll + scrollDifference * easePercentage;
      element.scrollLeft = scrollToValue;

      if (percentage < 1) {
        requestAnimationFrame(step);
      }
    }

    function easeOutQuad(t) {
      return t * (2 - t);
    }

    requestAnimationFrame(step);
  }

  document
    .querySelector(".left-arrow")
    .addEventListener("click", () => scrollLeft(foodTypeWrapper));
  document
    .querySelector(".right-arrow")
    .addEventListener("click", () => scrollRight(foodTypeWrapper));

  document
    .querySelector(".left-arrow-pop")
    .addEventListener("click", () => scrollLeft(popBrandsWrapper));
  document
    .querySelector(".right-arrow-pop")
    .addEventListener("click", () => scrollRight(popBrandsWrapper));

  window.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") {
      if (event.ctrlKey) {
        scrollRight(popBrandsWrapper);
      } else {
        scrollRight(foodTypeWrapper);
      }
    } else if (event.key === "ArrowLeft") {
      if (event.ctrlKey) {
        scrollLeft(popBrandsWrapper);
      } else {
        scrollLeft(foodTypeWrapper);
      }
    }
  });
});

window.addEventListener("DOMContentLoaded", () => {
  const itemContainer = document.querySelector(".food-item");

  fetch("http://localhost:3306/backend/myserver.php", {
    method: "GET",
    header: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      data.forEach((product) => {
        const div = document.createElement("div");
        div.classList.add("item");
        div.setAttribute("item-id", product.id);
        div.innerHTML = `
                    <img src="./images/${product.image}">
                    <h3>${product.title}</h3>
                    <span class="price">$${product.price}/</span>
                    <button class="btn add-btn">Add to Cart</button>
      `;
        itemContainer.appendChild(div);
      });
    });
});
