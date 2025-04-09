export default class Spritesheet {
    constructor(file, spriteWidth, spriteHeight, margin, spacing){
        this.image = new Image()
        this.image.src = file
        this.image.addEventListener("load", () => {
            console.log("spritesheet loaded")
        })
        this.image.onload = function() {
            console.log(file + ' loaded')
        }
        this.sprite_w = spriteWidth
        this.sprite_h = spriteHeight
        this.margin = margin
        this.spacing = spacing
        this.x = 0
        this.y = 0
        this.sx = 0
        this.sy = 0
        this.currentSprite = 0
        this.rate = 0.1
        this.reversing = false
    }
    draw(ctx, x=0, y=0){
        ctx.drawImage(
            this.image,
            this.sx, this.sy,
            this.sprite_w, this.sprite_h,
            this.x + x, this.y + y,
            this.sprite_w, this.sprite_h
        );
    }
    update(){
        // console.log(this.sx)
        // console.log(this.currentSprite)
        
        this.currentSprite += this.rate
        this.sx = Math.floor(this.currentSprite) * this.sprite_w
        if (this.sx >= this.image.width){
            this.sx = 0
            this.currentSprite = 0
        }
    }
    rpgmUpdate(moving=true){
        // console.log('info')
        // console.log('sx: ' + this.sx)
        // console.log('sprite: ' + this.sx/this.sprite_w)
        // console.log('reversing? ' + this.reversing)
        // console.log(this.currentSprite)
        if (moving){
            if (!this.reversing){
                this.currentSprite -= this.rate
                this.sx = Math.floor(this.currentSprite) * this.sprite_w
                if (this.sx <= 0){
                    this.sx = 0
                    this.currentSprite = 0
                    this.reversing = !this.reversing
                }

            } else if (this.reversing) {
                this.currentSprite += this.rate
                this.sx = Math.floor(this.currentSprite) * this.sprite_w
                if (this.sx >= this.image.width){
                    this.sx -= this.sprite_w
                    this.currentSprite -= 1
                    this.reversing = !this.reversing
                }
            }
        }
        
    }
}
