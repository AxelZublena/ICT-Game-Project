/// <reference path="View.ts" />

class Pause extends View {

	public constructor(canvas: HTMLCanvasElement) {
		super(canvas);
	}

	/**
	 * Draw on the canvas
	 * @param ctx 
	 */
	public draw = (ctx: CanvasRenderingContext2D): void => {
		//random drawing to test the StartMenu
		ctx.fillStyle = "dodgerblue";
		ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
		this.writeTextToCanvas(
			ctx,
			"TEST",
			this.canvas.width * 0.05,
			this.canvas.width * 0.5,
			this.canvas.height * 0.8,
			"center",
			"black"
		);
	}
}
