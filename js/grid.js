export default class Grid {
    constructor() {
        this.size = 50
        this.square_size = 48
        this.gap = this.size - this.square_size
    }
    draw(ctx) {
        // console.log('draw grid')
        let font_size = 14
        ctx.textAlign = 'left' 
        ctx.font = `${font_size}px MS Mono`;
        ctx.fillStyle = `rgb(255,255,255)`;
        ctx.fillRect(
            this.gap,
            this.gap,
            Math.ceil(ctx.canvas.width/this.size - 1) * this.size+this.gap,
            Math.ceil(ctx.canvas.height/this.size - 1) * this.size+this.gap)
        for (let i = 0; i < (ctx.canvas.height/this.size)-1; i++) {
            for (var j = 0; j < (ctx.canvas.width/this.size)-1; j++) {
                //let t_x = this.size * j + this.size/4
                //let t_y = this.size * i + this.size/4
                let coord = `${j}, ${i}`
                ctx.fillStyle = `rgb(10,10,10)`;
                ctx.fillRect(
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

                ctx.fillStyle = `rgb(255,255,255)`;
                // ctx.fillText(coord, t_x+font_size/4, t_y+font_size/2);
                ctx.fillText(coord, this.size*j+this.gap*2, this.size*i+font_size+this.gap);
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
        //}gam
    }
}
