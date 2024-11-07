// Nama: Samuel Setyawan Prakasa
// NRP: 2272030

// Nama: Julyanto Jie
// NRP: 2272038

import { ImageLib } from "./lib.js";

const orangeImage = new Image();
orangeImage.src = "image/orange.png";

let orangeX = 150,
  orangeY = 150,
  orangeRadius = 50,
  orangeAngle = 0;
let targetX = orangeX,
  targetY = orangeY,
  moveSpeed = 0.2;
const audio = new Audio("audio/Juiced.mp3");
audio.loop = false;
audio.pause();

const canvas = document.getElementById("mycanvas");
const imageLib = new ImageLib(canvas);

function drawOrange() {
  let points = [{ x: orangeX, y: orangeY }];
  let rotatedPoints = imageLib.rotate_fixed_point(
    points,
    orangeAngle,
    orangeX,
    orangeY
  );
  const color = { r: 255, g: 165, b: 0 };
  imageLib.create_circle(
    rotatedPoints[0].x,
    rotatedPoints[0].y,
    orangeRadius,
    color
  );

  imageLib.ctx.save();
  imageLib.ctx.translate(orangeX, orangeY);
  imageLib.ctx.rotate(orangeAngle);
  imageLib.ctx.drawImage(
    orangeImage,
    -orangeRadius,
    -orangeRadius,
    orangeRadius * 2,
    orangeRadius * 2
  );
  imageLib.ctx.restore();
}

function juiceOrange() {
  orangeRadius = Math.random() * 50 + 30;
  const newVolume = Math.random();
  audio.volume = newVolume;
  console.log(
    `Volume adjusted to: ${newVolume.toFixed(
      2
    )}, Orange size: ${orangeRadius.toFixed(2)}`
  );
  if (audio.paused) audio.play();
  drawOrange();
}

function isClickOnOrange(x, y) {
  const dist = Math.sqrt(Math.pow(x - orangeX, 2) + Math.pow(y - orangeY, 2));
  return dist <= orangeRadius;
}
function getRandomPosition() {
  const newX = Math.random() * (canvas.width - orangeRadius * 2) + orangeRadius;
  const newY =
    Math.random() * (canvas.height - orangeRadius * 2) + orangeRadius;
  return { newX, newY };
}

function animateOrangeMovement() {
  const dx = targetX - orangeX;
  const dy = targetY - orangeY;
  const distance = Math.sqrt(dx * dx + dy * dy);
  if (distance > 1) {
    orangeX += dx * moveSpeed;
    orangeY += dy * moveSpeed;
    drawOrange();
  } else {
    drawOrange();
  }
}

canvas.addEventListener("click", (event) => {
  const rect = canvas.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;

  if (isClickOnOrange(mouseX, mouseY)) {
    juiceOrange();
    const { newX, newY } = getRandomPosition();
    targetX = newX;
    targetY = newY;
  }
});
let rotationSpeed = 0;

function updateRotation() {
  rotationSpeed = audio.volume * Math.PI * 8;
  const deltaTime = (performance.now() - lastTime) / 1000;
  orangeAngle += rotationSpeed * deltaTime;
  if (orangeAngle >= Math.PI * 2) orangeAngle -= Math.PI * 2;
  animateOrangeMovement();
  lastTime = performance.now();
}

let lastTime = 0;
function renderLoop(timestamp) {
  const deltaTime = timestamp - lastTime;
  lastTime = timestamp;

  updateRotation();
  requestAnimationFrame(renderLoop);
}

orangeImage.onload = () => {
  drawOrange();
  requestAnimationFrame(renderLoop);
};
