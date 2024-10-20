import Spritesheet from "./spritesheet.js"
import Button from "./button.js"
import Menu from "./menu.js"
class Player {
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
    update(){
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

class Grid {
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



let scene = 0
const canvas = document.getElementById("canvas")
const bound = canvas.parentElement.getBoundingClientRect()
canvas.width = bound.width
canvas.height = bound.height
console.log('Canvas Size: ' + canvas.width + 'x' + canvas.height)

const ctx = canvas.getContext("2d")

// var btn1 = new Button('Skip', '#101010', '#ffffff')
// btn1.setPosition(canvas.width / 2 - 100, 150)
// btn1.setSize(200, 75)

//(x, y, options, bgColor, textColor='#FFFFFF', alpha=1.0, font='RM2000.ttf', font_size=25)
var title = new Menu(0, 0,  ['New Game', 'Continue', 'Options', 'Exit'])
title.alpha = 0.5
title.x = canvas.width/2 - title.width/2
title.y = canvas.height/2 - title.height/2
let titlebg = new Image()
titlebg.src = '../images/Plain.png'
titlebg.onload = function() {
    console.log('titlebg loaded')
}
// file, spriteWidth, spriteHeight, margin, spacing
var plf = new Spritesheet('../images/plf.png', 48, 48, 0, 0)
var player = new Player(plf)

var grid = new Grid()

addEventListener("keydown", function(e){
    // console.log('down ' + e.code)
    switch(scene){
        case 0:
            switch(e.code){
                case "ArrowRight": 
                    break;
                case "ArrowLeft": 
                    break;
                case "ArrowUp": 
                    title.selectedIndex -= 1;
                    break;
                case "ArrowDown": 
                    title.selectedIndex += 1;
                case "Space":
                    if (title.selectedIndex == 0){scene = 1}
                    break;
            }
        case 1:
            switch(e.code){
                case "ArrowRight": 
                    player.vx = 5;
                    player.spritesheet.sy = player.spritesheet.sprite_h * 2
                    break;
                case "ArrowLeft": 
                    player.vx = -5;
                    player.spritesheet.sy = player.spritesheet.sprite_h * 1
                    break;
                case "ArrowUp": 
                    player.vy = -5;
                    player.spritesheet.sy = player.spritesheet.sprite_h * 3
                    break;
                case "ArrowDown": 
                    player.vy = 5;
                    player.spritesheet.sy = player.spritesheet.sprite_h * 0
                    break;
                default:
                    // console.log("vx: " + player.vx)
                    // console.log("vy: " + player.vy)
            break
        }
    }
})

addEventListener("keyup", function(e){
    // console.log("up " + e.code)
    switch(e.code){
        case "ArrowRight": 
            player.vx = 0;
            break;
        case "ArrowLeft": 
            player.vx = 0;
            break;
        case "ArrowUp": 
            player.vy = 0;
            break;
        case "ArrowDown": 
            player.vy = 0;
            break;
    }
})
function update(){
    requestAnimationFrame(update)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    switch(scene){
        case 0:
            ctx.drawImage(titlebg, canvas.width/2 - titlebg.width/2,
                canvas.height/2 - titlebg.width/2)
            title.update()
            title.draw(ctx)
            break
        case 1:
            grid.draw(ctx)
            player.update()
            player.draw(ctx)
            break
    }
}
update()