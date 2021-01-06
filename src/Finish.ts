/// <reference path="View.ts" />

class Finish extends View {
    private backToStartMenuButton: Button;

    constructor(canvas: HTMLCanvasElement) {
        super(canvas);

        this.backToStartMenuButton = new Button(
            this.canvas,
			this.canvas.width * 0.20,
			this.canvas.height * 0.19,
			this.canvas.width / 2 - (this.canvas.width * 0.19)/2,
			this.canvas.height * 0.77 - (this.canvas.height * 0.19)/2,
			"purple",
            "BACK TO START MENU"
        );

        // load the image
        this.image = this.loadNewImage('./assets/img/hacker.png');
    }

    /**
     * Function for getting the button's information
     */
    public getButton = () => {
        return this.backToStartMenuButton;
    };

    /**
	 * Method to draw the start menu on the canvas
	 * @param {CanvasRenderingContext2D} ctx
	 */
	public draw = (ctx: CanvasRenderingContext2D) => {
		// Draw the background color
		ctx.fillStyle = Game.BASE_COLOR;
		ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

		// Draws the image/logo
		ctx.drawImage(
			this.image,
			this.canvas.width / 2 - ((this.canvas.height * 0.9) / 2) * 0.97,
			this.canvas.height / 2 - (this.canvas.height * 0.9) / 2,
			this.canvas.height * 0.9,
			this.canvas.height * 0.9
        );

        ctx.fillStyle = 'purple';
        ctx.fillRect(0, 50, this.canvas.width, 100);
        
        ctx.font = '25px Arial';
        ctx.fillStyle = 'white';
        ctx.fillText("Congratulations! Now you are smart enough to know which information you have to retain from others.", this.canvas.width/2, 110)
        ctx.textAlign = "center";
	};
}