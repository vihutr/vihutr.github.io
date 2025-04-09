export default class Grid {
    constructor(ctx) {
        this.size = 50;
        this.square_size = 48;
        this.gap = this.size - this.square_size;
        this.w = Math.ceil(ctx.canvas.width/this.size - 1);
        this.h = Math.ceil(ctx.canvas.height/this.size - 1);
        this.canvas = document.createElement("canvas");
        this.ctx = this.canvas.getContext("2d");

        this.canvas.width = ctx.canvas.width;
        this.canvas.height = ctx.canvas.height;
        
        this.createGrid();
    }

    draw(ctx){
        ctx.drawImage(this.canvas, 0, 0);
    }

    createGrid() {
        console.log('create grid')
        let font_size = 14
        this.ctx.textAlign = 'left' 
        this.ctx.font = `${font_size}px MS Mono`;
        this.ctx.fillStyle = `rgb(255,255,255)`;
        this.ctx.fillRect(
            this.gap,
            this.gap,
            this.w * this.size+this.gap,
            this.h * this.size+this.gap)
        for (let i = 0; i < this.h; i++) {
            for (var j = 0; j < this.w; j++) {
                //let t_x = this.size * j + this.size/4
                //let t_y = this.size * i + this.size/4
                let coord = `${j}, ${i}`
                this.ctx.fillStyle = `rgb(10,10,10)`;
                this.ctx.fillRect(
                    2*this.gap+(this.size * j),
                    2*this.gap+(this.size * i),
                    this.square_size,
                    this.square_size
                )
                // ctx.fillStyle = `rgb(255,0,0)`;
                // ctx.fillRect(
                //     t_x,
                //     t_y,
                //     5,
                //     5
                // )

                this.ctx.fillStyle = `rgb(255,255,255)`;
                // coord
                this.ctx.fillText(coord, this.size*j+this.gap*2, this.size*i+font_size+this.gap);
            }
        }

        //for (let i = 0; i < (ctx.canvas.height / this.size) - 1; i++) {
        //    for (var j = 0; j < (ctx.canvas.width/ this.size) - 1; j++) {
        //    }
        //        let t_x = this.size * j
        //        let t_y = this.size * i
        //        let coord = `${i}, ${j}`
        //        ctx.fillStyle = `rgb(255,255,255)`;
        //        ctx.font = "8px MS Mono";
        //        ctx.fillText(coord, t_x, t_y);
        //        ctx.fillStyle = `rgb(10,10,10)`;
        //}
    }
}
