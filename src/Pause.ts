/// <reference path="View.ts" />

class Pause extends View {
	//private buttons: Button[];
	private continueButton: Button;
	private backButton: Button;
	private image: HTMLImageElement;

	public constructor(canvas: HTMLCanvasElement) {
		super(canvas);

		this.continueButton = new Button(
			this.canvas,
			this.canvas.width * 0.28,
			this.canvas.height * 0.09,
			this.canvas.width / 2,
			this.canvas.height * 0.7,
			"purple",
            "CONTINUE"
		);
		this.backButton = new Button(
			this.canvas,
			this.canvas.width * 0.28,
			this.canvas.height * 0.09,
			this.canvas.width / 2,
			this.canvas.height * 0.85,
			"purple",
            "QUIT"
		);

		// load the image/logo
		this.image = this.loadNewImage("./assets/img/hacker.png");
	}


	/**
	 * Draw on canvas
	 * @param ctx
	 */
	public draw = (ctx: CanvasRenderingContext2D) => {
        ctx.fillStyle = "purple";
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

		// Draws the image/logo
		ctx.drawImage(
			this.image,
			this.canvas.width / 2 - (this.canvas.height * 0.9) / 2,
			this.canvas.height / 2 - (this.canvas.height * 0.9) / 2,
			this.canvas.height * 0.9,
			this.canvas.height * 0.9
		);
	}
}

