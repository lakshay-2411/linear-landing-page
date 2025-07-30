const carousel = document.getElementById("carousel");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const dotsContainer = document.getElementById("dotsContainer");

let currentIndex = 0;
const cardWidth = 320; // 320px = w-80 + gap
const visibleCards = Math.floor(
  window.innerWidth > 768 ? 3 : window.innerWidth > 640 ? 2 : 1
);
const totalCards = 7;
const maxIndex = Math.max(0, totalCards - visibleCards);

// Create dots
function createDots() {
  dotsContainer.innerHTML = "";
  for (let i = 0; i <= maxIndex; i++) {
    const dot = document.createElement("button");
    dot.className = `w-2 h-2 rounded-full transition-colors duration-200 ${
      i === currentIndex ? "bg-white" : "bg-gray-600"
    }`;
    dot.addEventListener("click", () => goToSlide(i));
    dotsContainer.appendChild(dot);
  }
}

// Update carousel position
function updateCarousel() {
  const translateX = -currentIndex * cardWidth;
  carousel.style.transform = `translateX(${translateX}px)`;

  // Update button states
  prevBtn.disabled = currentIndex === 0;
  nextBtn.disabled = currentIndex >= maxIndex;

  // Update dots
  const dots = dotsContainer.querySelectorAll("button");
  dots.forEach((dot, index) => {
    dot.className = `w-2 h-2 rounded-full transition-colors duration-200 ${
      index === currentIndex ? "bg-white" : "bg-gray-600"
    }`;
  });
}

// Go to specific slide
function goToSlide(index) {
  currentIndex = Math.max(0, Math.min(index, maxIndex));
  updateCarousel();
}

// Next slide
function nextSlide() {
  if (currentIndex < maxIndex) {
    currentIndex++;
    updateCarousel();
  }
}

// Previous slide
function prevSlide() {
  if (currentIndex > 0) {
    currentIndex--;
    updateCarousel();
  }
}

// Event listeners
prevBtn.addEventListener("click", prevSlide);
nextBtn.addEventListener("click", nextSlide);

// Touch/swipe support
let startX = 0;
let isDragging = false;

carousel.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
  isDragging = true;
});

carousel.addEventListener("touchend", (e) => {
  if (!isDragging) return;

  const endX = e.changedTouches[0].clientX;
  const diffX = startX - endX;

  if (Math.abs(diffX) > 50) {
    // Minimum swipe distance
    if (diffX > 0) {
      nextSlide();
    } else {
      prevSlide();
    }
  }

  isDragging = false;
});

// Mouse drag support for desktop
let mouseStartX = 0;
let isMouseDragging = false;

// Keyboard navigation
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") {
    prevSlide();
  } else if (e.key === "ArrowRight") {
    nextSlide();
  }
});

// Add this for touchpad horizontal scrolling
carousel.addEventListener(
  "wheel",
  (e) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      e.preventDefault();
      if (e.deltaX > 30) {
        nextSlide();
      } else if (e.deltaX < -30) {
        prevSlide();
      }
    }
  },
  { passive: false }
);

createDots();
updateCarousel();

// Handle window resize
window.addEventListener("resize", () => {
  // Recalculate on resize if needed
  updateCarousel();
});
