/// <reference path="View.ts" />

class StartMenu extends View {

	private startButton: Button;
	private buttonColor: string;
	private image: HTMLImageElement;

	public constructor(canvas: HTMLCanvasElement, buttonColor: string) {
		super(canvas);

		// empty startButton
		this.startButton = new Button(this.canvas, 0, 0, 0, 0, buttonColor);

		// set the color of the button
		this.buttonColor = buttonColor;

		// load the image/logo
		this.image = this.loadNewImage("./assets/img/hacker.png");
	}

	/**
	 * Method to set the button's color
	 * @param {string} color
	 */
	public setButtonColor = (color: string) => {
		this.buttonColor = color;
	}

	/**
	 * Method to get the button's information
	 */
	public getButton = () => {
		return this.startButton;
	}

	/**
	 * Method to draw the start menu on the canvas
	 * @param {CanvasRenderingContext2D} ctx
	 */
	public draw = (ctx: CanvasRenderingContext2D) => {
		// Draw the background color
		ctx.fillStyle = Game.BASE_COLOR;
		ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

		console.log("HOMO");
		// Gets the button's information in an object for isOnButton()
		this.startButton.setWidth(this.canvas.width * 0.25);
		this.startButton.setHeight(this.canvas.height * 0.19);
		this.startButton.setXPos(this.canvas.width / 2);
		this.startButton.setYPos(this.canvas.height * 0.77);

		// Draws the image/logo
		ctx.drawImage(
			this.image,
			this.canvas.width / 2 - ((this.canvas.height * 0.9) / 2) * 0.97,
			this.canvas.height / 2 - (this.canvas.height * 0.9) / 2,
			this.canvas.height * 0.9,
			this.canvas.height * 0.9
		);

		// Draws a round rectangle
		this.roundRect(
			ctx,
			this.startButton.getXPos(),
			this.startButton.getYPos(),
			this.startButton.getWidth(),
			this.startButton.getHeight(),
			20,
			this.buttonColor,
			8,
			"white"
		);

		// Write text in the button
		this.writeTextToCanvas(
			ctx,
			"START",
			this.canvas.width * 0.05,
			this.canvas.width * 0.5,
			this.canvas.height * 0.8,
			"center",
			"white"
		);
	}

}