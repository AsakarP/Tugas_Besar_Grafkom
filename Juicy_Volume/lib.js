export class ImageLib {
    // Konstruktor
    constructor(my_canvas) {
        this.canvas_handler = document.querySelector(`#${my_canvas}`);
        this.context = this.canvas_handler.getContext("2d");
        this.image_data = this.context.getImageData(0, 0, this.canvas_handler.width, this.canvas_handler.height);
    }
    
    // Menggambar
    draw() {
        this.context.putImageData(this.image_data, 0, 0);
    }

    // Membersih
    clear() {
        this.canvas_handler.width = this.canvas_handler.width;
        this.image_data = this.context.getImageData(0, 0, this.canvas_handler.width, this.canvas_handler.height);
    }

    // Membuat Titik
    create_dot(x, y, color) {
        let index = 4 * (Math.round(x) + (Math.round(y) * this.canvas_handler.width));
    
        this.image_data.data[index] = color.r;
        this.image_data.data[index+1] = color.g;
        this.image_data.data[index+2] = color.b;
        this.image_data.data[index+3] = 255;
    }
    
    // Membuat Garis
    create_line(x0, y0, x1, y1, color) {
        var dx = x1 - x0;
        var dy = y1 - y0;
    
        if(Math.abs(dx) > Math.abs(dy)) {
            // Jalan di x
            if(x1 > x0) {
                // Ke kanan
                var y = y0;
                for(var x=x0; x<x1; x++) {
                    y = y + dy / Math.abs(dx);
                    this.create_dot(Math.round(x), Math.round(y), color);
                }
            } 
            else { //x2 < x1
                // Ke kiri
                var y = y0;
                for(var x=x0; x>=x1; x--) {
                    y = y + dy / Math.abs(dx);
                    this.create_dot(Math.round(x), Math.round(y), color);
                }
            }
        }
        else {
            // Jalan di y
            if(y1 > y0) {
                // Ke kanan
                var x = x0;
                for(var y=y0; y<y1; y++) {
                    x = x + dx / Math.abs(dy);
                    this.create_dot(Math.round(x), Math.round(y), color);
                }
            } 
            else { // x2 < x1
                // Ke kiri
                var x = x0;
                for(var y=y0; y>y1; y--) {
                    x = x + dx / Math.abs(dy);
                    this.create_dot(Math.round(x), Math.round(y), color);
                }
            }
        }
    }

    // Membuat Lingkaran
    create_circle(xc, yc, radius, color) {
        for(var x=xc-radius; x<xc+radius; x++) {
            var y = yc + Math.sqrt(Math.pow(radius, 2) - Math.pow((x - xc), 2));
            this.create_dot(Math.ceil(x), Math.ceil(y), color);

            var y = yc - Math.sqrt(Math.pow(radius, 2) - Math.pow((x - xc), 2));
            this.create_dot(Math.ceil(x), Math.ceil(y), color);
        }

        for(var x=xc-radius; x<xc+radius; x++) {
            var y = yc + Math.sqrt(Math.pow(radius, 2) - Math.pow((x - xc), 2));
            this.create_dot(Math.ceil(y), Math.ceil(x), color);

            var y = yc - Math.sqrt(Math.pow(radius, 2) - Math.pow((x - xc), 2));
            this.create_dot(Math.ceil(y), Math.ceil(x), color);
        }
    }

    // Membuat Lingkaran Polar
    create_lingkaran_polar(xc, yc, radius, color) {
        for(var theta=0; theta<Math.PI*2; theta+=0.01) {
            var x = xc + radius * Math.cos(theta);
            var y = yc + radius * Math.sin(theta);
            this.create_dot(Math.ceil(y), Math.ceil(x), color);
        }
    }

    // Membuat Ellipse Polar
    create_ellipse_polar(xc, yc, radiusX, radiusY, color) {
        for(var theta=0; theta<Math.PI*2; theta+=0.01) {
            var x = xc + radiusX * Math.cos(theta);
            var y = yc + radiusY * Math.sin(theta);
            this.create_dot(Math.ceil(y), Math.ceil(x), color);
        }
    }

    // Membuat Spiral
    create_spiral(xc, yc, radius, color) {
        for(var theta=0; theta<Math.PI*9; theta+=0.01) {
            radius += 0.08
            var x = xc + radius * Math.cos(theta);
            var y = yc + radius * Math.sin(theta);
            this.create_dot(Math.ceil(y), Math.ceil(x), color);
        }
    }

    // Membuat Bunga
    bunga(xc, yc, radius, n, color) {
        for(var theta=0; theta<=9*Math.PI; theta+=0.01) {
            var r = radius * Math.cos(n * theta);
            var x = xc + r * Math.cos(theta);
            var y = yc + r * Math.sin(theta);
            this.create_dot(Math.ceil(y), Math.ceil(x), color);
        }
    }

    // Membuat Polyline
    create_polyline(point_array,color) {
        var point = point_array[0];

        this.create_line(point.x, point.y, 150, 100, color);

        for(var i=1; i<point_array.length; i++) {
            var point_2 = point_array[i];

            this.create_line(point.x, point.y, point_2.x, point_2.y, color);
            point = point_2;
        }
    }

    // Membuat Polygon
    create_polygon(point_array, color) {
        var point = point_array[0];

        for(var i=1; i<point_array.length; i++) {
            var point_2 = point_array[i];

            this.create_line(point.x, point.y, point_2.x, point_2.y, color);
            point = point_2;
        }
        this.create_line(point.x, point.y, point_array[0].x, point_array[0].y, color);
    }
        
    // Obat Nyamuk
    obatNyamuk(xc, yc, radius, size, color) {
        console.info('test')
        for(var theta=0; theta<Math.PI*9; theta+=0.01) {
            radius += size
            var x = xc + radius * Math.cos(theta);
            var y = yc + radius * Math.sin(theta);
            this.create_dot(Math.ceil(y), Math.ceil(x), color);
        }
    }

    // Flood fill naive
    floodFillNaive(canvas_handler, x, y, toFlood, color) {
        var index = 4 * (x + y * canvas_handler.width);

        var r1 = this.image_data.data[index];
        var g1 = this.image_data.data[index+1];
        var b1 = this.image_data.data[index+2];

        if(r1 == toFlood.r && g1 == toFlood.g && b1 == toFlood.b) {
            this.image_data.data[index] = color.r;
            this.image_data.data[index+1] = color.g;
            this.image_data.data[index+2] = color.b;
            this.image_data.data[index+3] = 255;

            this.floodFillNaive(canvas_handler, x+1, y, toFlood, color);
            this.floodFillNaive(canvas_handler, x, y+1, toFlood, color);
            this.floodFillNaive(canvas_handler, x-1, y, toFlood, color);
            this.floodFillNaive(canvas_handler, x, y-1, toFlood, color);
        }
    }

    // Flood fill stack
    floodFillStack(canvas_handler, x0, y0, toFlood, color) {
        var tumpukan = [];
        tumpukan.push({ x: x0, y: y0})

        while(tumpukan.length > 0) {
            var titik_sekarang = tumpukan.pop();
            var index_sekarang = 4 * (titik_sekarang.x + titik_sekarang.y * canvas_handler.width);
            
            var r1 = this.image_data.data[index_sekarang];
            var g1 = this.image_data.data[index_sekarang+1];
            var b1 = this.image_data.data[index_sekarang+2];

            if(r1 == toFlood.r && g1 == toFlood.g && b1 == toFlood.b) {
                // Kalo warna ok buat diganti
                this.image_data.data[index_sekarang] = color.r;
                this.image_data.data[index_sekarang+1] = color.g;
                this.image_data.data[index_sekarang+2] = color.b;
                this.image_data.data[index_sekarang+3] = 255;
    
                tumpukan.push({x: titik_sekarang.x+1, y:titik_sekarang.y});
                tumpukan.push({x: titik_sekarang.x-1, y:titik_sekarang.y});
                tumpukan.push({x: titik_sekarang.x, y:titik_sekarang.y+1});
                tumpukan.push({x: titik_sekarang.x, y:titik_sekarang.y-1});
            }
        }
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
    rotate_fp(point, point_putar, sudut) {
        var p1 = this.translate(point, {x: -point_putar.x, y: -point_putar.y});
        var p2 = this.rotate(p1, sudut);
        var p3 = this.translate(p2, point_putar);

        return p3;
    }

    // Penskalaan fixed point
    skala_fp(point, point_pusat, S) {
        var p1 = this.translate(point, {x: -point_pusat.x, y: -point_pusat.y});
        var p2 = this.penskalaan(p1, S);
        var p3 = this.translate(p2, point_pusat);

        return p3;
    }

}