// Select the image and button elements from the HTML
let image = document.getElementById("image");
let rotateBtn = document.getElementById("rotateBtn");

// Variable called angle that starts at 0
let angle = 0;

// Add click event to the button
rotateBtn.addEventListener("click", function () {
  // Add 90 degrees to the angle on every click
  angle = angle + 90;

  // Apply the rotation to the image
  image.style.transform = "rotate(" + angle + "deg)";
});
