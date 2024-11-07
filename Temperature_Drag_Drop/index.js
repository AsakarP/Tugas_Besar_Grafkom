// Nama: Samuel Setyawan Prakasa
// NRP: 2272030

// Nama: Julyanto Jie
// NRP: 2272038

import { ImageLib } from "./lib.js";

const lib = new ImageLib('my_canvas')

let canvas = lib.canvas_handler;

let points = [
    {x:350, y:350},
    {x:350, y:600},
    {x:600, y:600},
    {x:600, y:350}
]

let drag = false;
let offsetX, offsetY;

let fillx = points[0].x
let filly = points[0].y

function kotakMerah() {
    lib.create_polygon(points, {r:255,g:0,b:0});
    lib.floodFillStack(canvas, fillx+1, filly+1, {r:0,g:0,b:0}, {r:255,g:0,b:0})
    lib.draw();
}

kotakMerah();

function didalamKotak(x, y) {
    return x > points[0].x && x < points[2].x && y > points[0].y && y < points[2].y;
}

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

canvas.addEventListener('mousemove', function (ev) {
    if (drag) {
        var rect = canvas.getBoundingClientRect();
        var x = ev.clientX - rect.left;
        var y = ev.clientY - rect.top;

        const dx = x - offsetX;
        const dy = y - offsetY;

        points = [
            {x:dx, y: dy},
            {x:dx, y: dy+250},
            {x:dx+250, y: dy+250},
            {x:dx+250, y: dy},
        ];

        fillx = points[0].x
        filly = points[0].y

        lib.clear();
        kotakMerah();
    }
});

canvas.addEventListener('mouseup', function () {
    drag = false;
});

console.log(fillx, filly)


