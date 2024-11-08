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

let velocityX = (Math.random() * 2 - 1) * 3;
let velocityY = (Math.random() * 2 - 1) * 3;

const audio = new Audio("audio/Juiced.mp3");
audio.loop = false;
audio.pause();

const canvas = document.getElementById("mycanvas");
const imageLib = new ImageLib(canvas);

function drawOrange() {
  const color = { r: 255, g: 165, b: 0 };
  imageLib.create_circle(orangeX, orangeY, orangeRadius, color);

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
  const oldRadius = orangeRadius;
  
  orangeRadius = Math.random() * 50 + 30;
  const newVolume = Math.random();
  
  console.log('---Orange Stats---');
  console.log(`Scale: ${oldRadius.toFixed(2)} -> ${orangeRadius.toFixed(2)}`);
  console.log(`Volume: ${audio.volume.toFixed(2)} -> ${newVolume.toFixed(2)}`);
  console.log('----------------');
  
  audio.volume = newVolume;
  
  if (audio.paused) audio.play();
  velocityX = (Math.random() * 2 - 1) * 30;  
  velocityY = (Math.random() * 2 - 1) * 30;
  drawOrange();
}

function isClickOnOrange(x, y) {
  const dist = Math.sqrt(Math.pow(x - orangeX, 2) + Math.pow(y - orangeY, 2));
  return dist <= orangeRadius;
}

canvas.addEventListener("click", (event) => {
  const rect = canvas.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;

  if (isClickOnOrange(mouseX, mouseY)) {
    juiceOrange();
  }
});

function updatePositionAndBounce() {
  orangeX += velocityX;
  orangeY += velocityY;

  if (orangeX - orangeRadius <= 0 || orangeX + orangeRadius >= canvas.width) {
    velocityX = -velocityX;
    console.log('Bounced on wall!');
    console.log(`Current radius: ${orangeRadius.toFixed(2)}`);
    console.log(`Current volume: ${audio.volume.toFixed(2)}`);
  }
  if (orangeY - orangeRadius <= 0 || orangeY + orangeRadius >= canvas.height) {
    velocityY = -velocityY;
    console.log('Bounced on ceiling/floor!');
    console.log(`Current radius: ${orangeRadius.toFixed(2)}`);
    console.log(`Current volume: ${audio.volume.toFixed(2)}`);
  }

  orangeAngle += 0.05;
  if (orangeAngle >= Math.PI * 2) orangeAngle -= Math.PI * 2;
}

function render(timestamp) {
  updatePositionAndBounce();
  drawOrange();
  requestAnimationFrame(render);
}
requestAnimationFrame(render);
