// Nama: Samuel Setyawan Prakasa
// NRP: 2272030

// Nama: Julyanto Jie
// NRP: 2272038

import { ImageLib } from "./lib.js";

const lib = new ImageLib('my_canvas')

let canvas = lib.canvas_handler;

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
    console.log(x + " " + y);

    titik.push({x: x, y: y});

    lib.create_dot(x, y, 0);
    lib.draw();

    resizeFont();

    canvas.addEventListener('mousemove', onMouseMove);
});

// Saat klik di lepas maka akan berhenti menggambar
canvas.addEventListener('mouseup', function () {
    canvas.removeEventListener('mousemove', onMouseMove);
    console.log(totalScratch())
})

// Fungsi menggambar saat klik di tahan
function onMouseMove(ev) {
    var rect = canvas.getBoundingClientRect();

    var x = ev.clientX - rect.left;
    var y = ev.clientY - rect.top;
    console.log(x + " " + y);
    titik.push({x: x, y: y});
    lib.create_dot(x, y, 0);
    lib.draw();

    resizeFont();
}

function totalScratch() {
    return titik.length;
}

function resizeFont() {
    let totalTitik = titik.length;
    textIni.style.fontSize = `${10 + 0.05*totalTitik}px`
}


