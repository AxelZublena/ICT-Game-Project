/// <reference path="View.ts" />

class StartMenu extends View {
	
	private startButton: any;
	private buttonColor: string;
	private image: HTMLImageElement;

	public constructor(canvas: HTMLCanvasElement, buttonColor: string) {
		super(canvas);

		// empty startButton
		this.startButton = {
			width: 0,
			height: 0,
			x: 0,
			y: 0,
		};

		// set the color of the button
		this.buttonColor = buttonColor;

		// load the image/logo
		this.image = this.loadNewImage("/assets/img/hacker.png");
	}

	/**
	 * Method to set the button's color
	 * @param {string} color
	 */
	public setButtonColor(color: string) {
		this.buttonColor = color;
	}

	/**
	 * Method to get the button's information
	 */
	public getButton() {
		return this.startButton;
	}

	/**
	 * Method to draw the start menu on the canvas
	 * @param {CanvasRenderingContext2D} ctx
	 */
	public draw(ctx: CanvasRenderingContext2D) {
		// Draw the background color
		ctx.fillStyle = Game.BASE_COLOR;
		ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

		// Gets the button's information in an object for isOnButton()
		this.startButton.width = this.canvas.width * 0.25;
		this.startButton.height = this.canvas.height * 0.19;
		this.startButton.x = this.canvas.width / 2;
		this.startButton.y = this.canvas.height * 0.77;

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
			this.startButton.x,
			this.startButton.y,
			this.startButton.width,
			this.startButton.height,
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
