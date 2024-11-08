// Nama: Samuel Setyawan Prakasa
// NRP: 2272030

// Nama: Julyanto Jie
// NRP: 2272038

import { ImageLib } from "./lib.js";

const lib = new ImageLib('my_canvas')

const lib2 = new ImageLib('canvasHitam')

const lib3 = new ImageLib('canvasPutih')

let canvas = lib.canvas_handler;

let canvasHitam = lib2.canvas_handler;

let canvasPutih = lib3.canvas_handler;

let color = {r:0, g:0, b:0};

let warnaHitam = true;

// Untuk Menampung Koordinat titik
let titik = [];

// Fungsi Mengambil Input Text dan menempelkan pada p
function tempelText() {
    var x = document.getElementById("textSaya").value;
    document.getElementById("textIni").innerHTML = x;
}
// Membuat fungsi tempel text jadi global
window.tempelText = tempelText;

// Saat klik di tahan maka akan menggambar
canvas.addEventListener('mousedown', function (ev) {
    var rect = canvas.getBoundingClientRect();
    var x = ev.clientX - rect.left;
    var y = ev.clientY - rect.top;
    lib.create_dot(x, y, color);
    lib.create_dot(x+1, y, color);
    lib.create_dot(x-1, y, color);
    lib.create_dot(x, y+1, color);
    lib.create_dot(x, y-1, color);
    lib.create_dot(x+1, y+1, color);
    lib.create_dot(x-1, y-1, color);
    lib.create_dot(x+1, y-1, color);
    lib.create_dot(x-1, y+1, color);
    lib.draw();
    titik.push({x: x, y: y});
    canvas.addEventListener('mousemove', onMouseMove);
});

// Saat klik di lepas maka akan berhenti menggambar
canvas.addEventListener('mouseup', function () {
    resizeFont();
    canvas.removeEventListener('mousemove', onMouseMove);
    console.log(titik.length)
})

// Fungsi menggambar saat klik di tahan
function onMouseMove(ev) {
    var rect = canvas.getBoundingClientRect();
    var x = ev.clientX - rect.left;
    var y = ev.clientY - rect.top;
    lib.create_dot(x, y, color);
    lib.create_dot(x+1, y, color);
    lib.create_dot(x-1, y, color);
    lib.create_dot(x, y+1, color);
    lib.create_dot(x, y-1, color);
    lib.create_dot(x+1, y+1, color);
    lib.create_dot(x-1, y-1, color);
    lib.create_dot(x+1, y-1, color);
    lib.create_dot(x-1, y+1, color);
    lib.draw();
    if (warnaHitam == true) {
        titik.push({x: x, y: y});
    }
    else {
        titik.pop();
    }
}

// Fungsi Mengubah Ukuran Font
function resizeFont() {
    let totalTitik = titik.length;
    if (warnaHitam == true) {
        textIni.style.fontSize = `${20 + 0.05 * totalTitik}px`
    }
    else {
        textIni.style.fontSize = `${20 - 0.05 * totalTitik}px`
    }
}

// Canvas Hitam
for (let i=0; i<50; i++) {
    for (let j=0; j<50; j++) {
        lib2.create_dot(0+i, 0+j, 0)
    }
}

// Event listener mengubah warna menjadi hitam
canvasHitam.addEventListener('click', function (ev) {
    var rect = canvasHitam.getBoundingClientRect();
    var x = ev.clientX - rect.left;
    var y = ev.clientY - rect.top;
    console.log(x + " " + y);
    color = {r:0,g:0,b:0}
    warnaHitam = true
});

// Canvas Putih, mengubah warna menjadi putih
canvasPutih.addEventListener('click', function (ev) {
    var rect = canvasHitam.getBoundingClientRect();
    var x = ev.clientX - rect.left;
    var y = ev.clientY - rect.top;
    console.log(x + " " + y);
    color = {r:255,g:255,b:255}
    warnaHitam = false
});


// Penghapus

lib2.draw();