export default class Player {
    constructor(spritesheet) {
        this.spritesheet = spritesheet
        this.x = 0
        this.y = 0
        this.vx = 0
        this.vy = 0
        this.facing = 0
        this.last_direction = 0
    }
    draw(ctx) {
        this.spritesheet.draw(ctx, this.x, this.y)
    }
    update(ctx){
        this.spritesheet.rpgmUpdate()
        let prev_x = this.x
        let prev_y = this.y
        this.movement()
        let move_dir_x = this.x - prev_x
        let move_dir_y = this.y - prev_y
        if (this.last_direction == 0 && move_dir_x != 0) {
            if (move_dir_x > 0){ this.facing = 2 }
            else if (move_dir_x < 0){ this.facing = 1 }
        }
        else if (this.last_direction == 1 && move_dir_y != 0) {
            if (move_dir_y > 0){ this.facing = 0 }
            else if (move_dir_y < 0){ this.facing = 3 }
        }

        this.spritesheet.sy = this.spritesheet.sprite_h * this.facing

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

    handle_inputs(input){
        if (input.keys["ArrowRight"].down){ this.vx += 5; }
        if (input.keys["ArrowLeft"].down){ this.vx -= 5; }
        if (input.keys["ArrowUp"].down){ this.vy -= 5; }
        if (input.keys["ArrowDown"].down){ this.vy += 5; }
        this.correct_direction()
    }

    correct_direction(){
        if (this.vy == 0){ this.last_direction = 0 }
        if (this.vx == 0){ this.last_direction = 1 }
    }
}
