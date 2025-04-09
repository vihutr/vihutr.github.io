export default class Button {
    constructor(text, fillColor, textColor) {
      this.text = text;
      this.fillColor = fillColor;
      this.textColor = textColor;
    }
    setPosition(x, y) {
      this.x = x;
      this.y = y;
    }
    setSize(width, height) {
      this.width = width;
      this.height = height;
    }
    draw(ctx){
        // draw the button body
        ctx.fillStyle = this.fillColor;
        ctx.fillRect(this.x, this.y, this.width, this.height);  // draw the button text
        ctx.fillStyle = this.textColor;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = '25px RM2000.ttf';
        ctx.fillText(this.text, this.x + this.width / 2, this.y + this.height / 2, this.width);
    }
}
