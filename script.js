// Mobile menu functionality
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const mobileMenu = document.getElementById("mobileMenu");
const closeMobileMenu = document.getElementById("closeMobileMenu");
const hamburgerIcon = document.getElementById("hamburgerIcon");
const closeIcon = document.getElementById("closeIcon");

function toggleMobileMenu() {
  const isOpen = !mobileMenu.classList.contains("translate-x-full");

  if (isOpen) {
    mobileMenu.classList.add("translate-x-full");
    hamburgerIcon.classList.remove("hidden");
    closeIcon.classList.add("hidden");
    document.body.style.overflow = "";
  } else {
    mobileMenu.classList.remove("translate-x-full");
    hamburgerIcon.classList.add("hidden");
    closeIcon.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  }
}

if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener("click", toggleMobileMenu);
}

if (closeMobileMenu) {
  closeMobileMenu.addEventListener("click", toggleMobileMenu);
}

const mobileNavLinks = mobileMenu.querySelectorAll("a");
mobileNavLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.add("translate-x-full");
    hamburgerIcon.classList.remove("hidden");
    closeIcon.classList.add("hidden");
    document.body.style.overflow = "";
  });
});

document.addEventListener("keydown", (e) => {
  if (
    e.key === "Escape" &&
    !mobileMenu.classList.contains("translate-x-full")
  ) {
    toggleMobileMenu();
  }
});

function initCarousel() {
  const carousel = document.getElementById("carousel");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const dotsContainer = document.getElementById("dotsContainer");

  if (carousel && prevBtn && nextBtn && window.innerWidth >= 1024) {
    const cards = carousel.children;
    const cardWidth = 320 + 8; 
    const visibleCards = 3; 
    const totalCards = cards.length;
    const maxIndex = Math.max(0, totalCards - visibleCards);
    let currentIndex = 0;

    dotsContainer.innerHTML = "";

    if (maxIndex > 0) {
      for (let i = 0; i <= maxIndex; i++) {
        const dot = document.createElement("button");
        dot.className = `w-2 h-2 rounded-full transition-colors duration-200 ${
          i === 0 ? "bg-white" : "bg-gray-600"
        }`;
        dot.addEventListener("click", () => goToSlide(i));
        dotsContainer.appendChild(dot);
      }
    }

    function updateCarousel() {
      const translateX = -(currentIndex * cardWidth);
      carousel.style.transform = `translateX(${translateX}px)`;

      prevBtn.disabled = currentIndex === 0;
      nextBtn.disabled = currentIndex >= maxIndex;
      prevBtn.style.opacity = currentIndex === 0 ? "0.5" : "1";
      nextBtn.style.opacity = currentIndex >= maxIndex ? "0.5" : "1";

      const dots = dotsContainer.children;
      for (let i = 0; i < dots.length; i++) {
        dots[
          i
        ].className = `w-2 h-2 rounded-full transition-colors duration-200 ${
          i === currentIndex ? "bg-white" : "bg-gray-600"
        }`;
      }
    }

    function goToSlide(index) {
      currentIndex = Math.max(0, Math.min(index, maxIndex));
      updateCarousel();
    }

    prevBtn.onclick = null;
    nextBtn.onclick = null;

    prevBtn.addEventListener("click", () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
      }
    });

    nextBtn.addEventListener("click", () => {
      if (currentIndex < maxIndex) {
        currentIndex++;
        updateCarousel();
      }
    });

    updateCarousel();

    if (prevBtn.parentElement) {
      prevBtn.parentElement.style.display = "flex";
    }
    dotsContainer.style.display = "flex";

    carousel.classList.remove("overflow-x-auto");
    carousel.classList.add("lg:overflow-visible");
    carousel.parentElement.style.overflow = "hidden";
  } else if (carousel) {
    carousel.style.transform = "none";
    carousel.classList.add("overflow-x-auto");
    carousel.classList.remove("lg:overflow-visible");
    if (carousel.parentElement) {
      carousel.parentElement.style.overflow = "hidden";
    }
    if (prevBtn && nextBtn && prevBtn.parentElement) {
      prevBtn.parentElement.style.display = "none";
    }
    if (dotsContainer) {
      dotsContainer.style.display = "none";
    }
  }
}

initCarousel();

window.addEventListener("resize", initCarousel);

const style = document.createElement("style");
style.textContent = `
            .scrollbar-hide {
                -ms-overflow-style: none;
                scrollbar-width: none;
            }
            .scrollbar-hide::-webkit-scrollbar {
                display: none;
            } `;
