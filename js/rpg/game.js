import Spritesheet from "./spritesheet.js"
import Menu from "./menu.js"
import Player from "./player.js"
import Grid from "./grid.js"
import InputHandler from "./input.js"

let scene = "title"
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

var grid = new Grid(ctx)
player.get_grid_dimensions(grid)

var confirm1 = new Audio('../sounds/choice1.wav')
var confirm2 = new Audio('../sounds/choice2.wav')
var cancel1 = new Audio('../sounds/cancel1.wav')
confirm1.volume = .20
confirm2.volume = .20
cancel1.volume = .20

let accumulatedTime = 0;
let lastTime = 0;
let globalTimer = 0.0;
const fps = 60;
const ms = 1000;
const msPerFrame = 1000/fps;

const keyCodes = ["ArrowUp", "ArrowLeft", "ArrowDown", "ArrowRight", "KeyW", "KeyA", "KeyS", "KeyD", "Enter", "Space", "KeyZ", "KeyX", "Escape"]
let input = new InputHandler(keyCodes)

function gameLoop(currentTime){
    // delta time
    let deltaTime = currentTime - lastTime;
    lastTime = currentTime;
    accumulatedTime += deltaTime;
    globalTimer += deltaTime;
    
    // update
    
    // handle inputs based on scene
    // inputs are tied to dt over fps
    input.update(deltaTime);
    switch(scene){
        case 'title':
            if (input.keys["ArrowRight"] || input.keys["KeyD"]){
            }
            if (input.keys["ArrowLeft"] || input.keys["KeyA"]){
            }
            if (input.keys["ArrowUp"].justPressed() || input.keys["KeyW"].justPressed()){
                title.selectedIndex -= 1;
            }
            if (input.keys["ArrowDown"].justPressed() || input.keys["KeyS"].justPressed()){
                title.selectedIndex += 1;
            }
            if (input.keys["Enter"].justPressed() || input.keys["Space"].justPressed() || input.keys["KeyZ"].justPressed()){
                switch (title.selectedIndex){
                    case 0:
                        scene = "overworld";
                        confirm2.play();
                    break;
                }
            }
            if (input.keys["Escape"].justPressed() || input.keys["KeyX"].justPressed()){
                cancel1.play()
            }
            break;
        case 'overworld':
            player.vx = 0
            player.vy = 0
            player.handle_inputs(input)
            break;
    }

    // only update every frame according to fps
    while(accumulatedTime > msPerFrame){
        switch(scene){
            case 'title':
                title.update();
                break;
            case 'overworld':
                player.update(ctx, msPerFrame);
                break;
        }
        accumulatedTime -= msPerFrame;
    }
    
    // draw
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    switch(scene){
        case 'title':
            ctx.drawImage(titlebg, canvas.width/2 - titlebg.width/2,
                canvas.height/2 - titlebg.width/2);
            title.draw(ctx);
            break;
        case 'overworld':
            grid.draw(ctx);
            player.draw(ctx);
            break;
    }

    requestAnimationFrame(gameLoop);
}
requestAnimationFrame(gameLoop);
