/// <reference path="View.ts" />

class StartMenu extends View {
	private startButton: Button;
	private image: HTMLImageElement;

	public constructor(canvas: HTMLCanvasElement) {
		super(canvas);

		this.startButton = new Button(
			this.canvas,
			this.canvas.width * 0.25,
			this.canvas.height * 0.19,
			this.canvas.width / 2,
			this.canvas.height * 0.77,
			"purple",
            "START"
		);

		// load the image/logo
		this.image = this.loadNewImage("./assets/img/hacker.png");
	}


	/**
	 * Method to get the button's information
	 */
	public getButton = () => {
		return this.startButton;
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
	};

}

