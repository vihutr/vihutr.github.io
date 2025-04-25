export default class Player {
    constructor(spritesheet) {
        this.spritesheet = spritesheet
        this.x = 4
        this.y = 4
        this.vx = 0
        this.vy = 0
        this.facing = 0
        this.last_direction = null
        this.speed = 5
        this.moving = false
        this.timer = 0
        this.startx = this.x
        this.starty = this.y
        this.endx = null
        this.endy = null
        this.grid_dist = 50
    }
    draw(ctx) {
        this.spritesheet.draw(ctx, this.x, this.y)
    }
    update(ctx, msPerFrame){
        this.spritesheet.rpgmUpdate()
        this.grid_movement(msPerFrame)

        //limit
        if (this.x < 4) { this.x = 4 }
        if (this.x > this.limit_w) { 
            this.x = this.limit_w
        }
        if (this.y < 4) { this.y = 4 }
        if (this.y > this.limit_h) { 
            this.y = this.limit_h
        }
        this.startx = this.x
        this.starty = this.y
        // console.log('x: ' + this.x)
        // console.log('y: ' + this.y)
    }

    free_movement(){
        let prev_x = this.x
        let prev_y = this.y
        this.x += this.vx
        this.y += this.vy
        let move_dir_x = this.x - prev_x
        let move_dir_y = this.y - prev_y
        // get facing
        if (this.last_direction == 0 && move_dir_x != 0) {
            if (move_dir_x > 0){ this.facing = 2 }
            else if (move_dir_x < 0){ this.facing = 1 }
        }
        else if (this.last_direction == 1 && move_dir_y != 0) {
            if (move_dir_y > 0){ this.facing = 0 }
            else if (move_dir_y < 0){ this.facing = 3 }
        }

        this.spritesheet.sy = this.spritesheet.sprite_h * this.facing
    }
    
    grid_movement(msPerFrame){
        if (!this.moving && (this.vx != 0 || this.vy != 0)) {
            this.moving = true
            if (this.vx > 0) { this.endx = this.startx + this.grid_dist }
            else if (this.vx < 0) { this.endx = this.startx - this.grid_dist }
            if (this.vy > 0) { this.endy = this.starty + this.grid_dist }
            else if (this.vy < 0) { this.endy = this.starty - this.grid_dist }
            // console.log(this.last_direction)

        } else if (this.moving) {
            // console.log("moving")
            this.timer += msPerFrame/60
            // console.log(this.timer)
            if (this.timer >= 1) {
                this.timer = 1
                this.moving = false
                if (this.endx != null){ this.x = this.endx }
                if (this.endy != null){ this.y = this.endy }
                this.timer = 0
                this.startx = this.x
                this.starty = this.y
                this.last_direction = null
                // console.log("final pos")
                // console.log(this.x, this.y)
            }
            // console.log(this.last_direction)
            // consider adding diagonals as well
            // console.log("lerp x")
            this.x = this.lerp( this.startx, this.endx, this.timer)
            this.y = this.lerp( this.starty, this.endy, this.timer)
            // console.log(this.x)
            // console.log("lerp y")
            // console.log(this.y)
        }
    }

    lerp(start, end, t) {
        let result = (start + (t * (end - start)));
        // console.log("lerp func")
        // console.log(start, end, t)
        // console.log(result)
        return result
    }
    // add a stack to track when inputs were last held down maybe
    handle_inputs(input){
        if (!this.moving) {
            if (input.keys["ArrowRight"].down){ this.vx += this.speed; }
            if (input.keys["ArrowLeft"].down){ this.vx -= this.speed; }
            if (input.keys["ArrowUp"].down){ this.vy -= this.speed; }
            if (input.keys["ArrowDown"].down){ this.vy += this.speed; }
            this.correct_direction()
        }
    }

    correct_direction(){
        if (this.vy == 0){ this.last_direction = 0 }
        if (this.vx == 0){ this.last_direction = 1 }
    }

    get_grid_dimensions(grid){
        this.grid_w = grid.w;
        this.grid_h = grid.h;
        this.limit_w = ((this.grid_w - 1) * this.grid_dist) + 4
        this.limit_h = ((this.grid_h - 1) * this.grid_dist) + 4
        // console.log("grid dimen")
        // console.log(this.grid_w, this.grid_h)
        // console.log(this.limit_w, this.limit_h)
    }
}
