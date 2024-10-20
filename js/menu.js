export default class Menu {
    constructor(x, y, options,
        bgColor='rgb(30,30,30)', textColor='rgb(255,255,255)', alpha=1.0, font='../fonts/RM2000.ttf', font_size=20) {
       this.x = x
        this.y = y
        this.options = options;
        this.bgColor = bgColor;
        this.textColor = textColor;

        this.unselectableTextColor = 'rgb(181, 172, 175)'
        this.alpha = alpha;
        this.font = new FontFace('menufont', `url(${font})`);
        this.font.load().then(function(font){
            // our code here
        });
        this.font_size = font_size;
        this.max_length = 0;
        for (let i = 0; i < this.options.length; i++){
            if (options[i].length > this.max_length) { this.max_length = options[i].length }
        }
        this.width = this.max_length * this.font_size
        this.height = this.options.length * this.font_size
        this.selectedIndex = 0
        this.selectedAlpha = 0
        this.selectedPulse = false
        this.pulseRate = 0.005
        this.selectable = [true, false, true, false]
    }
    update(){
        if (this.selectedPulse){ this.selectedAlpha -= this.pulseRate}
        else {this.selectedAlpha += this.pulseRate}
        if (this.selectedAlpha >= 0.3) { this.selectedPulse = true }
        if (this.selectedAlpha <= 0) { this.selectedPulse = false; this.selectedAlpha = 0}
        if (this.selectedIndex < 0) {this.selectedIndex = 0}
        if (this.selectedIndex >= this.options.length-1) {this.selectedIndex = this.options.length-1}
    }
    drawSelected(ctx){
        ctx.fillStyle = 'rgb(255,255,255)'
        ctx.globalAlpha = this.selectedAlpha
        ctx.fillRect(
            this.x, 
            this.y + this.font_size*this.selectedIndex,
            this.width,
            this.height/this.options.length
        )
        ctx.globalAlpha = 1.0
    }
    draw(ctx){
        // draw the button body
        ctx.fillStyle = this.bgColor;
        ctx.globalAlpha = this.alpha
        ctx.fillRect(this.x, this.y, this.width, this.height);
        this.drawSelected(ctx)
        ctx.globalAlpha = 1.0
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
        //ctx.font = `${this.font_size}px ${this.font}`;
        ctx.font = `${this.font_size}px menufont`;
        for (let i = 0; i < this.options.length; i++){
            if (this.selectable[i]){ctx.fillStyle = this.textColor;}
            else {ctx.fillStyle = this.unselectableTextColor;}
            ctx.fillText(this.options[i],
                this.x + this.font_size/5,
                this.y + this.height/this.options.length*i + this.font_size/5
            ); 
        }
    }
}

