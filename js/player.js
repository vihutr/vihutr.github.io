export default class Player {
    constructor(spritesheet) {
        this.spritesheet = spritesheet
        this.x = 0
        this.y = 0
        this.vx = 0
        this.vy = 0
        this.held_keys = [false, false, false, false] //wasd
    }
    draw(ctx) {
        this.spritesheet.draw(ctx, this.x, this.y)
    }
    update(ctx){
        this.spritesheet.rpgmUpdate()
        this.movement()
        //limit
        if (this.x < 0) { this.x = 0 }
        if (this.x > ctx.canvas.width - this.spritesheet.sprite_w) { 
            this.x = ctx.canvas.width - this.spritesheet.sprite_w }
        if (this.y < 0) { this.y = 0 }
        if (this.y > ctx.canvas.height - this.spritesheet.sprite_h) { 
            this.y = ctx.canvas.height - this.spritesheet.sprite_h }
        // console.log('x: ' + this.x)
        // console.log('y: ' + this.y)
    }

    movement(){
        this.x += this.vx
        this.y += this.vy
    }
}
