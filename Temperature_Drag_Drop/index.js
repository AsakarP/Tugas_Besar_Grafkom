// Nama: Samuel Setyawan Prakasa
// NRP: 2272030

// Nama: Julyanto Jie
// NRP: 2272038

import { ImageLib } from "./lib.js";

const lib = new ImageLib('my_canvas');

let canvas = lib.canvas_handler;

// Array kotak air
let points = [
    { x: 500, y: 650 }, // points[0]
    { x: 500, y: 850 }, // points[1]
    { x: 700, y: 850 }, // points[2]
    { x: 700, y: 650 } // points[3]
];

// Array area panas
let pointsMerah = [
    { x: 150, y: 250 },
    { x: 150, y: 600 },
    { x: 500, y: 600 }, // Kanan Bawah
    { x: 500, y: 250 }
];

// Array area dingin
let pointsBiru = [
    { x: 700, y: 250 },
    { x: 700, y: 600 },
    { x: 1050, y: 600 },
    { x: 1050, y: 250 }
];

let drag = false;
let offsetX, offsetY;

let fillx = points[0].x;
let filly = points[0].y;

let color = { r: 13, g: 69, b: 252 };

// Fungsi menggambar outline kotak air
function gambarKotak() {
    lib.create_polygon(points, color);
    lib.draw();
}

// Fungsi mengisi kotak air dengan warna
function kotakAir() {
    gambarKotak();
    lib.floodFillStack(canvas, fillx + 1, filly + 1, { r: 0, g: 0, b: 0 }, color);
    lib.draw();
}

kotakAir();

// Fungsi membuat area panas dan dingin
function area() {
    lib.create_polygon(pointsMerah, { r: 252, g: 86, b: 86 });
    lib.create_polygon(pointsBiru, { r: 179, g: 246, b: 255 });
    lib.draw();
}

area();



// Fungsi Cek klik didalam kotak
function didalamKotak(x, y) {
    return x > points[0].x && x < points[2].x && y > points[0].y && y < points[2].y;
}
// Bantuan Chat-GPT
// "How do i make it so if the square is in
// pointsMerah the square will become red and if 
// it is in pointsBiru it will become blue."
// Fungsi cek kalau kotak air didalam kotak merah
function didalamKotakMerah() {
    return points[0].x >= pointsMerah[0].x && points[2].x <= pointsMerah[2].x &&
        points[0].y >= pointsMerah[0].y && points[1].y <= pointsMerah[1].y;
}
// Fungsi cek kalau kotak air didalam kotak biru
function didalamKotakBiru() {
    return points[0].x >= pointsBiru[0].x && points[2].x <= pointsBiru[2].x &&
        points[0].y >= pointsBiru[0].y && points[1].y <= pointsBiru[1].y;
}

// Event listener klik
canvas.addEventListener('mousedown', function (ev) {
    var rect = canvas.getBoundingClientRect();
    var x = ev.clientX - rect.left;
    var y = ev.clientY - rect.top;

    if (didalamKotak(x, y)) {
        drag = true;
        offsetX = x - points[0].x;
        offsetY = y - points[0].y;
    }
});

// Event listener klik dan drag
canvas.addEventListener('mousemove', function (ev) {
    if (drag) {
        var rect = canvas.getBoundingClientRect();
        var x = ev.clientX - rect.left;
        var y = ev.clientY - rect.top;

        const dx = x - offsetX;
        const dy = y - offsetY;

        points = [
            { x: dx, y: dy },
            { x: dx, y: dy + 200 },
            { x: dx + 200, y: dy + 200 },
            { x: dx + 200, y: dy },
        ];

        fillx = points[0].x
        filly = points[0].y

        if (didalamKotakMerah()) {
            color = { r: 252, g: 86, b: 86 };
        } else if (didalamKotakBiru()) {
            color = { r: 179, g: 246, b: 255 };
        } else {
            color = { r: 13, g: 69, b: 252 };
        }
        // Bantuan Chat-GPT
        // "i encounter a problem, and that is its
        // pretty laggy when i dragged and move 
        // it somewhere else."
        requestAnimationFrame(() => {
            lib.clear();
            kotakAir();
            area();
        });
    };
});

// Event listener lepas klik
canvas.addEventListener('mouseup', function () {
    drag = false;
});
