export class ImageLib {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.image_data = this.ctx.createImageData(this.canvas.width, this.canvas.height);
    }
    
    // Menggambar
    draw() {
        this.ctx.putImageData(this.image_data, 0, 0);
    }

    // Membersih
    clear() {
        const whiteColor = { r: 255, g: 255, b: 255 };
        for (let x = 0; x < this.canvas.width; x++) {
            for (let y = 0; y < this.canvas.height; y++) {
                this.create_dot(x, y, whiteColor);
            }
        }
    }
    

    // Membuat Titik
    create_dot(x, y, color) {
        let index = 4 * (Math.round(x) + (Math.round(y) * this.canvas.width));

        this.image_data.data[index] = color.r;
        this.image_data.data[index + 1] = color.g;
        this.image_data.data[index + 2] = color.b;
        this.image_data.data[index + 3] = 255;
    }
    
    // Membuat Garis
    create_line(x0, y0, x1, y1, color) {
        var dx = x1 - x0;
        var dy = y1 - y0;

        if (Math.abs(dx) > Math.abs(dy)) {
            // Jalan di x
            if (x1 > x0) {
                // Ke kanan
                var y = y0;
                for (var x = x0; x < x1; x++) {
                    y = y + dy / Math.abs(dx);
                    this.create_dot(Math.round(x), Math.round(y), color);
                }
            } else { // x2 < x1
                // Ke kiri
                var y = y0;
                for (var x = x0; x >= x1; x--) {
                    y = y + dy / Math.abs(dx);
                    this.create_dot(Math.round(x), Math.round(y), color);
                }
            }
        } else {
            // Jalan di y
            if (y1 > y0) {
                // Ke kanan
                var x = x0;
                for (var y = y0; y < y1; y++) {
                    x = x + dx / Math.abs(dy);
                    this.create_dot(Math.round(x), Math.round(y), color);
                }
            } else { // x2 < x1
                // Ke kiri
                var x = x0;
                for (var y = y0; y > y1; y--) {
                    x = x + dx / Math.abs(dy);
                    this.create_dot(Math.round(x), Math.round(y), color);
                }
            }
        }
    }

    // Membuat Lingkaran
    create_circle(xc, yc, radius, color) {
        for (var x = xc - radius; x < xc + radius; x++) {
            var y = yc + Math.sqrt(Math.pow(radius, 2) - Math.pow((x - xc), 2));
            this.create_dot(Math.ceil(x), Math.ceil(y), color);
            var y2 = yc - Math.sqrt(Math.pow(radius, 2) - Math.pow((x - xc), 2));
            this.create_dot(Math.ceil(x), Math.ceil(y2), color);
        }
    }

    // Membuat Sun
    create_sun(xc, yc, radius, color) {
        this.create_circle(xc, yc, radius, color);
    }

    // Membuat Lingkaran dengan gradient
    create_gradient_circle(xc, yc, radius, color1, color2) {
        var gradient = this.ctx.createRadialGradient(xc, yc, 0, xc, yc, radius);
        gradient.addColorStop(0, color1);
        gradient.addColorStop(1, color2);
        this.ctx.beginPath();
        this.ctx.arc(xc, yc, radius, 0, 2 * Math.PI);
        this.ctx.fillStyle = gradient;
        this.ctx.fill();
    }

    // Membuat Rectangle
    create_rectangle(x, y, width, height, color) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, width, height);
    }

    // Membuat Star
    create_star(x, y, radius, points, color) {
        let step = Math.PI / points;
        let shift = Math.PI / 2;

        this.ctx.beginPath();
        for (let i = 0; i < 2 * points; i++) {
            let angle = i * step + shift;
            let length = i % 2 === 0 ? radius : radius / 2;
            let xPos = x + length * Math.cos(angle);
            let yPos = y - length * Math.sin(angle);
            if (i === 0) {
                this.ctx.moveTo(xPos, yPos);
            } else {
                this.ctx.lineTo(xPos, yPos);
            }
        }
        this.ctx.closePath();
        this.ctx.fillStyle = color;
        this.ctx.fill();
    }

    // Rotate an object by a fixed angle
    rotate_object(points, angle) {
        let rotatedPoints = [];
        for (let point of points) {
            let rotatedPoint = this.rotate(point, angle);
            rotatedPoints.push(rotatedPoint);
        }
        return rotatedPoints;
    }

    // Membuat Ellipse Polar
    create_ellipse_polar(xc, yc, radiusX, radiusY, color) {
        for (var theta = 0; theta < Math.PI * 2; theta += 0.01) {
            var x = xc + radiusX * Math.cos(theta);
            var y = yc + radiusY * Math.sin(theta);
            this.create_dot(Math.ceil(y), Math.ceil(x), color);
        }
    }

    // Membuat Spiral
    create_spiral(xc, yc, radius, color) {
        for (var theta = 0; theta < Math.PI * 9; theta += 0.01) {
            radius += 0.08;
            var x = xc + radius * Math.cos(theta);
            var y = yc + radius * Math.sin(theta);
            this.create_dot(Math.ceil(y), Math.ceil(x), color);
        }
    }

    // Membuat Bunga
    bunga(xc, yc, radius, n, color) {
        for (var theta = 0; theta <= 9 * Math.PI; theta += 0.01) {
            var r = radius * Math.cos(n * theta);
            var x = xc + r * Math.cos(theta);
            var y = yc + r * Math.sin(theta);
            this.create_dot(Math.ceil(y), Math.ceil(x), color);
        }
    }

    // Draw Sun
    drawSun(x, y, zoom) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.beginPath();
        this.ctx.arc(x, y, 50 * zoom, 0, Math.PI * 2);
        this.ctx.fillStyle = "yellow";
        this.ctx.fill();
    }

    // Membuat Polyline
    create_polyline(point_array, color) {
        var point = point_array[0];

        this.create_line(point.x, point.y, 150, 100, color);

        for (var i = 1; i < point_array.length; i++) {
            var point_2 = point_array[i];

            this.create_line(point.x, point.y, point_2.x, point_2.y, color);
            point = point_2;
        }
    }

    // Membuat Polygon
    create_polygon(point_array, color) {
        var point = point_array[0];

        for (var i = 1; i < point_array.length; i++) {
            var point_2 = point_array[i];

            this.create_line(point.x, point.y, point_2.x, point_2.y, color);
            point = point_2;
        }
        this.create_line(point.x, point.y, point_array[0].x, point_array[0].y, color);
    }

    // Translate
    translate(point, T) {
        var x_baru = point.x + T.x;
        var y_baru = point.y + T.y;

        return {x: x_baru, y: y_baru};
    }

    // Penskalaan
    penskalaan(point, S) {
        var x_baru = point.x * S.x;
        var y_baru = point.y * S.y;

        return {x: x_baru, y: y_baru};
    }

    // Rotate
    rotate(point, sudut) {
        var x_baru = point.x * Math.cos(sudut) - point.y * Math.sin(sudut);
        var y_baru = point.y * Math.sin(sudut) + point.y * Math.cos(sudut);
        
        return {x: x_baru, y: y_baru};
    }

    // Rotate fixed point
    rotate_fixed_point(points, angle, xc, yc) {
        var rotatedPoints = [];
        for (let point of points) {
            let rotatedPoint = this.rotate(point, angle);
            rotatedPoint.x += xc;
            rotatedPoint.y += yc;
            rotatedPoints.push(rotatedPoint);
        }
        return rotatedPoints;
    }

    // Resize
    resize_image(x, y) {
        let newWidth = this.canvas.width * x;
        let newHeight = this.canvas.height * y;

        this.canvas.width = newWidth;
        this.canvas.height = newHeight;
    }
}
