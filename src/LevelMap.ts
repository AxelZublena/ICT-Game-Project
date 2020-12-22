/// <reference path="View.ts" />

class LevelMap extends View {

    constructor(canvas: HTMLCanvasElement) {
        super(canvas);

        this.image = this.loadNewImage('./assets/img/map.png')
    }

    public draw = (ctx: CanvasRenderingContext2D) => {
        // Draw the background color
        this.drawBg(ctx);
        
        ctx.drawImage(
            this.image,
            this.canvas.width / 2 - this.image.width / 2,
            this.canvas.height / 2 - this.image.height / 2,
			1200,
			675
        );
    };

    private drawBg = (ctx: CanvasRenderingContext2D) => {
        ctx.fillStyle = Game.BASE_COLOR;
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
}