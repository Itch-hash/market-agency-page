const sliderBtn = document.getElementById("sliderBtn");
const sliderContainer = document.querySelector(".slider-container");

// Function to handle movement (common for both mouse and touch)
const handleMove = (clientX, initialX, offsetX) => {
  let newX = clientX - initialX + offsetX;
  newX = Math.max(
    0,
    Math.min(newX, sliderContainer.clientWidth - sliderBtn.clientWidth)
  );
  sliderBtn.style.left = newX + "px";
};

// Function to handle the end of interaction (common for both mouse and touch)
const handleEnd = () => {
  const sliderEnd = sliderContainer.clientWidth - sliderBtn.clientWidth;

  if (sliderBtn.offsetLeft >= sliderEnd) {
    // Trigger action when the button reaches the end
    alert("You swiped to learn how!");
    sliderBtn.style.left = "0";
  } else {
    // Reset the button if not fully slid to the right
    sliderBtn.style.left = "0";
  }

  // Remove event listeners
  document.removeEventListener("mousemove", onMouseMove);
  document.removeEventListener("mouseup", onMouseUp);
  document.removeEventListener("touchmove", onTouchMove);
  document.removeEventListener("touchend", onTouchEnd);
};

// Mouse event handlers
const onMouseMove = (event) => {
  handleMove(event.clientX, initialX, offsetX);
};

const onMouseUp = () => {
  handleEnd();
};

// Touch event handlers
const onTouchMove = (event) => {
  // Use the first touch point
  const touch = event.touches[0];
  handleMove(touch.clientX, initialTouchX, offsetX);
};

const onTouchEnd = () => {
  handleEnd();
};

// Variables to store initial positions
let initialX, initialTouchX, offsetX;

// Add mouse event listeners
sliderBtn.addEventListener("mousedown", (e) => {
  initialX = e.clientX;
  offsetX = sliderBtn.offsetLeft;

  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("mouseup", onMouseUp);
});

// Add touch event listeners
sliderBtn.addEventListener("touchstart", (e) => {
  const touch = e.touches[0];
  initialTouchX = touch.clientX;
  offsetX = sliderBtn.offsetLeft;

  document.addEventListener("touchmove", onTouchMove);
  document.addEventListener("touchend", onTouchEnd);
});
